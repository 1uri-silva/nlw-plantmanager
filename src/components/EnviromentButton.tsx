import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
  title: string,
  active?: boolean
}

export function EnviromentButton({
  title,
  active = false,
  ...rest
}: EnviromentButtonProps) {

  return (
    <RectButton
      style={[
        styles.Btn,
        active && styles.BtnActive
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.Txt,
          active && styles.TxtActive
        ]}
      >
        {title}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  Btn: {
    width: 76,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.shape,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  BtnActive: {
    backgroundColor: colors.green_light
  },

  Txt: {
    color: colors.heading,
    fontFamily: fonts.text
  },

  TxtActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
})