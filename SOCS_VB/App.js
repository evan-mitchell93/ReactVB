import { useCallback,useState } from 'react';
import { StyleSheet, Text,Pressable, View, Image,FlatList, Dimensions,Modal} from 'react-native';
import ResultCard from './components/ResultCard';
import ResultForm from './components/ResultForm';
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
  const [modalVisible, setModalVisible] = useState(false);

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
        <Pressable style={styles.addButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={{textAlign:'center',fontWeight:'bold',}}>+</Text>
        </Pressable>
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
          <ResultCard res={item} setAllRows={setAllRows} currentResult={currentResult} setDataLoaded={setDataLoaded} />
        }
        keyExtractor={item => item.id}
        onViewableItemsChanged = {onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100,
          waitForInteraction:false
        }}
        >
        </FlatList>
        <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}
            >

            <ResultForm setAllResults={setAllRows} setModalVis={setModalVisible} />  

            </Modal>
        {dataLoaded &&
        <StatList resultId = {currentResult} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
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
    position: 'absolute',
    left: 0,
    right: 0,
    top:45
  },

  addButton: {
    borderRadius: 50,
    backgroundColor: 'goldenrod',
    height:70,
    width:70,
    justifyContent:'center',
    position:'absolute',
    top:225,
    right: 55
  },

  flist:{
    position:'absolute',
    bottom:75,

  }

});
