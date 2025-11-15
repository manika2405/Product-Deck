const { Builder, By, until } = require('selenium-webdriver');

(async function testHomePage() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open frontend running locally
    await driver.get("http://localhost:5173");

    // Wait for page title
    await driver.wait(until.elementLocated(By.css("h1")), 5000);

    console.log("Selenium Test Passed: Homepage loaded");
  } catch (err) {
    console.error("Selenium Test Failed", err);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();
