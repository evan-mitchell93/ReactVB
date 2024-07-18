import {React, View, Text, ScrollView, StyleSheet} from "react-native";

export default function StatList() {
    return (
        <ScrollView style={listStyles.wrapper}>
            <Text>Test Scroll View</Text>
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