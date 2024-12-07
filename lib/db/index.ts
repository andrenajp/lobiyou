import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: ':memory:', // Using in-memory database for development
      driver: sqlite3.Database
    });
    
    // Initialize database schema
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        name TEXT,
        userType TEXT,
        createdAt TEXT,
        updatedAt TEXT
      );

      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        goal REAL,
        currentAmount REAL DEFAULT 0,
        createdAt TEXT,
        updatedAt TEXT,
        status TEXT DEFAULT 'DRAFT',
        creatorId TEXT,
        FOREIGN KEY (creatorId) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS investments (
        id TEXT PRIMARY KEY,
        amount REAL,
        type TEXT,
        createdAt TEXT,
        investorId TEXT,
        projectId TEXT,
        FOREIGN KEY (investorId) REFERENCES users (id),
        FOREIGN KEY (projectId) REFERENCES projects (id)
      );
    `);
  }
  return db;
}