import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//@ts-ignore
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DailyWeatherContainer from '../components/DailyWeatherContainer';
import DayNightDetails from '../components/DayNightTimeDetails';
import HourlyWeatherContainer from '../components/HourlyWeatherContainer';
import Loader from '../components/Loader';
import WeatherIcon from '../components/WeatherIcon';
import WeatherMainDetailsContainer from '../components/WeatherMainDetailsContainer';
import {
  WeatherDetailedDataSet,
  WeatherIcons,
} from '../models/WeatherData.model';
import {RootStackParamList} from '../navigators/MainNavigator';
import {AxiosRequestConfig, Points, request} from '../services/ApiService';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'WeatherDetailsScreen'>;
  route: RouteProp<RootStackParamList, 'WeatherDetailsScreen'>;
}

const WeatherDetailsScreen: React.FC<IProps> = ({route, navigation}) => {
  const {data} = route.params;

  const [detailedData, setDetailedData] = useState<WeatherDetailedDataSet>(
    null,
  );
  const [fetching, setFetching] = useState<boolean>(true);

  const getDetailedData = useCallback(async () => {
    setFetching(true);
    const body: AxiosRequestConfig = {
      url: Points.onecall,
      method: 'GET',
      params: {
        lat: data.coord.lat,
        lon: data.coord.lon,
        units: 'metric',
        exclude: 'minutely,alerts',
      },
    };

    try {
      const response = await request(body);
      setDetailedData(response.data);
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  }, [data]);

  useEffect(() => {
    getDetailedData();
  }, [getDetailedData, data]);

  return (
    <>
      <ReactNativeParallaxHeader
        headerMinHeight={100}
        headerMaxHeight={250}
        extraScrollHeight={20}
        navbarColor={Colors.PRIMARY}
        titleStyle={styles.titleStyle}
        title={
          <View style={styles.headerContainer}>
            <Animatable.View
              useNativeDriver
              animation="pulse"
              iterationCount="infinite">
              <WeatherIcon
                name={WeatherIcons[data.weather[0]?.icon]}
                size={110}
                color={Colors.WHITE}
              />
            </Animatable.View>

            <Text style={GlobalStyles.titleText} numberOfLines={1}>
              {data.name}
            </Text>
          </View>
        }
        backgroundImage={require('../assets/images/header_background.jpg')}
        backgroundImageScale={1.2}
        renderNavBar={() => (
          <View style={styles.navContainer}>
            <View style={styles.navBar}>
              <TouchableOpacity onPress={navigation.goBack}>
                <Icon name="location-city" color={Colors.WHITE} size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={getDetailedData}>
                <Icon name="refresh" color={Colors.WHITE} size={30} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderContent={() => (
          <View style={styles.contentContainer}>
            {!fetching && detailedData ? (
              <>
                <WeatherMainDetailsContainer
                  data={data}
                  detailedData={detailedData.daily[0]}
                />
                <DayNightDetails data={data} />
                <HourlyWeatherContainer data={detailedData.hourly} />
                <DailyWeatherContainer data={detailedData.daily} />
              </>
            ) : (
              <Loader />
            )}
          </View>
        )}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        alwaysShowTitle={false}
      />
      <StatusBar translucent backgroundColor="transparent" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentContainer: {
    paddingVertical: 10,
  },
  navContainer: {
    height: 200,
    marginHorizontal: 10,
  },
  statusBar: {
    height: 20,
    backgroundColor: 'transparent',
  },
  navBar: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 30,
  },
});

export default WeatherDetailsScreen;
