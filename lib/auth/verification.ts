import { getDb } from '../db';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 32);

export async function createVerificationToken(userId: string) {
  if (!userId) {
    throw new Error('userId is required');
  }

  const db = await getDb();
  const token = nanoid();
  const tokenId = nanoid();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures
  const formattedExpiresAt = expiresAt.toISOString().slice(0, 19).replace('T', ' ');

  console.log('Creating verification token with:', {
    tokenId,
    userId,
    token,
    formattedExpiresAt
  });

  try {
    await db.execute(
      'INSERT INTO email_verification_tokens (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)',
      [tokenId, userId, token, formattedExpiresAt]
    );
    return token;
  } catch (error) {
    console.error('Error creating verification token:', error);
    throw error;
  }
}

export async function verifyToken(token: string) {
  const db = await getDb();
  const [rows] = await db.execute(
    'SELECT * FROM email_verification_tokens WHERE token = ? AND expires_at > NOW()',
    [token]
  ) as any[];

  if (!rows || !rows[0]) {
    return null;
  }

  // Marquer l'utilisateur comme vérifié
  await db.execute(
    'UPDATE users SET verified = TRUE WHERE id = ?',
    [rows[0].user_id]
  );

  // Supprimer le token utilisé
  await db.execute(
    'DELETE FROM email_verification_tokens WHERE token = ?',
    [token]
  );

  return rows[0].user_id;
}
