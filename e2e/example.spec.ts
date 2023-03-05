import { test, expect } from "@playwright/test";

test("should load initial page", async ({ page }) => {
  await page.goto("http://localhost:3000");
});
