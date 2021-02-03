import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {WeatherData} from '../models/WeatherData.model';
import {DateTime} from 'luxon';
import WeatherIcon from '../components/WeatherIcon';
import {Translation as T} from '../services/TranslationService';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface IProps {
  data: WeatherData;
}

const DayNightDetails: React.FC<IProps> = ({data}) => {
  const sunrise = DateTime.fromMillis(data.sys.sunrise * 1000).toFormat(
    'HH:mm',
  );
  const sunset = DateTime.fromMillis(data.sys.sunset * 1000).toFormat('HH:mm');

  return (
    <Animatable.View
      style={[GlobalStyles.informalContainer, styles.container]}
      animation="fadeInUp"
      duration={1200}
      delay={1200}
      useNativeDriver>
      <View style={styles.itemContainer}>
        <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
          {T.sunrise}
        </Text>

        <WeatherIcon name="wi-day-sunny" size={70} color={Colors.BLACK} />

        <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
          {sunrise}
        </Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
          {T.sunset}
        </Text>

        <WeatherIcon name="wi-night-clear" size={70} color={Colors.BLACK} />

        <Text style={[GlobalStyles.standardText, GlobalStyles.darkText]}>
          {sunset}
        </Text>
      </View>
    </Animatable.View>
  );
};

export default DayNightDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemContainer: {
    alignItems: 'center',
  },
});
