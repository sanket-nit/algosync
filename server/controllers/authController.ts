import { compare, hash } from "bcrypt";
import { Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../model/User";
import { IRequest } from "../types";

/************************ Login ************************/

const handleLogin = async (req: IRequest, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // Match Password
    const match = await compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign({ username: foundUser.username }, process.env.SECRET_ACCESS_TOKEN as jwt.Secret, { expiresIn: "10s" });

      const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_ACCESS_TOKEN as jwt.Secret, { expiresIn: "1d" });

      foundUser.refreshToken = refreshToken;

      const result = await foundUser.save();
      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });
      // Send authorization roles and access token to user
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/************************ Register  ************************/

const handleRegister = async (req: IRequest, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email and password are required" });
  }

  const duplicateUser = await User.findOne({ username });
  if (duplicateUser) {
    return res.sendStatus(409);
  }

  try {
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ success: `New user ${newUser} created!` });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

/************************ Refresh Token ************************/

const handleRefreshToken = async (req: IRequest, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN as jwt.Secret, (err: any, decoded: any) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
        },
      },
      process.env.SECRET_ACCESS_TOKEN as jwt.Secret,
      { expiresIn: "10s" }
    );
    res.json({ accessToken });
  });
};

const handleLogout = async (req: IRequest, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // Delete cookie from DB
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  return res.sendStatus(204);
};

export { handleLogin, handleRefreshToken, handleRegister, handleLogout };
