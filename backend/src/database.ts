import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

const db: Database = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Create tables
export const init = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)", (err) => {
            if (err) {
                console.error("Could not create users table", err);
            }
        });
        db.run("CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT, email TEXT)", (err) => {
            if (err) {
                console.error("Could not create profiles table", err);
            }
        });
    });
}

export default db;
