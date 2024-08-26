import {React,Text,View,Modal,Image,StyleSheet,Pressable,Dimensions} from "react-native";
import {useState} from "react";
import ResultForm from "./ResultForm";

const {width} = Dimensions.get('window');

export default function ResultCard(props){
    const [modalVisible, setModalVisible] = useState(false);
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
            <Modal
          animationType='slide'
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <ResultForm setAllResults={props.setAllRows} setModalVis={setModalVisible} />  
        </Modal>
        <Pressable
        onPress={() => {
          setModalVisible(true);
        }}>
          <Text>Add Result</Text>
        </Pressable>
        </View>
    );
}

const resultStyles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 10,
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

    team_box: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
