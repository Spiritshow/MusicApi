import { Request } from "express";

export interface IReq<T = any> extends Request{
    body: T
}