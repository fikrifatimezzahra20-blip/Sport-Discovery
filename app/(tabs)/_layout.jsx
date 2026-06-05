import { Tabs } from 'expo-router';
import { Home, Heart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#A855F7', 
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 10, backgroundColor: '#FFFFFF', borderTopWidth: 0 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Home color={color} size={24} /> }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites', tabBarIcon: ({ color }) => <Heart color={color} size={24} /> }} />
    </Tabs>
  );
}