import { model, Schema } from 'mongoose';
import ICharacter from './Character.interface';

// Character scheme
const CharacterSchema = new Schema<ICharacter>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: [String],
    required: false,
  },
  real_name: {
    type: String,
    required: false,
  },
  rarity: {
    type: String,
    required: true,
  },
  weapon: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  model_type: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  constellation: {
    type: String,
    required: true,
  },
  region: {
    type: [String],
    required: true,
  },
  affiliation: {
    type: [String],
    required: false,
  },
  special_dish: {
    type: String,
    required: false,
  },
  how_to_obtain: {
    type: [String],
    required: false,
  },
  release_day: {
    type: Date,
    required: true,
  },
  release_version: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  voice_actors: {
    type: [Object],
    required: true,
  },
  wiki_url: {
    type: String,
    required: true,
  },
});

const CharacterModel = model<ICharacter>('Character', CharacterSchema);

export default CharacterModel;
