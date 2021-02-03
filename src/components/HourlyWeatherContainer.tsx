import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {FlatList} from 'react-native-gesture-handler';
import {WeatherDetailedData, WeatherIcons} from '../models/WeatherData.model';
import {DateTime} from 'luxon';
import WeatherIcon from '../components/WeatherIcon';
import {getTempColor, numberToCelsiusString} from '../utils/MetricSystem';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  data: WeatherDetailedData[];
}

const HourDetailItem = ({item}: {item: WeatherDetailedData}) => (
  <View style={styles.hourItem}>
    <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
      {DateTime.fromMillis(item.dt * 1000).toFormat('HH:mm')}
    </Text>

    <WeatherIcon
      name={WeatherIcons[item.weather[0].icon]}
      size={40}
      color={Colors.BLACK}
    />

    <Text
      style={[
        GlobalStyles.standardText,
        GlobalStyles.darkText,
        {color: getTempColor((item.temp as unknown) as number)},
      ]}>
      {numberToCelsiusString((item.temp as unknown) as number)}
    </Text>
  </View>
);

const HourlyWeatherContainer: React.FC<IProps> = ({data}) => {
  return (
    <Animatable.View
      style={GlobalStyles.informalContainer}
      animation="fadeInUp"
      duration={1200}
      delay={1800}
      useNativeDriver>
      <FlatList
        horizontal
        data={data.slice(0, 12)}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({item}) => <HourDetailItem item={item} />}
      />
    </Animatable.View>
  );
};

export default HourlyWeatherContainer;

const styles = StyleSheet.create({
  hourItem: {
    paddingRight: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
