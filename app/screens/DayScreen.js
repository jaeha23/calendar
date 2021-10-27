import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Agenda} from 'react-native-calendars';
import PushNotification from 'react-native-push-notification';
import 'moment/locale/ko';

import dataStorage from '../api/storage';
import Notifications from '../../Notifications';

export default class DayScreen extends Component {
  state = {
    items: {},
    data: {},
    dotData: {},
    toggleCheckBox: false,
    originalData: {},
    day: {},
    openCalendar: false,
  };

  componentDidMount() {
    this.getDate();
  }

  getDate = async () => {
    const result = await dataStorage.getToken();
    if (result) {
      const data = JSON.parse(result);
      this.setState({originalData: data});
      const entries = Object.entries(data);
      entries.map(entry => {
        let body1 = {
          [entry[0]]: [entry[1]],
        };
        let body2 = {
          [entry[0]]: {
            dots: entry[1],
          },
        };
        this.setState({data: {...this.state.data, ...body1}});
        this.setState({dotData: {...this.state.dotData, ...body2}});
      });
    }
  };

  render() {
    return (
      <>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          showClosingKnob={true}
          markingType="multi-dot"
          markedDates={this.state.dotData}
          onCalendarToggled={calendarOpened => {
            this.setState({openCalendar: calendarOpened});
          }}
        />
        {!this.state.openCalendar && (
          <TouchableOpacity
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: '#364fc7',
              paddingVertical: 10,
            }}
            onPress={() => {
              this.getDate();
              this.setState({items: {}});
              this.setState({dotData: {}});
              this.loadItems(this.state.day);
            }}>
            <Text style={styles.textStyle}>새로고침</Text>
          </TouchableOpacity>
        )}
      </>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      this.setState({day: day});
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const oldItems = {};
      Object.keys(this.state.items).forEach(key => {
        oldItems[key] = this.state.items[key];
      });
      const newItems = {
        ...oldItems,
        ...this.state.data,
      };
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    const format = date => {
      const splited = date.split('T')[1].split('.')[0];
      return splited;
    };

    const onPress = async v => {
      PushNotification.getScheduledLocalNotifications(rn => {
        rn.map(data => {
          if (v.text === data.message) {
            PushNotification.cancelLocalNotification(data.id);
          }
        });
      });

      const changedData = this.state.originalData;
      const keys = Object.keys(changedData);
      keys.map((key, i) => {
        const datas = changedData[key];
        const index = datas.indexOf(v);
        if (index >= 0) datas.splice(index, 1);
        if (datas.length === 0) return delete changedData[key];
      });
      await dataStorage.storeToken(changedData);
      this.getDate();
      this.setState({items: {}});
      this.setState({dotData: {}});
      this.loadItems(this.state.day);
    };

    const onValueChange = async v => {
      const changedData = this.state.originalData;
      const keys = Object.keys(changedData);
      keys.map((key, i) => {
        const datas = changedData[key];
        datas.map((data, i) => {
          if (data === v) return (data.done = !data.done);
        });
      });
      await dataStorage.storeToken(changedData);
      this.getDate();
      this.setState({items: {}});
      this.setState({dotData: {}});
      this.loadItems(this.state.day);
    };

    return (
      <>
        {item.map((v, i) => (
          <View key={i} style={[styles.item, {height: 70}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox
                disabled={false}
                value={v.done}
                onValueChange={() => onValueChange(v)}
              />
              <View style={{marginLeft: 20}}>
                <Text style={{fontSize: 16, color: 'grey'}}>
                  {format(v.time)}
                </Text>
                <Text style={{fontSize: 16, marginTop: 15, fontWeight: 'bold'}}>
                  {v.text}
                </Text>
              </View>
            </View>
            <Button title="삭제" onPress={() => onPress(v)} />
          </View>
        ))}
      </>
    );
  }

  renderEmptyDate() {
    return <View style={styles.emptyDate} />;
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyDate: {
    height: 25,
    marginTop: 40,
    marginRight: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
