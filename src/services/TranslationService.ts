import LocalizedStrings from 'react-native-localization';
//source files
import en from '../assets/translations/en_GB';

export const Translation = new LocalizedStrings({en});

export const translateString = (str: string) => {
  return Translation.getString(str);
};
