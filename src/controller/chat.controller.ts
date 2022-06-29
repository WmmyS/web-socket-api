import { Request, Response } from 'express';

export class ChatController {
  renderChat(req: Request, res: Response) {
    res.sendFile(__dirname + '/public/index.html');
  }
}
