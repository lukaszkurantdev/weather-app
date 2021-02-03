import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Colors from '../styles/Colors';

interface IProps {
  isAbsolute?: boolean;
  backgroundColor?: string;
}

const Loader: React.FC<IProps> = ({isAbsolute, backgroundColor}) => (
  <View
    style={[
      styles.container,
      isAbsolute && styles.absoluteContainer,
      {backgroundColor},
    ]}>
    <ActivityIndicator size="small" color={Colors.PRIMARY} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
