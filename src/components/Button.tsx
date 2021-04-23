import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonsProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest }: ButtonsProps) {
  return (
    <TouchableOpacity
      style={styles.Btn}
      {...rest}
    >
      <Text style={styles.Text}>
        {title}
      </Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Btn: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
  },

  Text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  }
})