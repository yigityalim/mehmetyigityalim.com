import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

type Db = typeof db;

export default db
export type { Db }
