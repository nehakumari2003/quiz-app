import db from "../config/db.js";

export async function createUser(name, email, hashedPassword, role) {
  const result = await db.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
}

export async function findUserByEmail(email) {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
}
