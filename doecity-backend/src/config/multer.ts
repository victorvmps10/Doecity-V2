import crypto from 'crypto';
import { Request } from 'express';

import multer from 'multer';

import { extname, resolve } from 'path';

export default {
    upload(folder: string){
         return {
              storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (req: Request, file, callback)=>{
                    const type = req.body.typeImage;
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${type}-${fileHash}-${file.originalname}`;

                    return callback(null, fileName)
                }
            })
        }
    }
}