import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const options = ["Pomodoro", "Short Break", "Long Break"]

const Header = ({ modeTime, setModeTime, time, setTime }) => {

    const handlePress = (index) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setModeTime(index);
        setTime(newTime*60);
    }


    return (
        <View style={styles.options}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(index)}
                    style={[styles.option, modeTime !== index && {borderColor: "transparent"}]}  
                >     
                    <Text style={styles.text}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    options: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 50,
        width: '100%'
    },
    option: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 50,
        width: '33%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'white'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})