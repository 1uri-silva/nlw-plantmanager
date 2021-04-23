import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug',
  nextScreen: string
}

const emojis = {
  hug: '🤗',
  smile: '😊'
}

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute()

  const {
    icon,
    title,
    subtitle,
    nextScreen,
    buttonTitle,
  } = routes.params as Params

  function handleSubmit() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.Container}>

      <View style={styles.Content}>
        <Text style={styles.Emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.Title}>
          {title}
        </Text>

        <Text style={styles.SubTitle}>
          {subtitle}
        </Text>

        <View style={styles.Footer}>
          <Button
            title={buttonTitle}
            onPress={handleSubmit}
          />
        </View>

      </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  Content: {
    flex: 1,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Emoji: {
    fontSize: 78
  },

  Title: {
    fontSize: 22,
    marginTop: 15,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  SubTitle: {
    fontSize: 17,
    paddingVertical: 10,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,
  },

  Footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})