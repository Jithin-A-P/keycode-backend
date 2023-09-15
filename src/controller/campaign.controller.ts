import { Router, Request, Response, NextFunction } from 'express';
import validateBody from '../middleware/validate-body.middleware';
import { isUUID } from 'class-validator';
import BadRequestException from '../exception/bad-request.exception';
import validateQuery from '../middleware/validate-query.middleware';
import CampaignService from '../service/campaign.service';
import CampaignDto from '../dto/Campaign.dto';

class CampaignController {
  public router: Router;
  constructor(private campaignService: CampaignService) {
    this.router = Router();
    this.router.get('/', validateQuery, this.getAllCampaigns);
    this.router.post('/', validateBody(CampaignDto), this.addCampaign);
    this.router.get('/:id', this.getCampaignById);
    this.router.put('/:id', validateBody(CampaignDto), this.updateCampaignById);
    this.router.delete('/:id', this.removeCampaignById);
  }

  private addCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedCampaign = await this.campaignService.addCampaign(req.body);

      res.locals.data = addedCampaign;
      res.status(201);
      next();
    } catch (error) {
      next(error);
    }
  }

  private getAllCampaigns = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rowsPerPage = Number(req.query.rowsPerPage);
      const pageNumber = Number(req.query.pageNumber);

      const campaigns = await this.campaignService.getAllCampaigns(rowsPerPage, pageNumber);

      res.locals.total = campaigns.pop();
      res.locals.data = campaigns.pop();
      res.status(200);
      next();
    } catch (error) {
      next(error);
    }
  }

  private getCampaignById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const kioskId = req.params.id;
      if (!isUUID(kioskId)) throw new BadRequestException('Invalid kiosk id');

      const kiosk = await this.campaignService.getCampaignById(kioskId);
      res.status(200);
      res.locals.data = kiosk;
      next();
    } catch (error) {
      next(error);
    }
  }

  private updateCampaignById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const kioskId = req.params.id;
      if (!isUUID(kioskId)) throw new BadRequestException('Invalid kiosk id');

      const updatedCampaign = await this.campaignService.updateCampaign(kioskId, req.body);

      res.status(200);
      res.locals.data = updatedCampaign;
      next();
    } catch (error) {
      next(error);
    }
  }

  private removeCampaignById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const kioskId = req.params.id;
      if (!isUUID(kioskId)) throw new BadRequestException('Invalid kiosk id');

      await this.campaignService.removeCampaignById(kioskId);

      res.status(204);
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default CampaignController;
