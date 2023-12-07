import { NextRequest } from 'next/server';
import { PRIVATE_PAGES } from '../constants';

export const parse = (req: NextRequest) => {
  let domain = req.headers.get('host') as string;
  domain = domain.replace('www.', ''); // remove www. from domain

  // path is the path of the URL (e.g. dub.co/stats/github -> /stats/github)
  const path = req.nextUrl.pathname;

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString();
  const fullPath = `${req.nextUrl.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split('/')[1]); // key is the first part of the path (e.g. dub.co/stats/github -> stats)
  const fullKey = decodeURIComponent(path.slice(1)); // fullKey is the full path without the first slash (to account for multi-level subpaths, e.g. dub.sh/github/repo -> github/repo)
  const referrer = req.headers.get('referer');

  return { domain, path, fullPath, key, fullKey, referrer };
};

export const removeSubDomain = (domain: string) => {
  return domain.replace('www.', '').replace('app.', ''); // remove www. from domain
};

export const isPagePrivate = (url: string): boolean => {
  return PRIVATE_PAGES.some((page) => url.includes(page));
};
