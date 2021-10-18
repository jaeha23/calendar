import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

function Screen({ children }) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
      <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
});

export default Screen;
