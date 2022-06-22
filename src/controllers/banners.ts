/* eslint-disable @typescript-eslint/no-throw-literal */
import { Request, Response } from 'express';

import CharacterModel from '../models/Character';
import BannerModel from '../models/Banner';
import { IBanner } from '../models/Banner';
import { BannerType, Version } from '../models/Basic.type';
import sendError, { ErrorWrapper } from '../helpers/send-error';

export const getBanners = async (req: Request, res: Response) => {
  try {
    const totalResults = await BannerModel.count();
    const totalPages = Math.ceil(totalResults / 10);
    let page = Number(req.query.page) || 1;
    if (page < 1 || page > totalPages) page = 1;

    const banners: IBanner[] = await BannerModel.find({}, { _id: 0, __v: 0 })
      .sort({ id: 1 })
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

export const postAddBanner = async (req: Request, res: Response) => {
  try {
    const newId = (await BannerModel.count()) + 1;
    const name = req.body.name;
    const type = req.body.type as BannerType;
    const version = req.body.version as Version;
    const start = new Date(req.body.start);
    const end = new Date(req.body.end);
    const featured = req.body.featured;
    const char1 = await CharacterModel.findOne({ id: featured[0] });
    const char2 = await CharacterModel.findOne({ id: featured[1] });
    const char3 = await CharacterModel.findOne({ id: featured[2] });

    if (!char1 || !char2 || !char3) {
      throw new ErrorWrapper(400, 'Unknown featured character Id');
    }

    const newBanner = new BannerModel<IBanner>({
      id: newId,
      name: name,
      type: type,
      version: version,
      start: start,
      end: end,
      featured: [char1._id, char2._id, char3._id],
    });

    await newBanner.save();

    return res.status(201).json({
      id: newBanner.id,
      message: 'Banner added successfully!',
    });
  } catch (error) {
    return sendError(error, res);
  }
};
