import { Router } from 'express';
import { IndexController } from '../controller/indexController';
import { Request, Response } from 'express';

const router = Router();
const indexController = new IndexController();

router.get('/index', indexController.getIndex);

router.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

export default router;
