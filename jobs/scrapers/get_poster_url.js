import puppeteer from 'puppeteer';

import dotenv from 'dotenv';

dotenv.config();

export const get_poster_url = async (url) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
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
}