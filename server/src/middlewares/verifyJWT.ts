import { NextFunction, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IRequest } from "../types";

const verifyJWT = (req: IRequest & { [key: string]: any }, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN as Secret, (err, decoded: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.username;
    next();
  });
};


export default verifyJWT;