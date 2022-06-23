import { Request, Response, NextFunction } from 'express';

import sendError, { ErrorWrapper } from '../helpers/send-error';
import { BannerType, ModelType, RarityType, Region, Version } from '../models/Basic.type';

function bannerChecker(req: Request, res: Response, next: NextFunction) {
  if (!req.body.name) {
    return sendError(new ErrorWrapper(400, 'Banner name is required!'), res);
  }
  if (!req.body.type) {
    return sendError(new ErrorWrapper(400, 'Banner type is required! Ex: "Character"'), res);
  }
  if (!Object.values(BannerType).includes(req.body.type)) {
    return sendError(new ErrorWrapper(400, 'Unknown banner type! Ex: "Character"'), res);
  }
  if (!req.body.version) {
    return sendError(new ErrorWrapper(400, 'Version is required! Ex: "v1.0"'), res);
  }
  if (!Object.values(Version).includes(req.body.version)) {
    return sendError(new ErrorWrapper(400, 'Unknown version! Ex: "v1.0"'), res);
  }
  if (
    !req.body.featured ||
    typeof req.body.featured !== 'object' ||
    req.body.featured.length !== 3
  ) {
    return sendError(
      new ErrorWrapper(400, 'Array of 3 Featured character ids are required! Ex: [1, 2, 3]'),
      res
    );
  }
  req.body.featured.forEach((id: any) => {
    if (!Number(id) || Number(id) < 1) {
      return sendError(new ErrorWrapper(400, 'Invalid featured character id! Ex: 1'), res);
    }
  });
  if (!req.body.start) {
    return sendError(new ErrorWrapper(400, 'Start date is required! Ex: "2022-11-11"'), res);
  }
  if (!Date.parse(req.body.start)) {
    return sendError(new ErrorWrapper(400, 'Invalid start date format! Ex: "2022-11-11"'), res);
  }
  if (req.body.end && !Date.parse(req.body.end)) {
    return sendError(new ErrorWrapper(400, 'Invalid end date format! Ex: "2022-11-11"'), res);
  }
  next();
}

function characterChecker(req: Request, res: Response, next: NextFunction) {
  if (!req.body.name) {
    return sendError(new ErrorWrapper(400, 'Character name is required!'), res);
  }
  if (!req.body.rarity) {
    return sendError(new ErrorWrapper(400, 'Character rarity is required! Ex: "4_star"'), res);
  }
  if (!Object.values(RarityType).includes(req.body.rarity)) {
    return sendError(new ErrorWrapper(400, 'Unknown Character rarity! Ex: "4_star"'), res);
  }
  if (!req.body.model_type) {
    return sendError(
      new ErrorWrapper(400, 'Character model type is required! Ex: "Tall male"'),
      res
    );
  }
  if (!Object.values(ModelType).includes(req.body.model_type)) {
    return sendError(new ErrorWrapper(400, 'Unknown Character model type! Ex: "Tall male"'), res);
  }
  if (!req.body.birthday) {
    return sendError(new ErrorWrapper(400, 'Character birthday is required! Ex: "April 1"'), res);
  }
  if (!req.body.constellation) {
    return sendError(new ErrorWrapper(400, 'Character constellation is required!'), res);
  }
  if (!req.body.region || typeof req.body.region !== 'object' || req.body.region.length < 1) {
    return sendError(new ErrorWrapper(400, 'Array of at least one region is required!'), res);
  }
  req.body.region.forEach((reg: any) => {
    if (!Object.values(Region).includes(reg)) {
      return sendError(new ErrorWrapper(400, 'Unknown Region name! Ex: "Mondstadt"'), res);
    }
  });
  if (req.body.affiliation && typeof req.body.affiliation !== 'object') {
    return sendError(
      new ErrorWrapper(400, 'Unknown affiliation format! Ex: ["Knight of Favornius", ...] '),
      res
    );
  }
  if (req.body.how_to_obtain && typeof req.body.how_to_obtain !== 'object') {
    return sendError(
      new ErrorWrapper(400, 'Unknown affiliation format! Ex: ["Wishes", ...] '),
      res
    );
  }
  if (!req.body.release_day) {
    return sendError(
      new ErrorWrapper(400, 'Character release day is required! Ex: "2022-4-1"'),
      res
    );
  }
  if (!Date.parse(req.body.release_day)) {
    return sendError(new ErrorWrapper(400, 'Unknown release day format! Ex: "2022-4-1"'), res);
  }
  if (!req.body.release_version) {
    return sendError(
      new ErrorWrapper(400, 'Character release version is required! Ex: "v2.2"'),
      res
    );
  }
  if (!Object.values(Version).includes(req.body.release_version)) {
    return sendError(new ErrorWrapper(400, 'Unknown release version! Ex: "v2.2"'), res);
  }
  if (!req.body.category) {
    return sendError(
      new ErrorWrapper(400, 'Character category is required! Ex: "Playable Character"'),
      res
    );
  }
  if (!['Playable Character', 'NPC'].includes(req.body.category)) {
    return sendError(
      new ErrorWrapper(400, 'Unknown Character category! Ex: "Playable Character"'),
      res
    );
  }
  if (!req.body.wiki_url) {
    return sendError(new ErrorWrapper(400, 'Character wiki url is required!'), res);
  }
  if (!req.body.voice_actors) {
    return sendError(new ErrorWrapper(400, 'Character voice actors is required!'), res);
  }
  if (
    !req.body.voice_actors.English ||
    !req.body.voice_actors.Japanese ||
    !req.body.voice_actors.Chinese ||
    !req.body.voice_actors.Korean
  ) {
    return sendError(
      new ErrorWrapper(
        400,
        'Unknown voice actors format! Ex: {"English": "actor", "Japanese": "actor", "Chinese": "actor", "Korean": "actor"}'
      ),
      res
    );
  }
  next();
}

export default function typeChecker(req: Request, res: Response, next: NextFunction) {
  switch (req.originalUrl.split('?')[0]) {
    case '/banners': {
      return bannerChecker(req, res, next);
    }
    case '/characters': {
      return characterChecker(req, res, next);
    }
    default: {
      return sendError(new ErrorWrapper(400, 'Bad request!'), res);
    }
  }
}
