import { getDb } from '../db';
import { hashPassword } from './password';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

type UserRole = 'admin' | 'donnateur' | 'leveur' | 'partenaire';

export async function createUser({ name, email, password, role }: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  const db = await getDb();
  const hashedPassword = await hashPassword(password);
  const id = nanoid();

  const [result] = await db.execute(
    `INSERT INTO users (id, email, password, name, role)
     VALUES (?, ?, ?, ?, ?)`,
    [id, email, hashedPassword, name, role]
  );

  const [user] = await db.execute(
    'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
    [id]
  );

  return user;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

export async function getUserById(id: string) {
  if (!id) {
    throw new Error('ID utilisateur requis');
  }
  
  const db = await getDb();
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}