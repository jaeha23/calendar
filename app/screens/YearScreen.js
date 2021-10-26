import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import 'moment/locale/ko';

import dataStorage from '../api/storage';

const RANGE = 6;

const YearScreen = () => {
  const [dotData, setDotData] = useState({});

  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    const result = await dataStorage.getToken();
    if (result) {
      const data = JSON.parse(result);
      const entries = Object.entries(data);
      entries.map(entry => {
        let body = {
          [entry[0]]: {
            dots: entry[1],
          },
        };
        setDotData(data => ({...data, ...body}));
      });
    }
  };
  return (
    <>
      <CalendarList
        pastScrollRange={RANGE}
        futureScrollRange={RANGE}
        renderHeader={renderCustomHeader}
        theme={theme}
        markingType="multi-dot"
        markedDates={dotData}
      />
      <TouchableOpacity
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#364fc7',
          paddingVertical: 10,
        }}
        onPress={() => {
          setDotData({});
          getDate();
        }}>
        <Text style={styles.textStyle}>새로고침</Text>
      </TouchableOpacity>
    </>
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
