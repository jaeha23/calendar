import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import 'moment/locale/ko';

import dataStorage from '../api/storage';

export default class DayScreen extends Component {
  state = {
    items: {},
    data: {},
    dotData: {},
  };

  componentDidMount() {
    this.getDate();
  }

  getDate = async () => {
    const result = await dataStorage.getToken();
    if (result) {
      const data = JSON.parse(result);
      const entries = Object.entries(data);
      entries.map(entry => {
        let body1 = {
          [entry[0]]: [entry[1]],
        };
        let body2 = {
          [entry[0]]: {
            dots: [entry[1]],
          },
        };
        this.setState({data: {...this.state.data, ...body1}});
        this.setState({dotData: {...this.state.dotData, ...body2}});
      });
    }
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        showClosingKnob={true}
        markingType="multi-dot"
        markedDates={this.state.dotData}
      />
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
        ...this.state.data,
      };
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: 50}, {color: item.color}]}
        onPress={() => Alert.alert(item.text)}>
        <Text>{item.text}</Text>
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
