import {React,ScrollView, StyleSheet,Pressable} from "react-native";
import {getTeamDataByFilter} from '../vbdb';
import {Picker} from '@react-native-picker/picker';
import { useState } from "react";
import { DataTable } from "react-native-paper";


export default function StatList(props) {
    //State for keeping track of filter
    //Will display different stats for all players and
    //Team totals for selected match
    const [selectedFilter, setFilter] = useState('Serving');
    const [teamStats, setTeamStats] = useState([{"default": 0,"data":1}]);


    const gatherData = (filter) => {
        setFilter(filter);
        setTeamStats(getTeamDataByFilter(props.resultId,filter));
    }
        return (
            <ScrollView style={listStyles.wrapper}>
                <Picker
                    style={listStyles.picker}
                    selectedValue={selectedFilter}
                    onValueChange={(itemValue,itemIndex) => gatherData(itemValue)}
                >   
                    <Picker.Item label="Plus Minus" value="PlusMinus"/>
                    <Picker.Item label="Serving" value="Serving" />
                    <Picker.Item label="Serve Recieve" value="ServeRecv" />
                    <Picker.Item label="Attacking" value="Attacking" />
                    <Picker.Item label="Blocking" value="Blocking" />
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
        );
}

const listStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        maxHeight:350,
        width:'100%',
    },

    wrapper1: {
        flex: 1,
        backgroundColor:"green",
    },

    tab: {
        color:"white",
    },  


    buttonText: {
        color: 'white',
        fontSize: '20',
    },
});