import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert
} from 'react-native';

import waterdrop from '../assets/waterdrop.png'

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { loadPlants, PlantsProps, removePlant } from '../libs/storage';
import { Header } from '../components/Header';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import { ScrollView } from 'react-native-gesture-handler';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantsProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWaterd, setNextWaterd] = useState<string>()

  function handleRemove(plant: PlantsProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            )
          } catch (error) {
            Alert.alert('Não foi possível remover!')
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantStorage = await loadPlants()

      const nexTime = formatDistance(
        new Date(plantStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )
      setNextWaterd(
        `Não esqueça de regar a ${plantStorage[0].name} á ${nexTime}.`
      )
      setMyPlants(plantStorage)
      setLoading(false)
    }
    loadStorageData()
  }, [])

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotLight}>
        <Image
          source={waterdrop}
          style={styles.spotLightImg}
        />

        <Text style={styles.spotLightTxt}>
          {nextWaterd}
        </Text>
      </View>

      <View style={styles.plant}>
        <Text style={styles.plantTitle}>
          Próximas regadas
        </Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => { handleRemove(item) }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotLight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  spotLightImg: {
    width: 68,
    height: 68
  },

  spotLightTxt: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },

  plant: {
    flex: 1,
    width: '100%'
  },

  plantTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }

})