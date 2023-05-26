export const createSchema: string = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        name TEXT NULL,
        surname TEXT NULL,
        username TEXT NOT NULL,
        dob TEXT NULL,
        phone TEXT NULL,
        email TEXT NULL,
        school TEXT NULL,
        payment INTEGER NULL,
        last_modified INTEGER DEFAULT (strftime('%s', 'now'))
    );
`;
