import MediaController from '../controller/media.controller'; // Import your MediaController
import dataSource from '../db/postgres.db'; // Import your data source
import Media from '../entity/media.entity'; // Import your Media entity
import MediaRepository from '../repository/media.repository'; // Import your MediaRepository
import MediaService from '../service/media.service'; // Import your MediaService


const mediaRepository = new MediaRepository(
  dataSource.getRepository(Media)
);
const mediaService = new MediaService(mediaRepository);

const mediaController = new MediaController(mediaService);

const mediaRouter = mediaController.router;

export default mediaRouter;
