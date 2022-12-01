import { capSQLiteSet } from '@capacitor-community/sqlite';
export const createSchema: string = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    last_modified INTEGER DEFAULT (strftime('%s', 'now'))
);
`;
