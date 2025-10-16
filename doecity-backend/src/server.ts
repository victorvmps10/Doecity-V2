import express, { Request, Response, NextFunction } from "express";
import 'express-async-error';
import cors from 'cors';
import { router } from "./routes";
import path from "path";
const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use(
    '/upload',
    express.static(path.resolve(__dirname, '..', 'images'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
});

const PORT = 3333;
//const PORT = process.env.PORT || 3333;
app.listen(PORT, () => { console.log("Server DoeCity Ativado!!!") });
