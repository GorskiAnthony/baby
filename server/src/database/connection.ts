import mysql from "mysql2/promise";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

async function createConnection() {
	const connection = await mysql.createConnection({
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
	});
	return connection;
}

let connection: mysql.Connection;

async function initializeConnection() {
	connection = await createConnection();

	if (connection) {
		console.log("Database connected 🚀");
	} else {
		console.log("Database connection failed 😭");
	}
}

initializeConnection();

export { connection };
