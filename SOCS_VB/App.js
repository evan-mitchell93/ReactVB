import { useCallback,useState } from 'react';
import { StyleSheet, Text, View, Image,FlatList, Dimensions} from 'react-native';
import ResultCard from './components/ResultCard';
import FileManager from './components/FileManager';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as VBDB from './vbdb';
import StatList from './components/StatList';

const {width} = Dimensions.get('window');
//create initial db table and insert two rowss
VBDB.createTables();

//Seven Oaks Crest logo
const SOCSLOGO = require('./assets/images/logo.png');

export default function App() {
  //Currently selected match result will be passed to components
  const [currentResult, setCurrentResult] = useState(0);
  const [allRows, setAllRows] = useState(VBDB.getAllResults());
  const [dataLoaded, setDataLoaded] = useState(false);

  useDrizzleStudio(VBDB.db);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    //replace with code to fill in data from current match displayed.
    if (viewableItems.length == 0){
    } else{
      //when viewable switches save the resultId for use later
      setCurrentResult(viewableItems[0].item.id)
      //when viewable switches, load teamstats from that match
      const data = VBDB.getTeamStats(viewableItems[0].item.id);
      if(data!= null && data.length != 0){
        setDataLoaded(true);
      } else {
        setDataLoaded(false);
      }
    }
  });

  return (
    <View style={styles.container}>
        <View style={styles.logo} >
          <Image source={SOCSLOGO}/>
        </View>
        <FlatList
        style={styles.flist}
        maxHeight={125}
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={"fast"}
        snapToInterval={width}
        snapToAlignment={"center"}
        data={allRows}
        renderItem={({item})=>
          <ResultCard res={item} setAllRows={setAllRows}/>
        }
        keyExtractor={item => item.id}
        onViewableItemsChanged = {onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100,
          waitForInteraction:false
        }}
        >
        </FlatList>
        <FileManager resultId={currentResult} setDataLoaded={setDataLoaded} />
        {dataLoaded &&
        <StatList resultId = {currentResult} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minWidth: 50,
    justifyContent:'center',
    alignItems: 'center',
  },

  logo: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 1,
    marginBottom: 5,
  },

});
