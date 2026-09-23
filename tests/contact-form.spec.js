import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test("submits form data successfully", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Name").fill("John Doe");
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Phone").fill("9876543210");
    await page.getByLabel("Message").fill("Hello from Playwright!");

    await page.getByRole("button", { name: "Submit" }).click();

    const result = page.getByRole("region", { name: "submitted-data" });

    await expect(result).toBeVisible();
    await expect(result).toContainText("John Doe");
    await expect(result).toContainText("john@example.com");
    await expect(result).toContainText("9876543210");
    await expect(result).toContainText("Hello from Playwright!");
  });

  test("shows browser validation for required fields", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByLabel("Name")).toBeFocused();
    await expect(page.getByRole("region", { name: "submitted-data" })).toHaveCount(0);
  });

  test("resets the form", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Name").fill("John Doe");
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Phone").fill("9876543210");
    await page.getByLabel("Message").fill("Test message");

    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByRole("region", { name: "submitted-data" })).toBeVisible();

    await page.getByRole("button", { name: "Reset" }).click();

    await expect(page.getByLabel("Name")).toHaveValue("");
    await expect(page.getByLabel("Email")).toHaveValue("");
    await expect(page.getByLabel("Phone")).toHaveValue("");
    await expect(page.getByLabel("Message")).toHaveValue("");
    await expect(page.getByRole("region", { name: "submitted-data" })).toHaveCount(0);
  });
});