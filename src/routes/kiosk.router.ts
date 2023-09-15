import KioskController from "../controller/kiosk.controller";
import dataSource from "../db/postgres.db";
import Kiosk from "../entity/kiosk.entity";
import KioskTimeSlot from "../entity/kioskTimeslot.entity";
import KioskRepository from "../repository/kiosk.repository";
import KioskTimeSlotRepository from "../repository/kiosk.timeslot.repository";
import KioskService from "../service/kiosk.service";

const kioskRepository = new KioskRepository(dataSource.getRepository(Kiosk));
const kioskTimeslotRepository = new KioskTimeSlotRepository(dataSource.getRepository(KioskTimeSlot));

const kioskService = new KioskService(kioskRepository, kioskTimeslotRepository);

const kioskController = new KioskController(kioskService);

const kioskRouter = kioskController.router;

export default kioskRouter;
