import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';

import date from '../api/date';

const RANGE = 6;

const initialDate = date;

const YearScreen = () => {
  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  return (
    <CalendarList
      current={initialDate}
      pastScrollRange={RANGE}
      futureScrollRange={RANGE}
      renderHeader={renderCustomHeader}
      theme={theme}
      markingType="multi-dot"
      markedDates={{
        '2021-10-25': {
          dots: [vacation, massage, workout],
          selected: true,
          selectedColor: 'red',
        },
        '2021-10-26': {dots: [massage, workout], disabled: true},
      }}
    />
  );
};

const theme = {
  'stylesheet.calendar.header': {
    dayHeader: {
      fontWeight: '600',
      color: '#48BFE3',
    },
  },
  'stylesheet.day.basic': {
    today: {
      borderColor: '#5E60CE',
      borderWidth: 0.8,
    },
    todayText: {
      color: '#5E60CE',
      fontWeight: '800',
    },
  },
};

function renderCustomHeader(date) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#5E60CE',
  };

  return (
    <View style={styles.header}>
      <Text style={textStyle}>{month}</Text>
      <Text style={textStyle}>{year}</Text>
    </View>
  );
}

export default YearScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
});
