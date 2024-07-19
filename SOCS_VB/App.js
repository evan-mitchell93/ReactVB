import { useCallback, useEffect,useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable,ScrollView,FlatList, Dimensions} from 'react-native';
import ResultCard from './components/ResultCard';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as VBDB from './vbdb';

const {width} = Dimensions.get('window');
//create initial db table and insert two rowss
VBDB.createTables();
const allRows = VBDB.queryAllResults();

//Seven Oaks Crest logo
const SOCSLOGO = require('./assets/images/logo.png');

export default function App() {
  //state for current selected result
  const [result, setResults] = useState({id:0,opponent:'Test',setsWon:0,setsLost:0});
  const [dt, setDT] = useState(0);
  useDrizzleStudio(VBDB.db);

  //button testing 
  const testQuery = () => {
    testValues = VBDB.queryFirstResult();
    setResults({id:testValues.id,opponent:testValues.opponent,setsWon:testValues.setsWon,setsLost:testValues.setsLost});
  };


  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length == 0){
      console.log('empty');
    } else{
      console.log(viewableItems);
      setDT(viewableItems[0].item.id)
    }
  });

  return (
    <View style={styles.container}>
        <View style={styles.logo} >
          <Image source={SOCSLOGO}/>
        </View>
        {/* Will make this show opp and score later */}

        <FlatList

        horizontal={true}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        decelerationRate={"fast"}
        snapToInterval={width}
        snapToAlignment={"center"}
        scrollEnabled={true}
        data={allRows}
        renderItem={({item})=>
          <ResultCard res={item}/>
        }
        keyExtractor={item => item.id}
        onViewableItemsChanged = {onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100,
          waitForInteraction:false
        }}
        >
        </FlatList>
        <Text>{dt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '15px',
    minWidth: 50,
  },

  logo: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 50,
    marginBottom: 5,
  }

});
