import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
  const navigation = useNavigation()

  function handleStart() {
    navigation.navigate('UserIdentification')
  }
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Wrapper}>
        <Text style={styles.Title}>
          Gerencia{'\n'}
          suas plantas de{'\n'}
          forma fácil
        </Text>

        <Image
          source={wateringImg}
          style={styles.Img}
          resizeMode='contain'
        />

        <Text style={styles.SubTitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.Btn}
          onPress={handleStart}
        >
          <Feather
            name="chevron-right"
            style={styles.BtnIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  Wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  Title: {
    fontSize: 28,
    marginTop: 38,
    lineHeight: 34,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading
  },

  Img: {
    height: Dimensions.get('window').width * 0.7
  },

  SubTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text

  },

  BtnIcon: {
    fontSize: 32,
    color: colors.white,
  },

  Btn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  }

})