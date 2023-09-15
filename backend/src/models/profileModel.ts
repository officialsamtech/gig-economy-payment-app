import db from '../database';

export const createProfile = (user_id: number, first_name: string, last_name: string, email: string) => {
    const query = "INSERT INTO profiles (user_id, first_name, last_name, email) VALUES (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.run(query, [user_id, first_name, last_name, email], function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
        });
    });
};

export const getProfileByUserId = (user_id: number) => {
    const query = "SELECT * FROM profiles WHERE user_id = ?";
    return new Promise((resolve, reject) => {
        db.get(query, [user_id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
};

export const updateProfile = (user_id: number, first_name: string, last_name: string, email: string) => {
    const query = "UPDATE profiles SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?";
    return new Promise((resolve, reject) => {
        db.run(query, [first_name, last_name, email, user_id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};
