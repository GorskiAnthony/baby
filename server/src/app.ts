import "dotenv/config";
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World with TypeScript and Express!");
});

export default app;
