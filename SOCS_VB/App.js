import { useEffect,useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import StatList from './components/StatList';
import ResultCard from './components/ResultCard';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as SQLite from 'expo-sqlite';
import * as VBDB from './vbdb';

VBDB.createTables();

const SOCSLOGO = require('./assets/images/logo.png');
export default function App() {
  const [result, setResults] = useState({id:0,opponent:'Test',setsWon:0,setsLost:0});
  useDrizzleStudio(VBDB.db);
  const testQuery = () => {
    testValues = VBDB.queryFirstResult();
    setResults({id:testValues.id,opponent:testValues.opponent,setsWon:testValues.setsWon,setsLost:testValues.setsLost});
  };

  return (
    <View style={styles.container}>
        <Image source={SOCSLOGO} />
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
