import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Home Page Test", function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments("--headless=new");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("Should load the Home Page", async () => {
    await driver.get("http://localhost:5173/");

    await driver.wait(until.elementLocated(By.css("body")), 10000);

    const content = await driver.findElement(By.css("body")).getText();

    console.log("Home Page Loaded Successfully!");

    assert.ok(content.length > 0, "Home Page content is empty!");
  });
});
