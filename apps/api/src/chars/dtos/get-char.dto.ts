import { Vision, Weapon } from '../../shared/types';

export class GetCharInfoRes {
  id: number;
  code: string;
  name: string;
  quality: string;
  date_of_birth: number;
  month_of_birth: number;
  release_date: Date;
  title: string;
  constellation: string;
  weapon: {
    code: Weapon;
    translation: string;
  };
  vision: {
    code: Vision;
    tranlsation: string;
  };
  model_type: {
    code: string;
    translation: string;
  };
  regions: string[];
  affiliations: string[];
  voice_actors: {
    language: 'en' | 'fr' | 'cn' | 'jp';
    name: string;
    reference: string;
  }[];
  wikilink: string;
}
