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
    const [playerData,setPlayerData] = useState([]);
    const [teamStats, setTeamStats] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect (() => {
        setLoaded(true);
        console.log(teamStats);
    }, [teamStats]);

    const gatherData = (filter) => {
        setFilter(filter);
        setTeamStats(getTeamDataByFilter(props.resultId,filter));
        setLoaded(false);
    }

    if(loaded){
        return (
            <View style={listStyles.wrapper}>
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
                    <DataTable.Row>
                        {Object.entries(teamStats).map(([key,v]) =>{
                            <DataTable.Cell>{v}</DataTable.Cell>;
                        })}
                    </DataTable.Row>
                </DataTable>
            </View>
        );}
    else {
        return (
            <View>
                <Picker
                    style={listStyles.picker}
                    selectedValue={selectedFilter}
                    onValueChange={(itemValue,itemIndex) => gatherData(itemValue)}
                >
                    <Picker.Item label="Serving" value="Serving" />
                    <Picker.Item label="Attacking" value="Attacking" />
                    <Picker.Item label="ServeRecv" value="ServeRecv" />
                </Picker>
                <Text>Loading Data</Text>
            </View>
        )
    }
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
    },

    picker: {
        height: 30,
    }
});