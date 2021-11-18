const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "StoreDB",
  password: "1234",
  port: 5432,
});

const getUsernameAndPasswordOfUser = async (username, password) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    //return rows.length > 0;
    return rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getUsernameAndPasswordOfUser,
};
