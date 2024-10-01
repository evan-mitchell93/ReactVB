import { TextInput,Text, SafeAreaView, View,Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import * as VBDB from '../vbdb';

export default function ResultForm(props) {
    const [oppText, onChangeOpp] = useState('')
    const [setsW, onChangeSetsW] = useState('');
    const [setsL, onChangeSetsL] = useState('');

    const submitResult = () => {
        VBDB.insertResult(oppText,parseInt(setsW),parseInt(setsL));
        props.setAllResults(VBDB.getAllResults());
        onChangeOpp("");
        onChangeSetsW('0');
        onChangeSetsL('0');
        props.setModalVis(false);
        console.log("Modal Should Close");
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={formstyles.inputContainer}>
                        <TextInput
                            style={formstyles.textInput}
                            onChangeText={onChangeSetsW}
                            value={setsW}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                    </View>
                </TouchableWithoutFeedback>
            <   TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={formstyles.inputContainer}>
                        <TextInput
                            style={formstyles.textInput}
                            onChangeText={onChangeSetsL}
                            value={setsL}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                    </View>
                </TouchableWithoutFeedback>
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