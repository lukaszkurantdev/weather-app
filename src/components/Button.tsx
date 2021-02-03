import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  ViewStyle,
  Keyboard,
} from 'react-native';
import {debounce} from 'ts-debounce';
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';

interface IProps {
  title: string;
  loading?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  pressWithDebounce?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({
  title,
  loading,
  containerStyle,
  onPress,
  pressWithDebounce,
  disabled,
}) => {
  const press = pressWithDebounce ? debounce(onPress, 300) : onPress;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, disabled && styles.disabled, containerStyle]}
      disabled={disabled}
      onPress={(event) => {
        if (!disabled) {
          event && event.preventDefault();
          Keyboard.dismiss();
          press && press();
        }
      }}>
      {loading ? (
        <ActivityIndicator color={Colors.BLACK} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
  },
  outlineContainer: {
    borderWidth: 1,
  },
  textNearIcon: {
    marginLeft: 5,
  },
  buttonText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 15,
    color: Colors.BLACK,
  },
  disabled: {
    opacity: 0.4,
  },
});
