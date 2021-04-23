import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserImg from '../assets/iuri.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [user, setUser] = useState<string>()

  useEffect(() => {
    async function loadStorageUser() {
      const name = await AsyncStorage.getItem("@Plant:USER");
      setUser(name || '');

    }

    loadStorageUser()
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.userName}>{user}</Text>
      </View>

      <Image
        source={UserImg}
        style={styles.Img}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight(),
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },

  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40
  },

  Img: {
    width: 70,
    height: 70,
    borderRadius: 40,
  }
})