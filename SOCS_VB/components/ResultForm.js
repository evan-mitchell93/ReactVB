import { TextInput,Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as VBDB from '../vbdb';

export default function ResultForm(props) {
    const [oppText, onChangeOpp] = useState('')
    const [setsW, onChangeSetsW] = useState('');
    const [setsL, onChangeSetsL] = useState('');

    const submitResult = () => {
        VBDB.insertResult(oppText,parseInt(setsW),parseInt(setsL));
    }
    return(
        <SafeAreaView>
            <View style={formstyles.inputContainer}>
                <TextInput
                    style={formstyles.textInput}
                    onChangeText={onChangeOpp}
                    value={oppText}
                    placeholder="Opponent Abbr."
                />
            </View>
            <View style={formstyles.inputContainer}>
                <TextInput
                    style={formstyles.textInput}
                    onChangeText={onChangeSetsW}
                    value={setsW}
                    placeholder="0"
                    keyboardType="numeric"
                />
            </View>
            <View style={formstyles.inputContainer}>
                <TextInput
                    style={formstyles.textInput}
                    onChangeText={onChangeSetsL}
                    value={setsL}
                    placeholder="0"
                    keyboardType="numeric"
                />
            </View>
            <View style={formstyles.inputContainer}>
                <TouchableOpacity
                    style={formstyles.addButton}
                    onPress={submitResult}
                >
                    <Text style={formstyles.addButtonText}>Add Result</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const formstyles = StyleSheet.create({
    inputContainer: {
        paddingTop: 15
    },

    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    },

    addButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5,
    },

    addButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
    }
})