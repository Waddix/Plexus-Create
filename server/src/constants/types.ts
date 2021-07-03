import { Request, Response } from 'express';

// explicit type
export type PlexusContext = {
  req: Request
  res: Response
}
