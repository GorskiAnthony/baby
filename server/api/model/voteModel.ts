import { connection } from "../database/connection";

export async function getVotes(sexe: string) {
	const [rows] = await connection.query(
		`SELECT 
			SUM(CASE WHEN choice = ? THEN 1 ELSE 0 END) AS nb,
			COUNT(choice) AS total
		FROM vote`,
		[sexe]
	);
	return rows;
}

export async function insertVote(vote: string) {
	const [rows] = await connection.query(
		"INSERT INTO vote (choice) VALUES (?)",
		[vote]
	);
	return rows;
}
