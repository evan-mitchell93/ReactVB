import {React,Text,View,Modal,Image,StyleSheet,Dimensions} from "react-native";
import {useState} from "react";
import FileManager from "./FileManager";

const {width} = Dimensions.get('window');

export default function ResultCard(props){

    return(
        <View style={resultStyles.contentVertical}>
            <View style={resultStyles.contentHorizontal}>
                <View style={resultStyles.teamBox}>
                    <Text>SOCS</Text>
                    <Text>  {props.res.setsWon}  </Text>
                </View>
                <View style={resultStyles.team_box}>
                    <Text>{props.res.opponent}</Text>
                    <Text>  {props.res.setsLost}  </Text>
                </View>
                <FileManager resultId={props.currentResult} setDataLoaded={props.setDataLoaded} />
            </View>
        </View>
    );
}

const resultStyles = StyleSheet.create({
    contentVertical:{
        flex:1,
        flexDirection: 'column',
        marginTop: 20,
        height:200,

    },
    
    contentHorizontal: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 0,
        width: width,
        height: '95%',
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
        zIndex: 999,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    teamBox: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
    }
})
