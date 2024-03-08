import { Router } from "express";
import FilesController from "../controllers/FilesController";
import FilesMiddleware from "../middlewares/FilesMiddleware";

const routes = Router();

routes.post("/", FilesMiddleware.fileVerifier, FilesMiddleware.uploadMiddleware, FilesController.save);

export default routes;
