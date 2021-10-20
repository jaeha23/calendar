import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';

import date from '../api/date';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월.',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월.',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월.',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월.',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'ko';

const RANGE = 6;

const initialDate = date();

const YearScreen = () => {
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
          dots: [
            {
              id: 1,
              height: 105,
              name: '밥 먹기',
              color: 'blue',
              done: false,
            },
            {
              id: 2,
              height: 105,
              name: '캘린더 만들기',
              color: 'red',
              done: false,
            },
            {
              id: 3,
              height: 105,
              name: '아이스 아메리카노 마시기',
              color: 'black',
              done: false,
            },
          ],
        },
        '2021-10-26': {
          dots: [
            {
              id: 1,
              height: 105,
              name: '밥 먹기',
              color: 'blue',
              done: false,
            },
            {
              id: 2,
              height: 105,
              name: '캘린더 만들기',
              color: 'red',
              done: false,
            },
          ],
        },
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
