import CampaignController from "../controller/campaign.controller";
import dataSource from "../db/postgres.db";
import Campaign from "../entity/campaign.entity";
import CampaignRepository from "../repository/campaign.repository";
import CamapignService from "../service/campaign.service";

const campaignRepository = new CampaignRepository(dataSource.getRepository(Campaign));

const campaignService = new CamapignService(campaignRepository);

const campaignControler = new CampaignController(campaignService);

const campaignRouter = campaignControler.router;

export default campaignRouter;
