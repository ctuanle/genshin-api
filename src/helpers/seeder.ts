import CharacterModel from '../models/Character';
import { ICharacter } from '../models/Character.interface';

export const charsSeeder = async (chars: ICharacter[]) => {
  try {
    await CharacterModel.insertMany(chars);
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const charSeeder = async (char: ICharacter) => {
  try {
    const newId = (await CharacterModel.count()) + 1;
    const newChar = new CharacterModel(char);
    newChar.id = newId;
    await newChar.save();
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
