import { Router } from "express";
import FilesController from "../controllers/FilesController";
import FilesMiddleware from "../middlewares/FilesMiddleware";
import { parse } from "express-form-data";

const routes = Router();

const formDataMiddleware = parse();

routes.post("/", formDataMiddleware, FilesMiddleware.fileVerifier, FilesController.save);

export default routes;
