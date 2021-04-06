import React, { useContext } from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import AddRecordScreen from '../screens/AddRecord';

import { CarContext } from '../context/CarContext';
import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  const { loadingSave } = useContext(CarContext) as ContextType;

  return (
    <Stack.Navigator initialRouteName="Garage">
      <Stack.Screen
        name="Garage"
        component={HomeScreen}
        options={{
          header: (_) => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="New record"
        component={AddRecordScreen}
        options={{
          headerStyle: { backgroundColor: '#efefef' },
          headerLeft: loadingSave
            ? () => null
            : (props) => <HeaderBackButton {...props} />,
          gestureEnabled: loadingSave ? false : true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
