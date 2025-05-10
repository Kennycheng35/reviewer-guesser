import puppeteer from 'puppeteer';
import{ filterReviews } from '../util/filterReviews.js';
import fs from 'fs/promises'; // <-- IMPORT fs/promises
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const myProfilePath = path.resolve('./browser-profile');


export const add_letterboxd_reviews = async (url, film, name, difficulty) => {
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
        const hasElement = await page.$('a[data-js-trigger="spoiler.reveal"]');
        if (hasElement) {
            await hasElement.click();
        } else {
            console.log('Element not found — skipping click');
        }
        await page.waitForSelector('ul');
        
        const listItems = await page.evaluate(() => {
            const list = Array.from(document.querySelectorAll('ul'));      
            return list.map(ul => {
                const items = Array.from(ul.querySelectorAll('li')); 
                return items.map(item => {
                    const rating = item.querySelector('.rating')?.textContent.trim();
                    const liked = item.querySelector('.icon-liked') ? true : false;
                    const review = item.querySelector('.js-review')?.textContent.trim();
                    const innerhtml = item.querySelector('.film-detail-content')?.innerHTML.trim();
                    const par = item.querySelector('.collapsed-text');
                    const paragraph = par ? Array.from(par.querySelectorAll('p')) : null;
                    const ppp = paragraph ? paragraph.map(p => {
                        const para = p.textContent.trim();
                        return para
                    }) : null;

                    // const paragraphs = await page.$$eval('p', elements =>
                    //     elements.map(el => el.textContent.trim())
                    // );
                    const reviewText = review ? review.split('  ') : '';

                    const filter = reviewText ? reviewText.filter(el => {
                        if (!el) {

                        }
                        else if (el === 'This review may contain spoilers. I can handle the truth.') {

                        }
                        else {
                            return el.trim();
                        }
                    }) : null;
                    return {rating, liked, review: ppp ? ppp : filter ? filter[0] : null, innerhtml};

                    // return {rating, like, filter, par, paragraph, ppp};
                })
            });
        });

        const reviews = filterReviews(listItems[2], name);
        console.log('filtered reviews',reviews);
        const shuffled = reviews.sort(() => 0.5 - Math.random());
        const randomItems = shuffled.slice(0, 2);


        await browser.close();
        return randomItems.map(el => ({...el, difficulty:difficulty, link:film}));
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
