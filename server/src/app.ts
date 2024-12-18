import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { getVotes, insertVote } from "./model/voteModel";

const app = express();

const optCors = {
	origin: process.env.CLIENT_URL,
};

app.use(cors(optCors));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World with TypeScript and Express!");
});

app.route("/api/vote")
	.post(async (req: Request, res: Response) => {
		const { vote } = req.body;
		await insertVote(vote);
		res.json({ message: "Vote inserted" });
	})
	.get(async (req: Request, res: Response) => {
		const votes = await getVotes();
		res.json(votes);
	});

export default app;
