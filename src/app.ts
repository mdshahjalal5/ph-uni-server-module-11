import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
export const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("ass...");
});
