import CampaignController from "../controller/campaign.controller";
import dataSource from "../db/postgres.db";
import Campaign from "../entity/campaign.entity";
import Kiosk from "../entity/kiosk.entity";
import KioskTimeSlot from "../entity/kioskTimeslot.entity";
import CampaignRepository from "../repository/campaign.repository";
import KioskRepository from "../repository/kiosk.repository";
import KioskTimeSlotRepository from "../repository/kiosk.timeslot.repository";
import CamapignService from "../service/campaign.service";

const campaignRepository = new CampaignRepository(dataSource.getRepository(Campaign));
const kioskTimeslotRepository = new KioskTimeSlotRepository(dataSource.getRepository(KioskTimeSlot));
const kioskRepository = new KioskRepository(dataSource.getRepository(Kiosk));


const campaignService = new CamapignService(campaignRepository,kioskTimeslotRepository,kioskRepository);

const campaignControler = new CampaignController(campaignService);

const campaignRouter = campaignControler.router;

export default campaignRouter;
