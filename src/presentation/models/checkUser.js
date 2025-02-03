import { db } from "../../database.js";

function isUserRegistered(email, password) {
  const query = db.prepare(`
        SELECT * 
        FROM user 
        WHERE email = ? AND password = ? 
    `);
  const result = query.get(email, password);

  return result ? result : null;
}

function getUserId(email, password) {
  const query = db.prepare(`
        SELECT id 
        FROM user 
        WHERE email = ? AND password = ? 
    `);

  const user = query.get(email, password); // Fetch the user

  return user ? user.id : null; // Return user ID if found, otherwise return null
}

function checkIfUserAlreadyExists(email) {
  const query = db.prepare(`
        SELECT COUNT(*) AS count 
        FROM user 
        WHERE email = ?
    `);

  const result = query.get(email);

  return result.count > 0; // Returns true if user exists, otherwise false
}

function insertUser(email, password) {

  const query = db.prepare(`
        INSERT INTO user (email, password) 
        VALUES (?, ?)
    `);

  const result = query.run(email, password);
  return result.changes > 0;
}

function insertBooking(room, day, startHour, endHour, user_id) {
  const query = db.prepare(`
        INSERT INTO bookings (room, day, startHour, endHour, user_id) 
        VALUES (?, ?, ?, ?, ?)
    `);

  const result = query.run(room, day, startHour, endHour, user_id);
  return result.changes > 0;

}

export {
  isUserRegistered,
  getUserId,
  checkIfUserAlreadyExists,
  insertUser,
  insertBooking
}
