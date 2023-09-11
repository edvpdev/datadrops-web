export const HOME_HOSTNAMES = new Set([
  "datadrops.io",
  "localhost:3000",
  "localhost",
]);

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain);
};

export const APP_HOSTNAMES = new Set([
  "app.datadrops.io",
  "app.localhost:3000",
]);

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? "https://app.datadrops.io"
    : "http://app.localhost:3000";

export const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? "https://datadrops.io"
    : "http://localhost:3000";

export const SHOW_BACKGROUND_SEGMENTS = new Set([
  "tools",
  "pricing",
  "help",
  "blog",
  "(blog-post)",
  "login",
  "register",
  "auth",
]);
