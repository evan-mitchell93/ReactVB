import { useEffect,useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as VBDB from './vbdb';

//create initial db table and insert two rowss
VBDB.createTables();

//Seven Oaks Crest logo
const SOCSLOGO = require('./assets/images/logo.png');

export default function App() {
  //state for current selected result
  const [result, setResults] = useState({id:0,opponent:'Test',setsWon:0,setsLost:0});
  useDrizzleStudio(VBDB.db);

  //button testing 
  const testQuery = () => {
    testValues = VBDB.queryFirstResult();
    setResults({id:testValues.id,opponent:testValues.opponent,setsWon:testValues.setsWon,setsLost:testValues.setsLost});
  };

  return (
    <View style={styles.container}>
        <Image source={SOCSLOGO} />
        {/* Will make this show opp and score later */}
        <Text>SOCS VS {result.opponent}</Text>
        <Pressable onPress={testQuery}>
          <Text>Press me</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '15px',
  },
});
