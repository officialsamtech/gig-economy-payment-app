DROP TABLE IF EXISTS profiles;
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);