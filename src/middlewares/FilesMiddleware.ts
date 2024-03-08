import multer from "multer";
import path from "path";
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

interface RequestFileExtend {
  files?: {
    file: any
  }
}

type RequestFile = RequestFileExtend & Request

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.ABSOLUTE_SAVE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}${path.extname(file.originalname)}`); // anexa a extensão do arquivo
  },
});

const upload = multer({ storage: storage });

class FilesMiddleware {
  public uploadMiddleware = upload.single("file");

  public fileVerifier = (req: RequestFile, res: Response, next: NextFunction) => {
    if (!req.files || !req.files?.file) {
      res.status(400).json({error: "Arquivo 'file' não encontrado, verifique se 'file' foi inserido no form."})
    }
  }
}

export default new FilesMiddleware();
