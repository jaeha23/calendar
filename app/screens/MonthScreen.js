import React, {Fragment} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';

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

const initialDate = date();

const MonthScreen = () => {
  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  const renderCalendarWithMultiDotMarking = () => {
    return (
      <Fragment>
        <Calendar
          style={styles.calendar}
          current={initialDate}
          // onDayPress={() => console.log('move')} Day로 가던가 다른 것이 나와야됨
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
      </Fragment>
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Fragment>{renderCalendarWithMultiDotMarking()}</Fragment>
    </ScrollView>
  );
};

export default MonthScreen;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
});
