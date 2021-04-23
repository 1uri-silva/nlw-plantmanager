import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core';
import DataTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns';

import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlantsProps, savePlant } from '../libs/storage';

interface Params {
  plant: PlantsProps
}

export function PlantSave() {
  const [selectedTime, setSelectedTime] = useState(new Date())
  const [showDatePicker, setShowDatePiker] = useState(Platform.OS == 'ios')

  const route = useRoute()
  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePiker(oldState => !oldState)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedTime(new Date())
      return Alert.alert('Escolha uma hora no futuro! 🕰')
    }

    if (dateTime)
      setSelectedTime(dateTime)
  }

  function handleOpenDataPikerAndroid() {
    setShowDatePiker(oldState => !oldState)
  }

  const navigation = useNavigation();
  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedTime
      });

      navigation.navigate('Confirmation', {
        icon: 'hug',
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
        nextScreen: 'MyPlants',
        buttonTitle: 'Muito obrigado',
      });
    } catch {
      Alert.alert('Nao foi possível salvar 😢')

    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150}
          />

          <Text style={styles.plant}>
            {plant.name}
          </Text>

          <Text style={styles.about}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image
              source={waterdrop}
              style={styles.tipImage}
            />

            <Text style={styles.tipTxt}>
              {plant.water_tips}
            </Text>

          </View>

          <Text style={styles.alert}>
            Escolha o melhor hoŕario para ser lembrado
      </Text>


          {
            showDatePicker && (
              <DataTimePicker
                value={selectedTime}
                mode='time'
                display='spinner'
                onChange={handleChangeTime}
              />
            )}{
            Platform.OS === 'android' && (
              <TouchableOpacity
                onPress={handleOpenDataPikerAndroid}
                style={styles.dataTimeButton}
              >
                <Text style={styles.dataTime}>
                  {`Mudar ${format(selectedTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button
            title='Cadastar planta'
            onPress={handleSave}
          />

        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },

  plant: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },

  about: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },

  tipImage: {
    width: 56,
    height: 56
  },

  tipTxt: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },

  alert: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },

  dataTimeButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
  },

  dataTime: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }

})