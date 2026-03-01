const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [6,7,8,9,10,11,12,13,14,15];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Visiting Seed ${seed}`);

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for table to load (important because it's JS generated)
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseInt(td.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum:`, sum);

    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
}

run();