const DEFAULT_JWT_SECRET = "your-secret-key-at-least-32-characters-long-123";

export const getJwtSecret = () => {
  if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in production');
  }
  
  const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  return new TextEncoder().encode(secret);
};

// Pour la vérification, nous avons besoin de la même clé
let cachedSecret: Uint8Array | null = null;

export const getJwtSecretKey = () => {
  if (!cachedSecret) {
    cachedSecret = getJwtSecret();
  }
  return cachedSecret;
};
