// src/prerender/render.tsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '../components/ui/tooltip';

export interface RenderInput {
  path: string;                              // concrete URL, e.g. '/solutions'
  Component: React.ComponentType<any>;
  props?: Record<string, unknown>;
  preloaded?: Record<string, unknown>;       // server-side data injected as window.__PRELOADED__
  routePattern?: string;                     // React Router pattern, e.g. '/solutions'
}

export interface RenderOutput { bodyHtml: string; headHtml: string; }

export async function renderRoute(input: RenderInput): Promise<RenderOutput> {
  const routePattern = input.routePattern ?? input.path;
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const helmetContext: { helmet?: any } = {};

  // Force THIS HelmetProvider into SSR mode so it writes to helmetContext rather than
  // mutating document.head (which is undefined / jsdom during a Node render). Restore after.
  const prevCanUseDOM = (HelmetProvider as any).canUseDOM;
  (HelmetProvider as any).canUseDOM = false;

  // react-router's <Link> uses useLayoutEffect, which warns on the server. Across dozens of
  // routes this floods the build log; filter just this one known-harmless message.
  const prevConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    const first = typeof args[0] === 'string' ? args[0] : '';
    if (first.includes('useLayoutEffect does nothing on the server')) return;
    prevConsoleError(...(args as []));
  };

  try {
    const bodyHtml = renderToString(
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <TooltipProvider>
              <MemoryRouter initialEntries={[input.path]}>
                <Routes>
                  <Route path={routePattern} element={<input.Component {...(input.props ?? {})} />} />
                </Routes>
              </MemoryRouter>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    );

    const h = helmetContext.helmet;
    const headHtml = h
      ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join('\n')
      : '';
    return { bodyHtml, headHtml };
  } finally {
    (HelmetProvider as any).canUseDOM = prevCanUseDOM;
    console.error = prevConsoleError;
  }
}

// Strip the shell's default head tags before injecting per-route ones, so the final HTML
// never has duplicate <title>/description/og/twitter/JSON-LD.
const DEFAULT_HEAD_PATTERNS: RegExp[] = [
  /<title>[^<]*<\/title>/i,
  /<meta\s+name="description"[^>]*>/i,
  /<meta\s+property="og:[^"]*"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
];

/** Pure function: inject rendered head/body/preloaded into the built index.html template. */
export function injectIntoTemplate(
  template: string,
  parts: { headHtml: string; bodyHtml: string; preloaded?: Record<string, unknown> }
): string {
  let html = template;
  for (const re of DEFAULT_HEAD_PATTERNS) html = html.replace(re, '');
  html = html.replace('</head>', `${parts.headHtml}\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${parts.bodyHtml}</div>`);
  if (parts.preloaded) {
    const json = JSON.stringify(parts.preloaded).replace(/</g, '\\u003c'); // avoid premature tag close
    html = html.replace(
      '<script type="module"',
      `<script>window.__PRELOADED__=${json}</script>\n<script type="module"`
    );
  }
  return html;
}
