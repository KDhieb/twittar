const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const fs = require("fs");
const { Pool } = require("pg");

var env = process.env;

const config = {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  port: env.DB_PORT,
};

const pool = new Pool(config);

module.exports = pool;
