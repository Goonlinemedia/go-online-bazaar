import { describe, it, expect } from "vitest";
import { prerenderRoutes } from "./routes";
import { renderRoute, injectIntoTemplate } from "./render";
import staticRoutes from "./staticRoutes.json";

describe("Prerender Routes and Configuration", () => {
  it("should have matching paths in staticRoutes and prerenderRoutes", () => {
    const staticPaths = staticRoutes.map((r) => r.path);
    const manifestPaths = prerenderRoutes.map((r) => r.path);
    expect(manifestPaths).toEqual(expect.arrayContaining(staticPaths));
  });

  it("should map components for all routes", () => {
    prerenderRoutes.forEach((route) => {
      expect(route.Component).toBeDefined();
      expect(route.path).toBeDefined();
    });
  });

  it("should successfully render pages using renderRoute", async () => {
    // Try rendering the home route
    const homeRoute = prerenderRoutes.find((r) => r.path === "/");
    expect(homeRoute).toBeDefined();

    const output = await renderRoute({
      path: "/",
      Component: homeRoute!.Component,
    });

    expect(output.bodyHtml).toBeDefined();
    expect(output.bodyHtml.length).toBeGreaterThan(0);
    expect(output.headHtml).toBeDefined();
    expect(output.headHtml).toContain("<title");
  });

  it("should inject head and body into the template html", () => {
    const template = `
      <!doctype html>
      <html>
        <head>
          <title>Old Title</title>
          <meta name="description" content="Old Description" />
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="/src/main.tsx"></script>
        </body>
      </html>
    `;

    const headHtml = "<title>New Page Title</title>\n<meta name=\"description\" content=\"New Description\" />";
    const bodyHtml = "<div class=\"home\">Hello World</div>";
    const preloaded = { test: 123 };

    const result = injectIntoTemplate(template, {
      headHtml,
      bodyHtml,
      preloaded,
    });

    expect(result).not.toContain("Old Title");
    expect(result).not.toContain("Old Description");
    expect(result).toContain("New Page Title");
    expect(result).toContain("New Description");
    expect(result).toContain("<div id=\"root\"><div class=\"home\">Hello World</div></div>");
    expect(result).toContain("window.__PRELOADED__={\"test\":123}");
  });
});
