import React, {useEffect} from 'react';

import MainStackNavigator from './src/navigators/MainNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <MainStackNavigator />
    </>
  );
};

export default App;
