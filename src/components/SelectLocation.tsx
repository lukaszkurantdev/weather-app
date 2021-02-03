import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useForm} from 'react-hook-form';
import {AxiosRequestConfig, Points, request} from '../services/ApiService';
import Button from './Button';
import Input from './Input';
import LocationHistoryElement from './LocationHistoryElement';
import {WeatherData} from '../models/WeatherData.model';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import useLocations from '../hooks/useLocations';
import {Translation as T} from '../services/TranslationService';

const MAX_WIDTH = Dimensions.get('screen').width;

interface IProps {
  onNavigateDetails: (data: WeatherData) => void;
}

interface FormData {
  location: string;
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SelectLocation: React.FC<IProps> = ({onNavigateDetails}) => {
  const {control, handleSubmit, errors, setError} = useForm<FormData>({
    mode: 'onBlur',
  });
  const [cities, addCity] = useLocations();
  const [fetching, setFetching] = useState(false);

  const onValidForm = useCallback(
    async (form: FormData) => {
      setFetching(true);

      const body: AxiosRequestConfig = {
        url: Points.weather,
        method: 'GET',
        params: {
          q: form.location,
          units: 'metric',
        },
      };

      try {
        const data = await request(body);

        onNavigateDetails(data.data);
        addCity(form.location);
        setFetching(false);
      } catch (error) {
        if (error.response?.data?.message) {
          setError('location', {
            type: 'validate',
            message: capitalize(error.response.data.message),
          });
        } else {
          setError('location', {
            type: 'validate',
            message: T.connectionError,
          });
        }
        setFetching(false);
      }
    },
    [addCity, onNavigateDetails, setError],
  );

  return (
    <Animatable.View useNativeDriver animation="fadeIn">
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={[styles.headerContainer]}>
            <Text style={[GlobalStyles.headerText, styles.header]}>
              {T.findLocation}
            </Text>

            <Input
              name="location"
              control={control}
              placeholder={T.location}
              error={errors.location}
            />
            <Button
              title={T.selectLocation}
              onPress={handleSubmit(onValidForm)}
              containerStyle={styles.button}
              loading={fetching}
            />

            <View style={styles.separator} />

            <Text style={GlobalStyles.standardText}>{T.useBefore}</Text>
          </View>
        }
        data={cities}
        renderItem={({item}) => (
          <LocationHistoryElement
            name={item}
            onPress={() => onValidForm({location: item})}
          />
        )}
        ListEmptyComponent={
          <Text style={[GlobalStyles.standardText, styles.emptyText]}>
            {T.emptyHistory}
          </Text>
        }
        keyExtractor={(item) => 'LocationItem_' + item}
      />
    </Animatable.View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    width: MAX_WIDTH,
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
  headerContainer: {
    width: MAX_WIDTH - 40,
    alignItems: 'center',
    paddingBottom: 20,
  },
  separator: {
    width: '20%',
    height: 1,
    backgroundColor: Colors.WHITE,
    marginVertical: 50,
  },
  header: {
    marginTop: 30,
    marginBottom: 50,
  },
  button: {
    marginTop: 40,
  },
  listContainer: {
    width: MAX_WIDTH,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  emptyText: {
    opacity: 0.6,
    alignSelf: 'center',
    paddingVertical: 50,
  },
});
