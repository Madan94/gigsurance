import type { Response } from "express";

export function sendError(
  res: Response,
  message = "Something went wrong",
  status = 500,
  extra: Record<string, unknown> = {}
) {
  return res.status(status).json({ success: false, message, ...extra });
}

export function sendSuccess<T = unknown>(
  res: Response,
  message = "OK",
  data: T = {} as T,
  status = 200
) {
  return res.status(status).json({ success: true, message, data });
}