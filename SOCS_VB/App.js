import { useCallback, useEffect,useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable,ScrollView,FlatList, Dimensions} from 'react-native';
import ResultCard from './components/ResultCard';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as VBDB from './vbdb';
import * as DocPicker from 'expo-document-picker';
import Papa from 'papaparse';
import * as FS from 'expo-file-system';

const {width} = Dimensions.get('window');
//create initial db table and insert two rowss
VBDB.createTables();
const allRows = VBDB.queryAllResults();

//Seven Oaks Crest logo
const SOCSLOGO = require('./assets/images/logo.png');

export default function App() {
  //state for current selected result
  const [matchData, setMatchData] = useState([{pointsplayed: 0}]);
  const [fileURI, setFileUri] = useState(null);
  const [csvData, setCsvData] = useState([]);

  useDrizzleStudio(VBDB.db);


  const pickCSV = async () => {
    try {
      //pick csv from device files
      const result = await DocPicker.getDocumentAsync({type: 'text/csv',copyToCacheDirectory: true,});

      if (result.canceled === false) {
        //set our uri to the chosen file
        setFileUri(result.assets[0].uri);
        //read data from file
        const fileData = await readFile(fileURI);
        if(fileData) {
          const parsedData = Papa.parse(fileData);
          if (parsedData.errors.length > 0){
            console.error('error parsing csv',parsedData.errors);
          } else{
            //set our csv data to then eventually save to db.
            setCsvData(parsedData.data);
          }
        }  else {
          console.error("Failed to read file data",fileData);
        }
      }
    } catch (error) {
      console.error("Error picking document", error);
    }
  };

  
  const readFile = async (uri) => {
    console.log("Reading file");
    try {
      //read the file - this is where we are running into issues accessing the file
      const response = await FS.readAsStringAsync(uri);
      console.log(response);
      return response
    } catch (error){
      console.error("Reading",error)
      return null;
    }
  };


  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    //replace with code to fill in data from current match displayed.
    if (viewableItems.length == 0){
      console.log('empty');
    } else{
      //when viewable switches, load teamstats from that match
      const data = VBDB.getTeamStats(viewableItems[0].item.id);
      if(data.length != 0){
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
        {/* Will make this show opp and score later */}

        <FlatList
        style={styles.flist}
        backgroundColor='black'
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

        {/* reading csv not working at the moment}
        <Pressable onPress={pickCSV}>
          <Text>Upload Match Data</Text>
        </Pressable> */}
        <Text>{matchData.pointsplayed}</Text>
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
  },

  flist: {
    maxHeight: '30%',
  }

});
