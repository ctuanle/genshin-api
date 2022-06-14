import { model, Schema, Types } from 'mongoose';

import { Version, BannerType } from './Basic.type';

// interface IWeapon {
//   name: string;
//   type: WeaponType;
// }

export interface IBanner {
  [key: string]: any;
  id: number;
  name: string;
  type: BannerType;
  version: Version;
  featured: Types.ObjectId[];
  start: Date;
  end?: Date;
}

const BannerSchema = new Schema<IBanner>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  featured: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Character',
    },
  ],
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: false,
  },
});

const BannerModel = model('Banner', BannerSchema);

export default BannerModel;
