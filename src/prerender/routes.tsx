// src/prerender/routes.tsx
import React from 'react';
// Eager imports of public page components (NOT React.lazy).
import Index from '../pages/Index';
import Solutions from '../pages/Solutions';
import Portfolio from '../pages/Portfolio';
import Services from '../pages/Services';
import Process from '../pages/Process';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import RefundPolicy from '../pages/RefundPolicy';

import staticRoutes from './staticRoutes.json'; // shared with sitemap generator

export interface PrerenderRoute {
  path: string;
  Component: React.ComponentType<any>;
  props?: Record<string, unknown>;
}

// Map path to component
const COMPONENT_BY_PATH: Record<string, React.ComponentType<any>> = {
  '/': Index,
  '/solutions': Solutions,
  '/portfolio': Portfolio,
  '/services': Services,
  '/process': Process,
  '/contact': Contact,
  '/login': Login,
  '/terms-of-service': TermsOfService,
  '/privacy-policy': PrivacyPolicy,
  '/refund-policy': RefundPolicy,
};

export const prerenderRoutes: PrerenderRoute[] = (staticRoutes as Array<{ path: string }>).map((r) => ({
  path: r.path,
  Component: COMPONENT_BY_PATH[r.path],
}));
