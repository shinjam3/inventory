import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from './Store';

import { HomePage} from './Components/HomePage';
import { StorageUnitPage } from './Components/StorageUnitPage';
import { ItemPage } from './Components/ItemPage';

const Stack = createNativeStackNavigator();

const App = () => {  
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='HomePage' screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="StorageUnitPage" component={StorageUnitPage} />
          <Stack.Screen name="ItemPage" component={ItemPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
