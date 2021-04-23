import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();


  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }


  async function handleSubmit() {
    if (!name)
      return Alert.alert('Me diz como chamar você 😢');


    try {

      await AsyncStorage.setItem("@Plant:USER", name);

      navigation.navigate('Confirmation', {
        icon: 'smile',
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas platinhas com muito carinho!',
        nextScreen: 'Plant',
        buttonTitle: 'Começar',
      });
    } catch {
      Alert.alert('Algo deu errado ao salvar seu nome 😢');
    }

  }

  return (
    <SafeAreaView style={styles.Container}>
      <KeyboardAvoidingView
        style={styles.Container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.Content}>

            <View style={styles.Form}>
              <View style={styles.Header}>

                <Text style={styles.Emoji}>
                  {isFilled ? '😃' : '😄'}
                </Text>

                <Text style={styles.Title}>
                  Como podemos {'\n'}
                chamar você?
              </Text>
              </View>

              <TextInput
                style={[
                  styles.Inp,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder='Digite o nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.Footer}>
                <Button
                  title='Confirmar'
                  onPress={handleSubmit}
                />
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  Content: {
    flex: 1,
    width: '100%'
  },

  Form: {
    flex: 1,
    paddingHorizontal: 54,
    justifyContent: 'center',
    alignItems: 'center'
  },

  Header: {
    alignItems: 'center'
  },

  Footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  },

  Title: {
    fontSize: 24,
    lineHeight: 32,
    marginTop: 20,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading
  },

  Emoji: {
    fontSize: 44
  },

  Inp: {
    borderBottomWidth: 1,
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    width: '100%',
    textAlign: 'center',
    borderColor: colors.gray,
  }
})