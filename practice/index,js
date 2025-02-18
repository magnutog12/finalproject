import puppeteer from 'puppeteer';
import fs from 'fs/promises';

// asyncronous function to handle awaits
(async () => {
    // launch and set it to view to avoid bot detection
    const browser = await puppeteer.launch({
        headless: false, 
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--window-size=1920,1080'
        ]
    });
    const page = await browser.newPage();
    await page.goto('example.com');

    let pageNum = 1;
    let lastPage = 45;
    let allResults = [];

    await page.waitForSelector('.registeredOffenders');
    
    // mimic human behaivor by randomizing mouse movements
    const humanBehavior = async (page) => {
        await page.mouse.move(Math.random() * 1920, Math.random() * 1080, { steps: 10 });
        await page.evaluate(() => {
            window.scrollTo({
                top: Math.random() * document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
        await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));
    };

    while(pageNum <= lastPage){

        await humanBehavior(page);

        const results = await page.evaluate(() => {
            // create an array of registered offenders by query selecting the sections HTML
            const offenders = Array.from(document.querySelectorAll('.registeredOffenders li[itemtype="https://schema.org/Person"]'));
            // make a map and set each offenders data
            const data = offenders.map( offender => {
                const name = offender.querySelector('a[itemprop="url"]').getAttribute('title');
                const img = offender.querySelector('img[itemprop="image"]').getAttribute('src');
                const adress = offender.querySelector('span[itemprop="streetAddress"]').textContent.trim();
                const locality = offender.querySelector('span[itemprop="addressLocality"]').textContent.trim();

                return { name, img, adress, locality };
            });
            return data;
        });
        
        // concatenate with new array (prevents error)
        allResults = allResults.concat(results);

        // write to file after each offender to results.json
        await fs.writeFile(
            'results.json', 
            JSON.stringify(allResults, null, 2)
        );

        pageNum++;
        if(pageNum <= lastPage){
            await page.goto(`https://www.homefacts.com/offenders/Tennessee/Knox-County-${pageNum}.html`);
        }

    } 

    // save file
    await fs.writeFile(
        'results.json', 
        JSON.stringify(allResults, null, 2)
    );
    
    console.log(allResults);

    await browser.close();
})();

