import {React,Text,View,Image,StyleSheet} from "react-native";

export default function ResultCard(props){
    return(
        <View style={resultStyles.content}>
            <View style={resultStyles.team_box}>
                <Text>SOCS</Text>
                <Text>  {props.res.setsWon}  </Text>
            </View>
            <View style={resultStyles.team_box}>
                <Text>{props.res.opponent}</Text>
                <Text>  {props.res.setsLost}  </Text>
            </View>
        </View>
    );
}

const resultStyles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: "10px",
        marginTop: 20,
        marginBottom: 10,
        maxHeight: 100,
        maxWidth: '50%',
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
        zIndex: 999,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    team_box: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
