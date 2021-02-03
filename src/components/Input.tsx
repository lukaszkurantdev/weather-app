import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Controller, FieldError} from 'react-hook-form';
import {Translation as T} from '../services/TranslationService';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import Fonts from '../styles/Fonts';

export enum InputType {
  LOCATION = 'location',
}

interface IProps {
  name: string;
  error?: FieldError;
  defaultValue?: string;
  placeholder?: string;
  containerStyle?: Object;
  type?: InputType;
  multiline?: boolean;
  inputProps?: TextInputProps;
  control?: any;
  customMessage?: string;
  borderStyle?: ViewStyle;
  inputStyle?: TextStyle;
  placeholderTextColor?: string;
}

export const InputValidations: {
  [key in InputType]: {message: string; func: (value: string) => boolean};
} = {
  location: {
    message: T.invalidLocationName,
    func: (value: string) => /^[a-zA-Z]+$/.test(value),
  },
};

const Input: React.FC<IProps> = ({
  name,
  defaultValue,
  containerStyle,
  type = InputType.LOCATION,
  multiline,
  placeholder,
  inputProps,
  control,
  error,
  borderStyle,
  inputStyle,
  placeholderTextColor,
}) => {
  const validation = InputValidations[type];

  const validate = (value: string) => {
    const v = validation.func(value);
    return v || validation.message;
  };

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <View
            style={[
              styles.borderedContainer,
              borderStyle,
              error && styles.errorContainer,
            ]}>
            <TextInput
              style={[
                styles.container,
                inputStyle,
                multiline && styles.multiline,
              ]}
              value={value}
              onChangeText={onChange}
              selectionColor={Colors.PRIMARY}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor || Colors.WHITE}
              {...inputProps}
            />
          </View>
        )}
        name={name}
        rules={{validate}}
        defaultValue={defaultValue || ''}
      />

      {error && (
        <Text style={[GlobalStyles.errorText, styles.errorText]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  borderedContainer: {
    flexDirection: 'row',
    borderColor: Colors.WHITE,
    backgroundColor: 'rgba(255,255,255,0.21)',
    borderBottomWidth: 1,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  container: {
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
    flex: 1,
    marginRight: 10,
    padding: 0,
  },
  multiline: {
    height: 100,
  },
  errorContainer: {
    borderColor: Colors.DANGER,
  },
  errorText: {
    marginVertical: 3,
  },
});
