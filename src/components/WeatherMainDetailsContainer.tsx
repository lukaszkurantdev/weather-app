import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import GlobalStyles from '../styles/GlobalStyles';
import {WeatherData, WeatherDetailedData} from '../models/WeatherData.model';
import {DateTime} from 'luxon';
import {getTempColor, numberToCelsiusString} from '../utils/MetricSystem';
import {Translation as T} from '../services/TranslationService';

interface IProps {
  data: WeatherData;
  detailedData: WeatherDetailedData;
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const WeatherMainDetailsContainer: React.FC<IProps> = ({
  data,
  detailedData,
}) => {
  const date = DateTime.local()
    .setLocale('en')
    .toLocaleString(DateTime.DATE_HUGE);

  return (
    <Animatable.View
      style={GlobalStyles.informalContainer}
      animation="fadeInUp"
      duration={1200}
      delay={800}
      useNativeDriver>
      <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
        {date}
      </Text>

      <View style={styles.rowContainer}>
        <Text
          style={[
            GlobalStyles.hugeText,
            GlobalStyles.darkText,
            {color: getTempColor(data.main.temp)},
          ]}>
          {numberToCelsiusString(data.main.temp)}
        </Text>
        <View style={styles.insideMargin}>
          <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
            {capitalize(data.weather[0].description)}
          </Text>

          <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
            {numberToCelsiusString(detailedData.temp.day)} /{' '}
            {numberToCelsiusString(detailedData.temp.night)}
          </Text>

          <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
            {T.feelingLike}: {numberToCelsiusString(data.main.feels_like)}
          </Text>

          <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
            {T.wind}: {data.wind.speed} km/h
          </Text>
        </View>
      </View>
    </Animatable.View>
  );
};

export default WeatherMainDetailsContainer;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  insideMargin: {
    alignItems: 'flex-end',
  },
});
