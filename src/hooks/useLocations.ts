import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageCitiesKey = '@storage-cities';

export default (): [string[], (city: string) => void, () => void] => {
  const [cities, setCities] = useState<string[]>([]);

  const getCities = async () => {
    const data = await AsyncStorage.getItem(StorageCitiesKey);
    setCities(JSON.parse(data) || []);
  };

  const addCity = (city: string) => {
    if (!cities.includes(city)) {
      const storageItemCopy = [...cities, city];
      AsyncStorage.setItem(StorageCitiesKey, JSON.stringify(storageItemCopy));
      setCities(storageItemCopy);
    }
  };

  const clearCities = () => {
    AsyncStorage.removeItem(StorageCitiesKey);
    setCities(null);
  };

  useEffect(() => {
    getCities();
  }, []);

  return [cities, addCity, clearCities];
};
