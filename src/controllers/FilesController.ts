import { Request, Response } from "express";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

interface RequestFileExtend {
  files: {
    file: {
      name: string;
      path: string;
    };
  };
}

type RequestFile = Request & RequestFileExtend;

class FilesController {
  public async save(req: RequestFile, res: Response) {
    const { file } = req.files;

    const directory = path.join(process.env.ABSOLUTE_SAVE_PATH, file.name);

    fs.copyFile(file.path, directory, (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao salvar arquivo", response: err });
      }

      fs.unlink(file.path, (err2) => {
        if (err2) {
          return res.status(500).json({ error: "Erro ao salvar arquivo", response: err2 });
        }

        return res.json({ msg: `Salvo em '${directory}'`, path: directory });
      });
    });
  }
}

export default new FilesController();
