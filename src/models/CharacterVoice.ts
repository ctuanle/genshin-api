import { model, Schema, Types } from 'mongoose';

export interface ICharacterVoice {
  _id?: string;
  title: string;
  requirement?: string;
  details: string[];
  spoken_by: Types.ObjectId;
}

const CharacterVoiceSchema = new Schema<ICharacterVoice>({
  title: {
    type: String,
    required: true,
  },
  requirement: {
    type: String,
    required: false,
  },
  details: {
    type: [String],
    required: true,
  },
  spoken_by: {
    type: Schema.Types.ObjectId,
    ref: 'Character',
  },
});

const CharacterVoiceModel = model<ICharacterVoice>('CharacterVoice', CharacterVoiceSchema);

export default CharacterVoiceModel;
