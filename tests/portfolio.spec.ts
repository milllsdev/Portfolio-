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
    await expect(page.getByRole("img", { name: "Michel Ayikoe Atayi", exact: true })).toHaveCount(2);
    const portrait = page.locator("#about").getByRole("img", { name: "Michel Ayikoe Atayi", exact: true });
    await portrait.scrollIntoViewIfNeeded();
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute("src", "/IMG_2300.jpeg");
    await expect.poll(() => portrait.evaluate(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
    expect(await portrait.evaluate(image => getComputedStyle(image).filter)).toBe("none");
    const section = page.locator("#experience");
    for (const company of ["Ecobank Ghana", "Blueticks Technology"]) {
      const row = section.locator("article").filter({ has: page.getByRole("heading", { name: company, exact: true }) });
      await expect(row.getByText("Remote", { exact: true })).toBeVisible();
    }
    await expect(section).not.toContainText("Accra, Ghana");
    await expect(page.locator("article").filter({ has: page.getByRole("heading", { name: "DreamTrip AI", exact: true }) })).toContainText("personalized day-by-day itinerary");
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

test("inspect DreamTrip live landing page", async ({ page }) => {
  const response = await page.goto("https://dreamtrip-ai-xi.vercel.app/", { waitUntil: "domcontentloaded" });
  expect(response?.ok()).toBeTruthy();
  console.log("DreamTrip live application:", (await page.locator("body").innerText()).slice(0, 9000));
});

test("guide follows sections and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const guide = page.getByRole("complementary", { name: "Page guide" });
  await expect(guide.getByRole("link")).toHaveAttribute("href", "#work");
  expect(await guide.locator("svg").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  await guide.getByRole("button", { name: "Pause motion" }).click();
  await expect(guide.getByRole("button", { name: "Resume motion" })).toHaveAttribute("aria-pressed", "true");
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect(guide.getByRole("link")).toHaveAttribute("href", "#skills");
  await guide.getByRole("link").click();
  await expect(page).toHaveURL(/#skills$/);
});
