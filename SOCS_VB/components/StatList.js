import {React, View, Text, ScrollView, StyleSheet,Pressable} from "react-native";
import * as VBDB from '../vbdb';
import * as DocPicker from 'expo-document-picker';
import Papa from 'papaparse';
import * as FS from 'expo-file-system';
import {Picker} from '@react-native-picker/picker';
import { useState } from "react";

export default function StatList(props) {
    //State for keeping track of filter
    //Will display different stats for all players and
    //Team totals for selected match
    const [selectedFilter, setFilter] = useState('Serving');
    const [playerData,setPlayerData] = useState([]);
    const [teamData, setTeamData] = useState([]);
    const [fileURI, setFileUri] = useState(null);
    const [csvData, setCsvData] = useState([]);

    const uploadCsv = async () => {
        try {
          //pick csv from device files
          const result = await DocPicker.getDocumentAsync({type: "*/*",copyToCacheDirectory: true, base64:false, });
    
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
                VBDB.insertTeamStats(csvData[csvData.length-2],props.resultId);
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
          const response = await FS.readAsStringAsync(uri,{encoding:"unicode"});
          return response
        } catch (error){
          console.error("Reading",error)
          return null;
        }
      };
    
    return (
        <ScrollView style={listStyles.wrapper}>
            <Pressable
            style={listStyles.uploadBtn}
            onPress={uploadCsv}
            >
                <Text style={listStyles.buttonText}>Upload Data</Text>
            </Pressable>
            <Picker
                selectedValue={selectedFilter}
                onValueChange={(itemValue,itemIndex) => setFilter(itemValue)}
            >
                <Picker.Item label="Serving" value="Serving" />
                <Picker.Item label="Attacking" value="Attacking" />
                <Picker.Item label="ServeRecv" value="ServeRecv" />
            </Picker>
        </ScrollView>
    );
}

const listStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        padding: "10px",
        shadowColor: '#000',
        shadowRadius: 5,
        marginTop: '10px',
        maxHeight: '100px',
    },
    uploadBtn: {
        backgroundColor: 'navy',
        width: '90%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: '20',
    }
});