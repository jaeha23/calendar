import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Screen from '../components/Screen';
import DayScreen from '../screens/DayScreen';
import MonthScreen from '../screens/MonthScreen';
import YearScreen from '../screens/YearScreen';

const TopTab = createMaterialTopTabNavigator();

const AppNavigator = () => {
  return (
    <Screen>
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#5E60CE',
          tabBarLabelStyle: {fontSize: 16, fontWeight: '600'},
          tabBarIndicatorStyle: {backgroundColor: '#48BFE3'},
          swipeEnabled: false,
        }}>
        <TopTab.Screen name="Day" component={DayScreen} />
        <TopTab.Screen name="Month" component={MonthScreen} />
        <TopTab.Screen name="Year" component={YearScreen} />
      </TopTab.Navigator>
    </Screen>
  );
};

export default AppNavigator;
