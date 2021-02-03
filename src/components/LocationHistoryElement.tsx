import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  name: string;
  onPress: () => void;
}

const LocationHistoryElement: React.FC<IProps> = ({name, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <Icon name="history" color={Colors.PRIMARY} size={30} />
      <Text style={[GlobalStyles.standardText, styles.title]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default LocationHistoryElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255, 0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    marginLeft: 15,
  },
});
