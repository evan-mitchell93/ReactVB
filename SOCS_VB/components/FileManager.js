import {React, View, Pressable, Text, StyleSheet} from 'react-native';
import {insertTeamStats} from '../vbdb';
import * as DocPicker from 'expo-document-picker';
import Papa from 'papaparse';
import * as FS from 'expo-file-system';
import {useState} from 'react';

export default function FileManager(props) {
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
            const fileData = await readFile(result.assets[0].uri);
            if(fileData) {
              const parsedData = Papa.parse(fileData);
              if (parsedData.errors.length > 0){
                console.error('error parsing csv',parsedData.errors);
              } else{
                //set our csv data to then eventually save to db.
                setCsvData(parsedData.data);
                for(let i = 2; i <= csvData.length-2; i++){
                  insertTeamStats(csvData[i],props.resultId);
                }
                props.setDataLoaded(true);
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
        <View style={fmStyles.comp}>
            <Pressable
                style={fmStyles.uploadBtn}
                onPress={uploadCsv}>
                <Text style={fmStyles.uploadBtnText}>Upload Team Data</Text>
            </Pressable>
        </View>
      );
}

const fmStyles = StyleSheet.create({
    comp: {
      height: 35,
      width:'100%',
    },

    uploadBtn: {
        backgroundColor: 'navy',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    uploadBtnText: {
        color: 'white',
        fontSize: '20',
    }
})