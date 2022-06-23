import { Router, json } from 'express';
import { getBanners, getBannerByID, getCurrentBanner, postAddBanner } from '../controllers/banners';
import typeChecker from '../middlewares/type-checker';
import keyChecker from '../middlewares/check-key';

const bannerRouter = Router();

bannerRouter.get('/current', getCurrentBanner);
bannerRouter.get('/:id', getBannerByID);

bannerRouter.route('/').get(getBanners).post(keyChecker, json(), typeChecker, postAddBanner);

export default bannerRouter;
