import { Router, Request, Response, NextFunction } from 'express';
import validateBody from '../middleware/validate-body.middleware';
import MediaDto from '../dto/media.dto';
import validateQuery from '../middleware/validate-query.middleware';
import MediaService from '../service/media.service';

class MediaController {
  public router: Router;

  constructor(private mediaService: MediaService) {
    this.router = Router();
    this.router.get('/', validateQuery, this.getAllMedia);
    this.router.post('/', validateBody(MediaDto), this.addMedia);
    this.router.get('/:id', this.getMediaById);
    this.router.put('/:id', validateBody(MediaDto), this.updateMediaById);
    this.router.delete('/:id', this.removeMediaById);
  }

  private addMedia = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedMedia = await this.mediaService.addMedia(req.body);

      res.locals.data = addedMedia;
      res.status(201);
      next();
    } catch (error) {
      next(error);
    }
  }

  private getAllMedia = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rowsPerPage = Number(req.query.rowsPerPage);
      const pageNumber = Number(req.query.pageNumber);

      const media = await this.mediaService.getAllMedia(rowsPerPage, pageNumber);

      res.locals.total = media.pop();
      res.locals.data = media.pop();
      res.status(200);
      next();
    } catch (error) {
      next(error);
    }
  }

  private getMediaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mediaId = req.params.id;

      const media = await this.mediaService.getMediaById(mediaId);
      res.status(200);
      res.locals.data = media;
      next();
    } catch (error) {
      next(error);
    }
  }

  private updateMediaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mediaId = req.params.id;

      const updatedMedia = await this.mediaService.updateMedia(mediaId, req.body);

      res.status(200);
      res.locals.data = updatedMedia;
      next();
    } catch (error) {
      next(error);
    }
  }

  private removeMediaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mediaId = req.params.id;

      await this.mediaService.removeMediaById(mediaId);

      res.status(204);
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default MediaController;
