import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET as string

interface JwtPayload {
    id: number;
    login: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload;
    }
}

export function authenticateToken(req: Request, res:Response, next: NextFunction){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Token nao fonecido", success: false})
    }

    try{
        const decoded = jwt.verify(token, SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({message: "Token invalido ou expirado", success: false})
    }
}