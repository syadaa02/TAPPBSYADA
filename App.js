import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import CategoryNews from './pages/CategoryNews';
import TipsAndTrick from './pages/TipsAndTrick';
import WeatherPage from './pages/WeatherPage';
import AboutUs from './pages/AboutUs';
import Detail from './pages/Detail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // Bottom Tab Navigator
  const BottomTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#3A8FB7',
          },
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: '#ff9800',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherPage} 
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="cloud-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CategoryNews"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={24} color={color} />
            ),
          }}
        >
          {props => (
            <Tab.Navigator>
              <Tab.Screen
                name="Business"
                component={CategoryNews}
                initialParams={{ category: 'business' }}
                options={{
                  tabBarLabel: 'Business',
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="business-outline" size={24} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Sports"
                component={CategoryNews}
                initialParams={{ category: 'sports' }}
                options={{
                  tabBarLabel: 'Sports',
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="football-outline" size={24} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Technology"
                component={CategoryNews}
                initialParams={{ category: 'technology' }}
                options={{
                  tabBarLabel: 'Technology',
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="laptop-outline" size={24} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="TipsAndTrick"
          component={TipsAndTrick}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="bulb-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="BottomTabs" component={BottomTabs} />
  <Stack.Screen name="Detail" component={Detail} />
  <Stack.Screen name="AboutUs" component={AboutUs} />
</Stack.Navigator>
    </NavigationContainer>
  );
}