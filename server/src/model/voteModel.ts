import { connection } from "../database/connection";

// Get all votes
export async function getVotes() {
	const [rows] = await connection.query("SELECT * FROM vote");
	return rows;
}

// Insert a vote
export async function insertVote(vote: string) {
	const [rows] = await connection.query(
		"INSERT INTO vote (choice) VALUES (?)",
		[vote]
	);
	return rows;
}
