const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { Pool } = require("pg");

var env = process.env;

// const config = {
//   user: env.DB_USER,
//   password: env.DB_PASSWORD,
//   host: env.DB_HOST,
//   database: env.DB_DATABASE,
//   port: env.DB_PORT,
//   ssl: true,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: { require: true },
//   },
// };

// const pool = new Pool(config);

const pool = new Pool({
  connectionString: env.DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
