import puppeteer from 'puppeteer';
import fs from 'fs/promises'; // <-- IMPORT fs/promises
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const myProfilePath = path.resolve('./browser-profile');

export const get_poster_url = async (url) => {
    let browser;
    try {
        browser = await puppeteer.launch({ 
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
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        const posterHref = await page.evaluate(() => {
            const anchor = document.querySelector('a[data-js-trigger="postermodal"]');
            return anchor?.getAttribute('href');
        });

        await browser.close();
        return posterHref;
    }
    catch (e) {
        console.log(e);
        await browser.close();
    }
    finally {
        await browser.close();
        await fs.rm(myProfilePath , { recursive: true, force: true });
    }
}