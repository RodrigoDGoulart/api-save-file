import { Request, Response } from "express";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

interface RequestFileExtend {
  file: {
    originalname: string;
    path: string;
  };
}

type RequestFile = Request & RequestFileExtend;

class FilesController {
  public async save(req: RequestFile, res: Response) {
    const {file} = req
    return res.json({ filename:  file.originalname, path: file.path});
  }
}

export default new FilesController();
