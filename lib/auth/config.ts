const DEFAULT_JWT_SECRET = "your-secret-key-at-least-32-characters-long-123";

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  return new TextEncoder().encode(secret);
};
