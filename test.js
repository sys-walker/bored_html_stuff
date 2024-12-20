const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('Hello World!', Key.RETURN);
    await driver.wait(until.titleIs('Hello World! - Google Search'), 5000);
  } finally {
    await driver.quit();
  }
})();
