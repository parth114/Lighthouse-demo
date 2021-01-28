const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');
const fs = require('fs');

(async() => {

    const loginURL = 'https://uat.intermiles.com/';
    const myprofileURL = 'https://uat-new.intermiles.com/rewards-program/enrol';
    const POM = 'https://uat-new.intermiles.com/earn-intermiles/buy-form'
    const TOM = 'https://uat-new.intermiles.com/use-intermiles/transfer-intermiles-form'
    const GOM = 'https://uat-new.intermiles.com/use-intermiles/gift-transfer-intermiles-form'

    const opts = {
        chromeFlags: ['--headless'],
        logLevel: 'info',
        output: 'json',
        disableDeviceEmulation: true,
        defaultViewport: {
            width: 1200,
            height: 900
        },
        disableStorageReset: true,
        chromeFlags: ['--disable-mobile-emulation']
    };

// Launch chrome using chrome-launcher
    const chrome = await chromeLauncher.launch(opts);
    opts.port = chrome.port;

// Connect to it using puppeteer.connect().
    const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
    const {webSocketDebuggerUrl} = JSON.parse(resp.body);
    const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});


//Puppeteer
    page = (await browser.pages())[0];
    await page.setViewport({ width: 1200, height: 900});
    // await page.goto(loginURL, {waitUntil: 'networkidle2'});
    // page.evaluate(() => {
    //     document.querySelector('[id="jp-adobe-login"]').click();
    // });
    // await page.waitForNavigation();
    // await page.type('[id="userName"]', '9106652053');
    // await page.type('[id="password"]', 'InterDemo12');
    // await page.evaluate(() => {
    //     document.querySelector('[id="VerifyMe"]').click();
    // });
    // await page.waitForNavigation();
    // console.log(page.url());

// Run Lighthouse.
    const report = await lighthouse(myprofileURL, opts, config).then(results => {
        return results;
    });
    const html = reportGenerator.generateReport(report.lhr, 'html');
    const json = reportGenerator.generateReport(report.lhr, 'json');
    
    // console.log(`Lighthouse score: ${report.lhr.score}`);
    await page.goto(myprofileURL, {waitUntil: 'networkidle2'});
    // await browser.disconnect();
    // await chrome.kill(); 


    //Write report html to the file
    fs.writeFile('myprofile-report.html', html, (err) => {
        if (err) {
            console.error(err);
        }
    });

    //Write report json to the file
    fs.writeFile('myprofile-report.json', json, (err) => {
        if (err) {
            console.error(err);
        }
    });


    //// New Report
    const POMreport = await lighthouse(POM, opts, config).then(results => {
        return results;
    });
    const POMhtml = reportGenerator.generateReport(POMreport.lhr, 'html');
    const POMjson = reportGenerator.generateReport(POMreport.lhr, 'json');
    
    // console.log(`Lighthouse score: ${report.lhr.score}`);
    await page.goto(POM, {waitUntil: 'networkidle2'});
    // await browser.disconnect();
    // await chrome.kill();


    //Write report html to the file
    fs.writeFile('POM-report.html', POMhtml, (err) => {
        if (err) {
            console.error(err);
        }
    });

    //Write report json to the file
    fs.writeFile('POM-report.json', POMjson, (err) => {
        if (err) {
            console.error(err);
        }
    });

    //TOM report

    const TOMreport = await lighthouse(TOM, opts, config).then(results => {
        return results;
    });
    const TOMhtml = reportGenerator.generateReport(TOMreport.lhr, 'html');
    const TOMjson = reportGenerator.generateReport(TOMreport.lhr, 'json');
    
    // console.log(`Lighthouse score: ${report.lhr.score}`);
    await page.goto(TOM, {waitUntil: 'networkidle2'});
    // await browser.disconnect();
    // await chrome.kill();


    //Write report html to the file
    fs.writeFile('TOM-report.html', TOMhtml, (err) => {
        if (err) {
            console.error(err);
        }
    });

    //Write report json to the file
    fs.writeFile('TOM-report.json', TOMjson, (err) => {
        if (err) {
            console.error(err);
        }
    });

    //GOM
    const GOMreport = await lighthouse(GOM, opts, config).then(results => {
        return results;
    });
    const GOMhtml = reportGenerator.generateReport(GOMreport.lhr, 'html');
    const GOMjson = reportGenerator.generateReport(GOMreport.lhr, 'json');
    
    // console.log(`Lighthouse score: ${report.lhr.score}`);
    await page.goto(GOM, {waitUntil: 'networkidle2'});
    await browser.disconnect();
    await chrome.kill();


    //Write report html to the file
    fs.writeFile('GOM-report.html', GOMhtml, (err) => {
        if (err) {
            console.error(err);
        }
    });

    //Write report json to the file
    fs.writeFile('GOM-report.json', GOMjson, (err) => {
        if (err) {
            console.error(err);
        }
    });
})();