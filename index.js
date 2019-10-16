const puppeteer = require('puppeteer');

const office_name = process.env.MF_OFFICE_NAME;
const email = process.env.MF_EMAIL;
const password = process.env.MF_PASSOWRD;

let click_selector;
switch(process.argv[2]) {
  case 'start':
    click_selector = '.attendance-card-time-stamp-clock-in';
    break
  case 'end':
    click_selector = '.attendance-card-time-stamp-clock-out';
    break
  default:
    process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    //headless: false,  // dev
    headless: true,  // prd
    slowMo: 30
  })
  const page = await browser.newPage()
  await page.setViewport( {
    width: 1200,
    height: 800
  } );

  await page.goto('https://attendance.moneyforward.com/employee_session/new');
  await page.type('input[name="employee_session_form[office_account_name]"]', office_name, { delay: 1 });
  await page.type('input[name="employee_session_form[account_name_or_email]"]', email, { delay: 1 });
  await page.type('input[name="employee_session_form[password]"]', password, { delay: 1 });
  await page.click('input[name=commit]');

  await page.goto('https://attendance.moneyforward.com/my_page');
  await page.click(click_selector);

  await browser.close();
})();

