import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";


export async function isONG(
    req: Request,
    res: Response,
    next: NextFunction
){
    const user_id  = req.user_id;
     const isONG = await prismaClient.users.findFirst({
        where:{
            id: user_id,
            isONG: true
        }
       
     });
     if(!isONG){
        return res.status(401).end();
     }
    return next();
}