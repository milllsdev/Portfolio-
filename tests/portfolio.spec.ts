import { test, expect } from "@playwright/test";
for (const width of [375, 390, 768, 1280, 1920]) {
  test(`responsive portfolio at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => { if (response.url().startsWith("http://127.0.0.1") && response.status() >= 400) errors.push(response.url()); });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).toHaveTitle("Michel Ayikoe Atayi — Software Engineer");
    for (const id of ["work", "experience", "about", "contact"]) {
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      await expect(page.locator("#" + id)).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const anchor of await page.locator('a[href^="#"]').all()) {
      const href = await anchor.getAttribute("href");
      expect(await page.locator(href!).count()).toBe(1);
    }
    await expect(page.getByText(/lorem ipsum/i)).toHaveCount(0);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true });
  });
}
test("project links and accessible navigation", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeVisible();
  const expected = [
    "https://github.com/milllsdev/taskora", "https://taskora-sepia.vercel.app/",
    "https://dreamtrip-ai-xi.vercel.app/", "https://github.com/milllsdev/short-editor",
    "https://github.com/milllsdev/fintech-dashboard", "https://www.linkedin.com/in/michel-atayi",
    "https://github.com/milllsdev",
  ];
  for (const href of expected) {
    const link = page.locator(`a[href="${href}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute("href", "mailto:atayimicheal78@gmail.com");
  await expect(page.getByRole("link", { name: /Live Project/ })).toHaveCount(2);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Michel Ayikoe Atayi — Software Engineer");
  expect((await request.get("/icon.svg")).status()).toBe(200);
  expect((await request.get("/opengraph-image")).status()).toBe(200);
});
