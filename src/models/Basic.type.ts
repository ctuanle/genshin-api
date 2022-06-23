export enum Region {
  Mondstadt = 'Mondstadt',
  Liyue = 'Liyue',
  Inazuma = 'Inazuma',
  Sumeru = 'Sumeru',
  Fontaine = 'Fontaine',
  Natlan = 'Natlan',
  Snezhnaya = 'Snezhnaya',
  Khaenriah = "Khaenri'ah",
  Unknown = 'Unknown',
}

export enum ModelType {
  TallMale = 'Tall male',
  TallFemale = 'Tall female',
  MediumMale = 'Medium male',
  MediumFemale = 'Medium female',
  ShortFemale = 'Short female',
}

export enum WeaponType {
  Sword = 'Sword',
  Polearm = 'Polearm',
  Bow = 'Bow',
  Claymore = 'Claymore',
  Catalyst = 'Catalyst',
}

export enum VisionType {
  Pyro = 'Pyro',
  Cryo = 'Cryo',
  Hydro = 'Hydro',
  Dendro = 'Dendro',
  Anemo = 'Anemo',
  Electro = 'Electro',
  Geo = 'Geo',
  None = 'None',
}

export enum RarityType {
  FourStart = '4_star',
  FiveStart = '5_start',
}

export enum Version {
  v10 = 'v1.0',
  v11 = 'v1.1',
  v12 = 'v1.2',
  v13 = 'v1.3',
  v14 = 'v1.4',
  v15 = 'v1.5',
  v16 = 'v1.6',
  v20 = 'v2.0',
  v21 = 'v2.1',
  v22 = 'v2.2',
  v23 = 'v2.3',
  v24 = 'v2.4',
  v25 = 'v2.5',
  v26 = 'v2.6',
  v27 = 'v2.7',
  upcoming = 'upcoming',
}

export enum BannerType {
  Character = 'Character',
  Weapon = 'Weapon',
  Permanent = 'Permanent',
}

export type VoiceActorsType = {
  English: string;
  Chinese: string;
  Japanese: string;
  Korean: string;
};
