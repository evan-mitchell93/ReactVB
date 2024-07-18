
import { StyleSheet, Text, View,Image } from 'react-native';
import StatList from './components/StatList';
import ResultCard from './components/ResultCard';


const SOCSLOGO = require('./assets/images/logo.png');
export default function App() {
  return (
    <View style={styles.container}>
      <Image source={SOCSLOGO} />
      <ResultCard />
      <StatList />
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
