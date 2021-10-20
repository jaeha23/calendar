import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// @ts-expect-error
import {Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import date from '../api/date';

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

export default class DayScreen extends Component {
  state = {
    items: {},
  };

  render() {
    return (
      <>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={initialDate}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          hideKnob={true}
          monthFormat={'yyyy MMM'}
        />
      </>
    );
  }

  loadItems(day) {
    setTimeout(() => {
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
        ...{
          '2021-10-20': [],
          '2021-10-21': [
            {id: 1, height: 105, name: 'Item for 2021-10-21 #0'},
            {id: 2, height: 76, name: 'Item for 2021-10-21 #1', add: true},
          ],
          '2021-10-22': [],
          '2021-10-23': [
            {id: 1, height: 80, name: 'item 2 - any js object', add: true},
          ],
          '2021-10-24': [],
          '2021-10-25': [
            {id: 1, name: 'item 3 - any js object'},
            {id: 2, name: 'any js object', add: true},
          ],
        },
      };
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
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
  },
  emptyDate: {
    height: 25,
    marginTop: 40,
    marginRight: 20,
  },
});
