import { Request, Response } from 'express';

import BannerModel from '../models/Banner';
import { IBanner } from '../models/Banner';
import sendError, { ErrorWrapper } from '../helpers/send-error';

export const getBanners = async (req: Request, res: Response) => {
  try {
    const totalResults = await BannerModel.count();
    const totalPages = Math.ceil(totalResults / 10);
    let page = Number(req.query.page) || 1;
    if (page < 1 || page > totalPages) page = 1;

    const banners: IBanner[] = await BannerModel.find({}, { _id: 0, __v: 0 })
      .skip(10 * (page - 1))
      .limit(10)
      .populate('featured', { _id: 0, id: 1, name: 1 });

    return res.status(200).json({
      page: page,
      results: banners,
      total_results: totalResults,
      total_pages: totalPages,
    });
  } catch (error) {
    return sendError(error, res);
  }
};

export const getBannerByID = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new ErrorWrapper(404, 'Unknown ID');

    const banner = await BannerModel.findOne({ id: id }, { _id: 0, __v: 0 }).populate('featured', {
      _id: 0,
      id: 1,
      name: 1,
    });
    if (!banner) throw new ErrorWrapper(404, 'Unknown ID');

    return res.status(200).json({
      result: banner,
    });
  } catch (error) {
    return sendError(error, res);
  }
};

export const getCurrentBanner = async (req: Request, res: Response) => {
  try {
    const banners = await BannerModel.find(
      {
        end: {
          $gte: new Date(),
        },
      },
      { _id: 0, __v: 0 }
    ).populate('featured', {
      _id: 0,
      id: 1,
      name: 1,
    });

    return res.status(200).json({
      results: banners || 'No current banner',
    });
  } catch (error) {
    return sendError(error, res);
  }
};
