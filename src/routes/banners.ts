import { Router, json } from 'express';
import { getBanners, getBannerByID, getCurrentBanner, postAddBanner } from '../controllers/banners';
import typeChecker from '../middlewares/type-checker';

const bannerRouter = Router();

bannerRouter.get('/current', getCurrentBanner);
bannerRouter.get('/:id', getBannerByID);
bannerRouter.get('/', getBanners);
bannerRouter.post('/', json(), typeChecker, postAddBanner);
export default bannerRouter;
