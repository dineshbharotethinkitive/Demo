// const { test, expect } = require('@playwright/test');

// test('Staff Creation - Archive and Restore Test', async ({ page }) => {
//   // Helper functions
//   function generateRandomString(length = 8) {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
//   }

//   function generateRandomEmail() {
//     return `test${generateRandomString(6)}@example.com`;
//   }

//   function generateRandomPhone() {
//     const areaCode = Math.floor(200 + Math.random() * 800);
//     const centralOfficeCode = Math.floor(200 + Math.random() * 800);
//     const lineNumber = Math.floor(1000 + Math.random() * 9000);
//     return `+1 (${areaCode}) ${centralOfficeCode}-${lineNumber}`;
//   }

//   // Test data
//   const firstName = generateRandomString(6);
//   const lastName = generateRandomString(8);
//   const email = generateRandomEmail();
//   const contactNumber = generateRandomPhone();

//   console.log('🧪 Test Data:', { firstName, lastName, email, contactNumber });

//   // Step 1: Login
//   await page.goto('https://qa.practiceeasily.com/auth/login');
//   await page.waitForLoadState('networkidle');
//   await page.fill('input[name="username"]', 'bhavna.adhav+13@thinkitive.com');
//   await page.fill('input[name="password"]', 'Pass@123');
//   await page.click('button[type="submit"]');
//   await page.waitForLoadState('networkidle');
//   await page.waitForTimeout(2000);

//   // Maximize window
//   await page.setViewportSize({ width: 1920, height: 1080 });

//   // Step 2: Go to Settings → Users
//   await page.click('text=Settings');
//   await page.click('text=Users');
//   await page.waitForLoadState('networkidle');

//   // Step 3: Add User
//   await page.click('button:has-text("Add User")');
//   await page.fill('input[name="firstName"]', firstName);
//   await page.fill('input[name="lastName"]', lastName);

//   // Select role
//   await page.click('#mui-component-select-role');
//   await page.waitForSelector('li[role="option"]:has-text("Practice Owner")');
//   await page.click('li[role="option"]:has-text("Practice Owner")');
//   await page.mouse.click(0, 0); // Close dropdown

//   await page.fill('input[name="emailId"]', email);
//   await page.fill('input[type="tel"]', contactNumber);
//   await page.click('button:has-text("Save")');
//   await page.waitForTimeout(3000);

//   // Step 4: Verify User Created
//   await expect(page.locator(`text=${firstName}`)).toBeVisible();
//   console.log('✅ User created:', email);

//    // Step 5: Archive the Created User
//   const userRow = page.locator(`tr:has-text("${email}")`);
//   await userRow.locator('svg[data-testid="MoreVertIcon"]').click();
//   await page.click('text=Archive');
//   try {
//     await page.click('button:has-text("Confirm")', { timeout: 2000 });
//   } catch {}
//   await page.waitForTimeout(2000);
//   await expect(page.locator(`text=${firstName}`)).not.toBeVisible();
//   console.log('✅ User archived successfully');

//   // Step 6: Filter to "Archived"
//   const filterDropdown = page.locator('div[role="combobox"]:has-text("All")');
//   await filterDropdown.click();
//   await page.click('p:has-text("Archive")');
//   await page.waitForTimeout(2000);
//   await expect(page.locator(`text=${firstName}`)).toBeVisible();
//   console.log('✅ Archived user visible');

//   // Step 7: Restore User
//   const archivedRow = page.locator(`tr:has-text("${email}")`);
//    await userRow.locator('svg[data-testid="MoreVertIcon"]').click();
//   await page.click('text=Restore');
//   try {
//     await page.click('button:has-text("Confirm")', { timeout: 2000 });
//   } catch {}
//   await page.waitForTimeout(2000);
//   console.log('✅ User restored:', email);

// //   // Step 8: Filter back to "All" (Active)
// //   await filterDropdown.click();
// //   await page.click('p:has-text("All")');
// //   await page.waitForTimeout(2000);
// //   await expect(page.locator(`text=${firstName}`)).toBeVisible();
// //   console.log('✅ User visible in active list');

//     // Step 8: Filter back to "All" (Active)
//   const filterDropdown = page.locator('div[role="combobox"]').filter({ hasText: 'Archive' });
//   await filterDropdown.click();
//   await page.locator('p.MuiTypography-root:has-text("All")').click();
//   await page.waitForTimeout(2000);
//   await expect(page.locator(`text=${email}`)).toBeVisible();
//   console.log('✅ User visible in active list:', email);


// });


const { test, expect } = require('@playwright/test');

test('Staff Creation - Archive and Restore Test', async ({ page }) => {
  // Helper functions
  function generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function generateRandomEmail() {
    return `test${generateRandomString(6)}@example.com`;
  }

  function generateRandomPhone() {
    const areaCode = Math.floor(200 + Math.random() * 800);
    const centralOfficeCode = Math.floor(200 + Math.random() * 800);
    const lineNumber = Math.floor(1000 + Math.random() * 9000);
    return `+1 (${areaCode}) ${centralOfficeCode}-${lineNumber}`;
  }

  // Test data
  const firstName = generateRandomString(6);
  const lastName = generateRandomString(8);
  const email = generateRandomEmail();
  const contactNumber = generateRandomPhone();

  console.log('Test Data:', { firstName, lastName, email, contactNumber });

  // Step 1: Login
  await page.goto('https://qa.practiceeasily.com/auth/login');
  await page.waitForLoadState('networkidle');
  await page.fill('input[name="username"]', 'bhavna.adhav+13@thinkitive.com');
  await page.fill('input[name="password"]', 'Pass@123');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Maximize browser
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Step 2: Go to Users
  await page.click('text=Settings');
  await page.click('text=Users');
  await page.waitForLoadState('networkidle');

  // Step 3: Add User
  await page.click('button:has-text("Add User")');
  await page.fill('input[name="firstName"]', firstName);
  await page.fill('input[name="lastName"]', lastName);

  // Select role
  await page.click('#mui-component-select-role');
  await page.waitForSelector('li[role="option"]:has-text("Practice Owner")');
  await page.click('li[role="option"]:has-text("Practice Owner")');
  await page.mouse.click(0, 0); // Close dropdown

  // Fill email and phone
  await page.fill('input[name="emailId"]', email);
  await page.fill('input[type="tel"]', contactNumber);

  await page.click('button:has-text("Save")');
  await page.waitForTimeout(2000);

  // Step 4: Validate User Created
  await expect(page.locator(`text=${email}`)).toBeVisible();
  console.log('✅ User created successfully');

  // Step 5: Archive User
  const userRow = page.locator(`tr:has-text("${email}")`);
  await userRow.locator('svg[data-testid="MoreVertIcon"]').click();
  await page.click('text=Archive');
  try {
    await page.click('button:has-text("Confirm")', { timeout: 2000 });
  } catch {}
  await page.waitForTimeout(2000);
  await expect(page.locator(`text=${email}`)).not.toBeVisible();
  console.log('✅ User archived successfully');

  // Step 6: Filter -> Archived
  const filterDropdown = page.locator('div[role="combobox"]').first(); // First dropdown is usually the status filter
  await filterDropdown.click();
  await page.getByText('Archive', { exact: true }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator(`text=${email}`)).toBeVisible();
  console.log('✅ Archived user visible');

  // Step 7: Restore User
  const archivedRow = page.locator(`tr:has-text("${email}")`);
 await userRow.locator('svg[data-testid="MoreVertIcon"]').click();
  await page.click('text=Restore');
  try {
    await page.click('button:has-text("Confirm")', { timeout: 2000 });
  } catch {}
  await page.waitForTimeout(2000);

//   // Step 8: Filter -> Active (All)
// await filterDropdown.nth(0).click(); // Click first combobox (for filter)

// // Wait for dropdown to render options
// await page.waitForSelector('ul[role="listbox"]');

// // Now click the correct "All" option inside the dropdown
// await page.click('li[role="option"]:has-text("All")');

// // Wait for the table to reload filtered data
// await page.waitForTimeout(2000);

// // Verify the restored user by email
// await expect(page.locator(`text=${email}`)).toBeVisible();
// console.log('✅ User visible in active list:', email);


// Step 8: Filter -> Active (All)
await filterDropdown.nth(0).click(); // Open filter dropdown

await page.waitForSelector('ul[role="listbox"]'); // Wait for dropdown
await page.click('li[role="option"]:has-text("All")'); // Select "All"

// Wait for user to be visible (email used for identifying)
await page.waitForSelector(`tr:has-text("${email}")`);
await expect(page.locator(`text=${email}`)).toBeVisible();
console.log('✅ User visible in active list:', email);


});
