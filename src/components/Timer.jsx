import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Timer = ({time}) => {
    const formattedTime = `${Math.floor(time / 60).toString().padStart(2,"0")}:${(time % 60).toString().padStart(2,"0")}`
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flex:0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        padding: 15,
        borderRadius: 10
    },
    time:{
        fontSize: 80,
        fontWeight: 'bold',
        color: '#000'
    }
})