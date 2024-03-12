import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

interface RequestFileExtend {
  files?: {
    file: any;
  };
}

type RequestFile = RequestFileExtend & Request;

class FilesMiddleware {
  public fileVerifier = (
    req: RequestFile,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.files || !req.files?.file) {
      res.status(400).json({
        error:
          "Arquivo 'file' não encontrado, verifique se 'file' foi inserido no form.",
      });
    } else {
      next();
    }
  };
}

export default new FilesMiddleware();
