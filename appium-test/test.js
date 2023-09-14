const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.auth0.auth0_flutter_example',
  'appium:appActivity': '.MainActivity',
  // 'appium:app': `/Users/poovamrajthanganadarthiagarajan/repositories/auth0-flutter/auth0_flutter/example/build/app/outputs/flutter-apk/app-release.apk`
  'appium:app': `${__dirname}/../auth0_flutter/example/build/app/outputs/flutter-apk/app-x86_64-release.apk`
};

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  waitforTimeout: 100000,
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const loginButton = await driver.$('//android.widget.Button[@content-desc="Web Auth Login"]');
    await loginButton.click();

    // const emailTextField = await driver.$("//android.widget.EditText[@hint='User name username/email']");
    const emailTextField = await driver.$("//android.widget.EditText[@resource-id='username']");
    await emailTextField.waitForExist();
    await emailTextField.setValue(process.env.USER_EMAIL);

    // const passwordTextField = await driver.$("//android.widget.EditText[@hint='Password your password']");
    const passwordTextField = await driver.$("//android.widget.EditText[@resource-id='password']");
    await passwordTextField.setValue(process.env.USER_PASSWORD);

    // const continueButton = await driver.$("//android.widget.Button[@text='Log In']");
    const continueButton = await driver.$("//android.widget.Button[@text='Continue']");
    await continueButton.click();
    await driver.pressKeyCode(66)
    
    const logoutButton = await driver.$('//android.widget.Button[@content-desc="Web Auth Logout"]');
    await logoutButton.waitForExist();
    await logoutButton.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest();
