import { Request, Response, Router } from "express";
import files from "./files";

const routes = Router();

routes.use("/file", files);

routes.use((req: Request, res: Response) =>
  res.status(404).json({ erro: "Rota desconhecida" })
);

export default routes;
