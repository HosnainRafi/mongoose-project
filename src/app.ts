import express, { Application, Request, Response } from "express";
import cors from "cors";
import { studentRoutes } from "./modules/student/student.route";

const app: Application = express();
// const port = 3000

app.use(express.json());
app.use(cors());

//student route
app.use("/api/v1/students", studentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
