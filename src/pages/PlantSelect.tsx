import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { EnviromentButton } from '../components/EnviromentButton';

import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import api from '../server/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import { PlantsProps } from '../libs/storage';

interface EnviromentProps {
  key: string;
  title: string
}


export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([])
  const [plants, setPlants] = useState<PlantsProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([])
  const [selected, setSelected] = useState('all')
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [LoadedMore, setLoadedMore] = useState(false)

  function handleSelected(enviroment: string) {
    setSelected(enviroment)

    if (enviroment == 'all') {
      return setFilteredPlants(plants)
    }

    const filtered = plants.filter(plant =>
      plant.environments.includes(enviroment)
    )

    setFilteredPlants(filtered)
  }
  async function fetchPlants() {
    const { data } = await api
      .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

    if (!data)
      return setLoading(true)

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }

    setLoading(false)
    setLoadedMore(false)
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return;

    setLoadedMore(true);
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }

  const navigation = useNavigation()
  function handlePlantSelect(plant: PlantsProps) {
    navigation.navigate('PlantSave', { plant })
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api
        .get('plants_environments?_sort=title&_order=asc')
      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ])
    }
    fetchEnviroment()
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.Header}>

        <Header />

        <Text style={styles.Title}>Em qual ambiente</Text>
        <Text style={styles.SubTitle}>Você quer color sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (

            <EnviromentButton
              title={item.title}
              active={item.key === selected}
              onPress={() => handleSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.EnviromentList}
        />
      </View>

      <View style={styles.Plant}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            LoadedMore
              ? <ActivityIndicator color={colors.green} />
              : <></>
          }
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  Header: {
    paddingHorizontal: 30
  },

  Title: {
    fontSize: 17,
    marginTop: 15,
    lineHeight: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  SubTitle: {
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  EnviromentList: {
    height: 40,
    marginLeft: 32,
    paddingBottom: 5,
    marginVertical: 32,
    justifyContent: 'center',
  },

  Plant: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
})