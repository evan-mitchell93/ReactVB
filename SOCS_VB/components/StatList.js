import {React, View, Text, ScrollView, StyleSheet,Pressable} from "react-native";
import {getTeamDataByFilter} from '../vbdb';
import * as DocPicker from 'expo-document-picker';
import Papa from 'papaparse';
import * as FS from 'expo-file-system';
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";

export default function StatList(props) {
    //State for keeping track of filter
    //Will display different stats for all players and
    //Team totals for selected match
    const [selectedFilter, setFilter] = useState('Serving');
    const [playerData,setPlayerData] = useState([{}]);
    const [teamStats, setTeamStats] = useState([{"default": 0,"data":1}]);
    const [loaded, setLoaded] = useState(false);

    useEffect (() => {
        setLoaded(true);
    }, [teamStats]);

    const gatherData = (filter) => {
        setFilter(filter);
        setTeamStats(getTeamDataByFilter(props.resultId,filter));
        setLoaded(false);
    }

    if(loaded){
        return (
            <ScrollView style={listStyles.wrapper}>
                <Picker
                    style={listStyles.picker}
                    selectedValue={selectedFilter}
                    onValueChange={(itemValue,itemIndex) => gatherData(itemValue)}
                >
                    <Picker.Item label="Serving" value="Serving" />
                    <Picker.Item label="Attacking" value="Attacking" />
                    <Picker.Item label="ServeRecv" value="ServeRecv" />
                </Picker>
                <DataTable>
                    <DataTable.Header>
                        {Object.entries(teamStats[0]).map(([key,value]) => (
                            <DataTable.Title>{key}</DataTable.Title>
                        ))}
                    </DataTable.Header>
                    {Object.entries(teamStats).map(([pid,pdata]) => (
                        <DataTable.Row key={pid}>
                            {Object.entries(pdata).map(([k,v]) =>(
                                <DataTable.Cell>{v}</DataTable.Cell>
                            ))}
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ScrollView>
        );}
    else {
        return (
            <View style={listStyles.wrapper1}>
                <Text>Loading Data</Text>
            </View>
        )
    }
}

const listStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor:'pink',
        maxHeight:350,
        width:'100%',
    },

    wrapper1: {
        flex: 1,
        backgroundColor:"green",
    },
    uploadBtn: {
        backgroundColor: 'navy',
        justifyContent: 'center',
        alignItems: 'center',
    },

    tab: {
        color:"white",
    },  


    buttonText: {
        color: 'white',
        fontSize: '20',
    },
    picker: {
    },
});