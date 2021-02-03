import {StyleSheet} from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';

const GlobalStyles = StyleSheet.create({
  standardText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 15,
    color: Colors.WHITE,
  },

  titleText: {
    fontFamily: Fonts.LIGHT,
    fontSize: 25,
    color: Colors.WHITE,
  },

  hugeText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 70,
    color: Colors.WHITE,
  },

  headerText: {
    fontFamily: Fonts.LIGHT,
    fontSize: 20,
    color: Colors.WHITE,
    alignSelf: 'flex-start',
  },

  errorText: {
    fontFamily: Fonts.LIGHT,
    fontSize: 12,
    color: Colors.DANGER,
    marginTop: 4,
    marginLeft: 10,
  },

  darkText: {
    color: Colors.DARK,
  },

  informalContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 20,
    padding: 20,
  },
});

export default GlobalStyles;
