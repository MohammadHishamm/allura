import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { userModel } from '../modules/userModel';

dotenv.config();

export interface ExtendedRequest extends Request {
    user?: any;
}

const validateJWT = async (req: ExtendedRequest,res: Response,next: NextFunction)=>{
    const authorizationHeader = req.get('authorization');

    if(!authorizationHeader){
        return res.status(403).json({message: "No token provided"});
    }

    const token = authorizationHeader.split(' ')[1];

    if(!token){
        return res.status(403).json({message: "Token undefined"});
    }
      const secretKey = process.env.KEY;
      if (!secretKey || typeof secretKey !== "string") {
          return res.status(500).json({message: "JWT secret key not configured"});
      }
      jwt.verify(token, secretKey, async (err, payload) => {
          if(err){
            return res.status(403).json({message: "Invalid token"});
          }
          if(!payload){
            return res.status(403).json({message: "Invalid token"});
          }
          // Fetch user info to request object
         const user = await userModel.findOne({email: (payload as any).email});
          req.user = user;
          next();
      });

}

export default validateJWT;