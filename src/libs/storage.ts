import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notifications from 'expo-notifications'

export interface PlantsProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: number;
      repeat_every: string;
  },
  hour: string;
  dateTimeNotification: Date
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantsProps;
    notificationId: string;
  }
}

export async function savePlant(plant: PlantsProps): Promise<void> {
  
  try {
    const nextTime = new Date(plant.dateTimeNotification)

    const now = new Date()

    const { times, repeat_every } = plant.frequency
    if(repeat_every === 'week'){
      const interval = Math.trunc(7 / times)
      nextTime.setDate(now.getDate() + interval)
    } else {
      nextTime.setDate(nextTime.getDate() + 1)
    }

    const secunds = Math.abs(
      Math.ceil(now.getTime() - nextTime.getTime()) / 1000);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeeyy 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: secunds < 60 ? 60 : secunds,
        repeats: true
      }
    })

    const data = await AsyncStorage.getItem('@Plantmanager:plants')
    const oldPlants = data? (JSON.parse(data) as StoragePlantProps): {}

    const newPlant ={
      [plant.id]: {
        data: plant,
        notificationId
      }
    }
    await AsyncStorage.setItem('@Plantmanager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPlants
      })
    )

  } catch (error) {
    throw new Error(error)
  }
}

export async function loadPlants(): Promise<PlantsProps[]> {
  
  try {
    const data = await AsyncStorage.getItem('@Plantmanager:plants')
    const plants = data? (JSON.parse(data) as StoragePlantProps): {}

    const plantsShorted = Object
    .keys(plants)
    .map((plant) => {
      return {
        ...plants[plant].data,
        hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
      }
    })
    .sort((a, b) => 
      Math.floor(
        new Date(a.dateTimeNotification).getTime() / 1000 -
        Math.floor( new Date(b.dateTimeNotification).getTime() / 1000)
      )
    )
        return plantsShorted
  } catch (error) {
    throw new Error(error)
  }
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@Plantmanager:plants')

  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId)

  delete plants[id];

  await AsyncStorage.setItem(
    '@Plantmanager:plants',
    JSON.stringify(plants)
  )
}