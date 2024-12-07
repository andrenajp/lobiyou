import { getDb } from '../db';
import { hashPassword } from './password';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

export async function createUser({ name, email, password, userType }: {
  name: string;
  email: string;
  password: string;
  userType: 'DONOR' | 'PROJECT_OWNER';
}) {
  const db = await getDb();
  const hashedPassword = await hashPassword(password);
  const now = new Date().toISOString();
  const id = nanoid();

  await db.run(
    `INSERT INTO users (id, email, password, name, userType, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, email, hashedPassword, name, userType, now, now]
  );

  const user = await db.get('SELECT id, email, name, userType, createdAt, updatedAt FROM users WHERE id = ?', [id]);
  return user;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
}