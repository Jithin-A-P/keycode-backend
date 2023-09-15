import { Router, Request, Response, NextFunction } from 'express';
import validateBody from '../middleware/validate-body.middleware';
import KioskDto from '../dto/kiosk.dto';
import validateQuery from '../middleware/validate-query.middleware';
import KioskService from '../service/kiosk.service';
import { KioskQMedia } from '../models/kioskQMedia.model';
import KioskQService, { KioskQServiceCls } from '../service/kioskQueue.service';

class KioskController {
  public router: Router;
  private kioskQService: KioskQServiceCls;
  constructor(private kioskService: KioskService) {
    this.router = Router();
    this.router.get('/', validateQuery, this.getAllKiosks);
    this.router.post('/', validateBody(KioskDto), this.addKiosk);
    this.router.get('/:id/queue', this.getKioskQueue);
    this.router.post('/:id/queue/add', validateBody(KioskQMedia), this.addToKioskQueue);
    this.router.get('/:id/queue/next', this.getNextKioskQueueItem);
    this.router.get('/:id', this.getKioskById);
    this.router.put('/:id', validateBody(KioskDto), this.updateKioskById);
    this.router.delete('/:id', this.removeKioskById);
    this.kioskQService = KioskQService;
  }

  private addKiosk = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedKiosk = await this.kioskService.addKiosk(req.body);

      res.locals.data = addedKiosk;
      res.status(201);
      next();
    } catch (error) {
      next(error);
    }
  }

  private getAllKiosks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rowsPerPage = Number(req.query.rowsPerPage);
      const pageNumber = Number(req.query.pageNumber);

      const kiosks = await this.kioskService.getAllKiosks(rowsPerPage, pageNumber);

      res.locals.total = kiosks.pop();
      res.locals.data = kiosks.pop();
      res.status(200);
      next();
    } catch (error) {
      next(error);
    }
  }

  private getKioskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const kioskId = req.params.id;

      const kiosk = await this.kioskService.getKioskById(kioskId);
      res.status(200);
      res.locals.data = kiosk;
      next();
    } catch (error) {
      next(error);
    }
  }

  private updateKioskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const kioskId = req.params.id;

      const updatedKiosk = await this.kioskService.updateKiosk(kioskId, req.body);

      res.status(200);
      res.locals.data = updatedKiosk;
      next();
    } catch (error) {
      next(error);
    }
  }

  private removeKioskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const kioskId = req.params.id;

      await this.kioskService.removeKioskById(kioskId);

      res.status(204);
      next();
    } catch (error) {
      next(error);
    }
  }

  private addToKioskQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedKiosk = this.kioskQService.addToKioskQ(req.params.id, req.body);

      // res.locals.data = addedKiosk;
      res.status(201);
      next();
    } catch (error) {
      next(error);
    }
  }

  private getKioskQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.data = this.kioskQService.getKioskQ(req.params.id) || [];
      res.status(200);
      next();
    } catch (err) {
      next(err);
    }
  }

  private getNextKioskQueueItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.data = this.kioskQService.getNextKioskQItem(req.params.id);
      res.status(200);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export default KioskController;
