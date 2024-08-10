import { useCallback,useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable,Modal,FlatList, Dimensions} from 'react-native';
import ResultCard from './components/ResultCard';
import ResultForm from './components/ResultForm';
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
  //Modal control state
  const [modalVisible, setModalVisible] = useState(false);
  //Currently selected match result will be passed to components
  const [currentResult, setCurrentResult] = useState(0);

  const [matchData, setMatchData] = useState([{pointsplayed: 0}]);


  const [allRows, setAllRows] = useState(VBDB.getAllResults());

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
        setMatchData(data[0]);
      } else {
        setMatchData({pointsplayed: 0})
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
        maxHeight={100}
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={"fast"}
        snapToInterval={width}
        snapToAlignment={"center"}
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
        <FileManager resultId={currentResult} />
        <StatList resultId = {currentResult} />
        <Modal
          animationType='slide'
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <ResultForm allResults={allRows} setAllResults={setAllRows} setModalVis={setModalVisible} />  
        </Modal>
        <Pressable
        onPress={() => {
          setModalVisible(true);
        }}>
          <Text>Add Result</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '10px',
    minWidth: 50,
    justifyContent:'center',
    alignItems: 'center',
  },

  logo: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 50,
    marginBottom: 5,
  },

  flist: {
  }

});
