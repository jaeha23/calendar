import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const myDate = new Date();
const today = new Date(
  myDate.getFullYear(),
  myDate.getMonth(),
  myDate.getDate(),
  myDate.getHours() + 9,
  myDate.getMinutes(),
  myDate.getSeconds(),
);

const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};

const MonthScreen = () => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [realDate, setRealDate] = useState(today);
  const [text, onChangeText] = useState('');
  const [mode, setMode] = useState('date');
  const [selected, setSelected] = useState(initialDate);
  const [modalVisible, setModalVisible] = useState(false);

  const markedDates = {
    [selected]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#5E60CE',
      selectedTextColor: 'white',
    },
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setModalVisible(Platform.OS === 'ios');
    setDate(currentDate);

    const selectedRealDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedDate.getHours() + 9,
      selectedDate.getMinutes(),
      selectedDate.getSeconds(),
    );

    console.log(selectedRealDate);
    const year = selectedRealDate.getFullYear();
    const month = ('0' + (selectedRealDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedRealDate.getDate()).slice(-2);

    const dateString = year + '-' + month + '-' + day;

    setSelected(dateString);
  };

  const showMode = currentMode => {
    setModalVisible(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const renderCalendarWithMultiDotMarking = () => {
    return (
      <Fragment>
        <Calendar
          style={styles.calendar}
          current={initialDate}
          theme={theme}
          markingType="multi-dot"
          markedDates={{
            ...markedDates,
            '2021-10-25': {
              dots: [vacation, massage, workout],
            },
            '2021-10-26': {dots: [massage, workout]},
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
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Fragment>{renderCalendarWithMultiDotMarking()}</Fragment>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Pressable
            onPress={showDatepicker}
            style={{
              backgroundColor: '#ced4da',
              paddingVertical: 10,
              width: 100,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              날짜
            </Text>
          </Pressable>
          <Pressable
            onPress={showTimepicker}
            style={{
              backgroundColor: '#ced4da',
              paddingVertical: 10,
              width: 100,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              시간
            </Text>
          </Pressable>
          <Pressable
            onPress={showTimepicker}
            style={{
              backgroundColor: '#ff6b6b',
              paddingVertical: 10,
              width: 100,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              저장
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width: '100%'}}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="spinner"
                locale="ko-KR"
                onChange={onChange}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOk]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>확인</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MonthScreen;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  emptyDate: {
    marginTop: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    width: '40%',
    paddingVertical: 10,
  },
  buttonCancel: {
    backgroundColor: 'grey',
  },
  buttonOk: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
