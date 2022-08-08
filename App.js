import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Provider } from './Store';

import { HomePage} from './Components/HomePage';
import { BarcodeScannerPage } from './Components/BarcodeScannerPage';
import { StorageUnitPage } from './Components/StorageUnitPage';
import { NewStorageItemPage } from './Components/NewStorageItemPage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='HomePage' screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="BarcodeScannerPage" component={BarcodeScannerPage} />
          <Stack.Screen name="StorageUnitPage" component={StorageUnitPage} />
          <Stack.Screen name="NewStorageItemPage" component={NewStorageItemPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
