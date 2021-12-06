import { Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
};
