type Region =
  | 'Mondstadt'
  | 'Liyue'
  | 'Inazuma'
  | 'Sumeru'
  | 'Fontaine'
  | 'Natlan'
  | 'Snezhnaya'
  | "Khaenri'ah"
  | 'Unknown';

type ModelType = 'Tall male' | 'Tall female' | 'Medium male' | 'Medium female' | 'Short female';

type WeaponType = 'Sword' | 'Polearm' | 'Bow' | 'Claymore' | 'Catalyst';

type VisionType = 'Pyro' | 'Cryo' | 'Hydro' | 'Dendro' | 'Anemo' | 'Electro' | 'Geo' | 'None';

type RarityType = '4_star' | '5_star';

type ReleaseVersion =
  | 'v1.0'
  | 'v1.1'
  | 'v1.2'
  | 'v1.3'
  | 'v1.4'
  | 'v1.5'
  | 'v1.6'
  | 'v2.0'
  | 'v2.1'
  | 'v2.2'
  | 'v2.3'
  | 'v2.4'
  | 'v2.5'
  | 'v2.6'
  | 'v2.7'
  | 'upcoming';

export type VoiceActorsType = {
  English: string;
  Chinese: string;
  Japanese: string;
  Korean: string;
};

// Character Interface
export interface ICharacter {
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
  release_version: ReleaseVersion;
  category: 'Playable Character' | 'NPC';
  voice_actors: VoiceActorsType;
  wiki_url: string;
}
