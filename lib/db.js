import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ai_interview_platform",
});

export default db;
