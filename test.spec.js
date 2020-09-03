const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

// docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome:4.0.0-alpha-7-prerelease-20200826


describe('Selenium Bug Tests', () => {
    jest.setTimeout(30000);
    let driver
    let vars
    beforeEach(async function() {
        driver = new Builder()
            .forBrowser('chrome')
            .usingServer('http://localhost:4444/wd/hub')
            .build();
        // driver = await new Builder().setChromeService(new chrome.ServiceBuilder(__dirname+'/chromedriver')).forBrowser('chrome').build();
        vars = {};
    })
    afterEach(async () => {
        try {
            await driver.quit();
        } catch (e) {
            // who cares?
        }
    })
    it('WebDriverError: Content-Type header is missing', async () => {
        await driver.get("https://google.com"); // since there's no age gate on this page
        await driver.findElement(By.name("q")).sendKeys("test\n");
        console.log(await driver.getCurrentUrl()); // WebDriverError: Content-Type header is missing
    })
})
