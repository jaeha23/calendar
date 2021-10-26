import React, {Fragment, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'moment/locale/ko';
import moment from 'moment';

import dataStorage from '../api/storage';
import Notifications from '../../Notifications';

const MonthScreen = () => {
  const [date, setDate] = useState(moment().format());
  const [realDate, setRealDate] = useState(moment().format());
  const [text, setText] = useState('');
  const [mode, setMode] = useState('date');
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState({});
  const [dotData, setDotData] = useState({});

  // useEffect(() => {
  //   cleanToken();
  // }, []);

  // const cleanToken = async () => {
  //   await dataStorage.removeToken();
  // };

  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    const result = await dataStorage.getToken();
    if (result) {
      const data = JSON.parse(result);
      setData(data);
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
    setRealDate(selectedRealDate);
  };

  const onSave = async () => {
    const newDate = realDate.toISOString().split('T')[0];
    let body = {
      [newDate]: [
        {
          text: text,
          color: 'black',
          done: false,
          time: realDate,
        },
      ],
    };
    if (data && data[newDate]) {
      await dataStorage.storeToken({
        ...data,
        [newDate]: [...data[newDate], ...body[newDate]],
      });
    } else {
      await dataStorage.storeToken({...data, ...body});
    }
    setData({});
    setText('');
    setDate(moment().format());
    setRealDate(moment().format());
    getDate();
    // Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
    Alert.alert('저장되었습니다');
  };

  const showMode = currentMode => {
    setModalVisible(true);
    setMode(currentMode);
  };

  const CalendarBox = () => {
    return (
      <Fragment>
        <Calendar
          style={styles.calendar}
          theme={theme}
          markingType="multi-dot"
          markedDates={dotData}
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
      <ScrollView>
        <CalendarBox />
        <TextInput
          style={styles.input}
          onChangeText={e => setText(e)}
          value={text}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Pressable
            onPress={() => showMode('date')}
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
            onPress={() => showMode('time')}
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
            onPress={onSave}
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
      <TouchableOpacity
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#364fc7',
          paddingVertical: 15,
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
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
