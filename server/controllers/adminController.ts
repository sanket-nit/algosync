import { Response } from "express";
import { User } from "../model/User";
import { IRequest } from "../types";

const getAllUsers = async (req: IRequest, res: Response) => {
  const allUsers = await User.find({});
  return res.json({users: allUsers});
};

const getUser = async (req: IRequest, res: Response) => {
  const user = req.user;
  const allUsers = await User.find({});
  return res.json(allUsers);
};

export { getAllUsers };
