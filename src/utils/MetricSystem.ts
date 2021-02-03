import Colors from '../styles/Colors';

export const numberToCelsiusString = (n: number) => {
  return Math.round(n) + '°';
};

export const getTempColor = (n: number) => {
  if (n < 10) {
    return Colors.PRIMARY;
  } else if (n < 10) {
    return Colors.BLACK;
  } else {
    return Colors.DANGER;
  }
};
