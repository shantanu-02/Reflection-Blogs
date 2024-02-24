import mysql from "mysql";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "shantanu1821389",
  database: process.env.DB_NAME || "blog",
};

export const db = mysql.createConnection(dbConfig);
