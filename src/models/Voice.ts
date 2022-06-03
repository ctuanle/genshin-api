import { model, Schema, Types } from 'mongoose';

export interface IVoice {
  _id?: string;
  title: string;
  requirement?: string;
  details: string[];
  spoken_by: Types.ObjectId;
}

const VoiceSchema = new Schema<IVoice>({
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

const VoiceModel = model<IVoice>('Voice', VoiceSchema);

export default VoiceModel;
