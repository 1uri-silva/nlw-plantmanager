import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import LoadView from 'lottie-react-native'

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import LoadAnimation from '../assets/load.json'

export function Load() {
  return (
    <View style={styles.container}>
      <LoadView
        source={LoadAnimation}
        autoPlay
        loop
        style={styles.load}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  load: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200
  }
})