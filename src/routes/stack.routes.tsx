import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';
import { UserIdentification } from '../pages/UserIdentification';
import { Welcome } from '../pages/Welcome';
import colors from '../styles/colors';
import AuthRoutes from './tabs.routes';


const stack = createStackNavigator()

export const AppRoutes: React.FC = () => (
  <stack.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}>
    <stack.Screen
      name='Welcome'
      component={Welcome}
    />

    <stack.Screen
      name='UserIdentification'
      component={UserIdentification}
    />

    <stack.Screen
      name='Confirmation'
      component={Confirmation}
    />
    <stack.Screen
      name='Plant'
      component={AuthRoutes}
    />

    <stack.Screen
      name='PlantSave'
      component={PlantSave}
    />

    <stack.Screen
      name='MyPlants'
      component={AuthRoutes}
    />
  </stack.Navigator>
)