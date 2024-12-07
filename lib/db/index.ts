import mysql from 'mysql2/promise';

let db: any = null;

export async function getDb() {
  try {
    if (!db) {
      db = await mysql.createPool({
        host: process.env.DB_TEST_HOST || '127.0.0.1',
        user: process.env.DB_TEST_USER || 'root',
        password: process.env.DB_TEST_PASSWORD || 'root',
        database: process.env.DB_TEST_NAME || 'vlvs0170_lobiyou',
        port: Number(process.env.DB_TEST_PORT) || 8889,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      // Test connection
      await db.query('SELECT 1');

      // Initialize database schema - users table
      await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(255) PRIMARY KEY,
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          name VARCHAR(255),
          role ENUM('admin', 'donnateur', 'leveur', 'partenaire') DEFAULT 'donnateur',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Initialize projects table
      await db.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id VARCHAR(255) PRIMARY KEY,
          title VARCHAR(255),
          description VARCHAR(255),
          goal REAL,
          currentAmount REAL DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          status VARCHAR(255) DEFAULT 'DRAFT',
          creatorId VARCHAR(255),
          FOREIGN KEY (creatorId) REFERENCES users (id)
        )
      `);

      // Initialize investments table
      await db.query(`
        CREATE TABLE IF NOT EXISTS investments (
          id VARCHAR(255) PRIMARY KEY,
          amount REAL,
          type VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          investorId VARCHAR(255),
          projectId VARCHAR(255),
          FOREIGN KEY (investorId) REFERENCES users (id),
          FOREIGN KEY (projectId) REFERENCES projects (id)
        )
      `);
    }
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default getDb;