import React, {useEffect, useState} from 'react';
import {StyleSheet, Animated} from 'react-native';
import Icon from './WeatherIcon';
import Colors from '../styles/Colors';

import LinearGradient from 'react-native-linear-gradient';

const AppLogo: React.FC = () => {
  const [value] = useState(new Animated.Value(0));

  const rotate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={['#E8CBC0', '#636FA4']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <Animated.View style={{transform: [{scale}, {rotate}]}}>
        <Icon name="wi-day-sunny" color={Colors.WHITE} size={140} />
      </Animated.View>
    </LinearGradient>
  );
};

export default AppLogo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
