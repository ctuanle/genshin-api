import {
  RarityType,
  WeaponType,
  VisionType,
  ModelType,
  Region,
  Version,
  VoiceActorsType,
} from './Basic.type';

// Character Interface
interface ICharacter {
  id: number;
  name: string;
  title?: string[];
  real_name?: string;
  rarity: RarityType;
  weapon: WeaponType;
  vision: VisionType;
  model_type: ModelType;
  birthday: string;
  constellation: string;
  region: Region[];
  affiliation?: string[];
  special_dish?: string;
  how_to_obtain?: string[];
  release_day: Date;
  release_version: Version;
  category: 'Playable Character' | 'NPC';
  voice_actors: VoiceActorsType;
  wiki_url: string;
}

export default ICharacter;
