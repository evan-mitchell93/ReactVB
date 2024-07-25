import {React, View, Text, ScrollView, StyleSheet} from "react-native";
import * as VBDB from '../vbdb';
import {Picker} from '@react-native-picker/picker';
import { useState } from "react";

export default function StatList() {
    //State for keeping track of filter
    //Will display different stats for all players and
    //Team totals for selected match
    const [selectedFilter, setFilter] = useState('Serving');
    const [playerData,setPlayerData] = useState([]);
    const [teamData, setTeamData] = useState([]);

    return (
        <ScrollView style={listStyles.wrapper}>
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
});