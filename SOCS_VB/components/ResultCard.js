import {React,Text,View,Image,StyleSheet} from "react-native";

export default function ResultCard(props){
    return(
        <View style={resultStyles.content}>
            <Text>SOCS</Text>
            <Text>{props.res.opponent}</Text>
            <Text>{props.res.setsWon}</Text>
            <Text>{props.res.setsLost}</Text>
        </View>
    );
}

const resultStyles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: "10px",
        shadowColor: '#000',
        shadowRadius: 5,
        marginTop: '10px',
        maxHeight: '100px',
    }
})
