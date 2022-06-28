import { Request, Response } from 'express';

export class IndexController {
  getIndex(req: Request, res: Response) {
    return res.status(200).json({ reponse: 'Deu Bom' });
  }
}
