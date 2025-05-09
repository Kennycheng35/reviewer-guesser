import puppeteer from 'puppeteer';
import { ProtocolError } from 'puppeteer-core/lib/cjs/puppeteer/common/Errors.js';
import fs from 'fs/promises'; // <-- IMPORT fs/promises

import dotenv from 'dotenv';

dotenv.config();

export const add_letterboxd_movies = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch({ 
      protocolTimeout: 600000,
      executablePath: '/usr/bin/chromium',
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--disable-dev-shm-usage', 
        '--disable-gpu'
      ],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 400000 });
    await page.waitForSelector('ul', { timeout: 60000 });

    await autoScroll(page);

    const listItems = await page.evaluate(() => {
        const list = Array.from(document.querySelectorAll('ul'));      
        return list.map(ul => {
            const items = Array.from(ul.querySelectorAll('li')); 
            return items.map(item => {
                const title = item.querySelector('a')?.textContent.trim();
                const link = item.querySelector('div[data-film-link]')?.getAttribute('data-film-link');
                return {title, link};
            }); 
            
        });
    });

    await browser.close();
    return listItems[2];
  }
  catch (e) {
    if (e instanceof ProtocolError) {
      console.error('Puppeteer protocol error:', err.message);
    }
    else {
      console.log(e);
    }
  }
  finally {
    if (browser) {
      await browser.close();
      await fs.rm(userDataDir, { recursive: true, force: true });
    }
  }
};

async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          
          if (totalHeight >= scrollHeight - window.innerHeight || totalHeight > 10000) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    await page.evaluate(() => {
        return new Promise(resolve => {
          setTimeout(resolve, 2000);
        });
    });
}
