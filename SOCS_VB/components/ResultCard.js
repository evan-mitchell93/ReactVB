import {React,Text,View,Image,StyleSheet, Dimensions} from "react-native";

const {width} = Dimensions.get('window');

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
        marginTop: 10,
        width: width,
        margin: 0,
        height: 200,
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
