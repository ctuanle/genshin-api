import { Router } from 'express';
import { getBanners, getBannerByID, getCurrentBanner } from '../controllers/banners';

const bannerRouter = Router();

bannerRouter.get('/current', getCurrentBanner);
bannerRouter.get('/:id', getBannerByID);
bannerRouter.get('/', getBanners);

export default bannerRouter;
