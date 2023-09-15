import KioskController from "../controller/kiosk.controller";
import dataSource from "../db/postgres.db";
import Kiosk from "../entity/kiosk.entity";
import KioskRepository from "../repository/kiosk.repository";
import KioskService from "../service/kiosk.service";

const kioskRepository = new KioskRepository(dataSource.getRepository(Kiosk));

const kioskService = new KioskService(kioskRepository);

const kioskController = new KioskController(kioskService);

const kioskRouter = kioskController.router;

export default kioskRouter;
