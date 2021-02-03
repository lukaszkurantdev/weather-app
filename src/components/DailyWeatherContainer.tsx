import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {DateTime} from 'luxon';
import WeatherIcon from '../components/WeatherIcon';
import {numberToCelsiusString} from '../utils/MetricSystem';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import {WeatherDetailedData, WeatherIcons} from '../models/WeatherData.model';

interface IProps {
  data: WeatherDetailedData[];
}

const DayDetailItem = ({item}: {item: WeatherDetailedData}) => (
  <View style={styles.dayItem}>
    <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
      {DateTime.fromMillis(item.dt * 1000)
        .setLocale('en')
        .toFormat('DD')}
    </Text>

    <WeatherIcon
      name={WeatherIcons[item.weather[0].icon]}
      size={40}
      color={Colors.BLACK}
    />

    <Text
      style={[GlobalStyles.standardText, GlobalStyles.darkText, styles.temp]}>
      {numberToCelsiusString(item.temp.day)}/
      {numberToCelsiusString(item.temp.night)}
    </Text>
  </View>
);

const DailyWeatherContainer: React.FC<IProps> = ({data}) => {
  return (
    <Animatable.View
      style={GlobalStyles.informalContainer}
      animation="fadeInUp"
      duration={1200}
      delay={2000}
      useNativeDriver>
      <FlatList
        scrollEnabled={false}
        data={data.slice(0, 12)}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({item}) => <DayDetailItem item={item} />}
      />
    </Animatable.View>
  );
};

export default DailyWeatherContainer;

const styles = StyleSheet.create({
  dayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temp: {
    width: 70,
    textAlign: 'right',
  },
});
