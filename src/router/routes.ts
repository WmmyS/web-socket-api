import { Router } from 'express';
import { IndexController } from '../controller/index.controller';
import { ChatController } from '../controller/chat.controller';
import { Request, Response } from 'express';
import { notification } from '../server';

const router = Router();
const indexController = new IndexController();
const chatController = new ChatController();

/** Rota do Index Inicial do projeto */
router.get('/index', indexController.getIndex);

/** Rota de exposição da página de chat */
router.get('/chat', chatController.renderChat);

router.get('/notification', (req: Request, res: Response) => {
  notification();
  res.status(200).send('ok');
});

router.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

export default router;
