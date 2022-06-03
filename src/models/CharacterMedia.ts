import { model, Schema, Types } from 'mongoose';

export interface ICharacterMedia {
  videos: string[];
  cameos: string[];
  artwork: string[];
  birthday: string[];
  holiday: string[];
  promotion: string[];
  character: Types.ObjectId;
}

const CharacterMediaSchema = new Schema<ICharacterMedia>({
  videos: {
    type: [String],
    required: true,
  },
  cameos: {
    type: [String],
    required: true,
  },
  artwork: {
    type: [String],
    required: true,
  },
  birthday: {
    type: [String],
    required: true,
  },
  holiday: {
    type: [String],
    required: true,
  },
  promotion: {
    type: [String],
    required: true,
  },
  character: {
    type: Schema.Types.ObjectId,
    ref: 'Character',
  },
});

const CharacterMediaModel = model('CharacterMedia', CharacterMediaSchema);

export default CharacterMediaModel;
