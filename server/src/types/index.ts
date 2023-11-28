import { Request } from "express";

export interface IUser {
  username: string;
  password: string;
  email: string;
  refreshToken?: string;
}

export interface IRequest extends Request {
  [key:string] : any;
}