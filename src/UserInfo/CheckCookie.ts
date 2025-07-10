import express, { Response } from "express";
import { authenticateToken, IReqAuth } from "./helpers";

const checkCookie = express.Router();

checkCookie.get("/checkCookie", authenticateToken,(req: IReqAuth, res: Response) => {
  res.status(200).json({auth:true});
})

export default checkCookie;