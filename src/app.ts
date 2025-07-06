import express, { Application, NextFunction, Request, Response } from "express";
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err?.message || "Unknown error",
  });
});
export default app;
