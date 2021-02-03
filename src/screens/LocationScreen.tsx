import React, {useState, useCallback} from 'react';
import {View, StatusBar, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigators/MainNavigator';
import Button from '../components/Button';
import Loader from '../components/Loader';
import AppLogo from '../components/AppLogo';
import SelectLocation from '../components/SelectLocation';
import {WeatherData} from '../models/WeatherData.model';
import {Translation as T} from '../services/TranslationService';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'LocationScreen'>;
  route: RouteProp<RootStackParamList, 'LocationScreen'>;
}

const LocationScreen: React.FC<IProps> = ({navigation}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selectLocation, setSelectLocation] = useState(false);

  const navigateToDetails = useCallback(
    (data: WeatherData) => {
      navigation.navigate('WeatherDetailsScreen', {data});
    },
    [navigation],
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Video
        source={require('../assets/videos/snow.mp4')}
        style={styles.backgroundVideo}
        repeat
        paused={false}
        resizeMode="cover"
        onLoad={() => setVideoLoaded(true)}
        rate={0.7}
      />

      <View style={[styles.container, videoLoaded && styles.containerFetched]}>
        {!videoLoaded ? (
          <Loader isAbsolute />
        ) : !selectLocation ? (
          <>
            <View style={[styles.partContainer]}>
              <AppLogo />

              <Text style={[GlobalStyles.titleText, styles.title]}>
                {T.appName}
              </Text>
            </View>

            <Animatable.View
              style={[styles.partContainer, styles.bottomPart]}
              animation="fadeInUp"
              useNativeDriver
              delay={1500}
              duration={700}>
              <Button
                title={T.findLocation}
                onPress={() => setSelectLocation(true)}
              />

              <Text style={[GlobalStyles.standardText, styles.title]}>
                {T.footer}
              </Text>
            </Animatable.View>
          </>
        ) : (
          <SelectLocation onNavigateDetails={navigateToDetails} />
        )}
      </View>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  backgroundVideo: {
    flex: 1,
  },
  containerFetched: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomPart: {
    flex: 0.4,
  },
  title: {
    marginTop: 30,
  },
});
