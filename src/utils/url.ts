export const protocol =
  process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const domain =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || 'localhost:3000';
export const baseUrl = `${protocol}://${domain}`;
