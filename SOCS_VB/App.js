import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';


const SOCSLOGO = require('./assets/images/logo.png');
export default function App() {
  return (
    <View style={styles.container}>
      <Image source={SOCSLOGO} />
      <Text>Match Results Will Go Here</Text>
      <Text>Stats grid here</Text>
      <Text>Graphs for players or team here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },


});
