import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Switch } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'



class BmiCalculator extends Component {
  state = {
    userHeight: '',
    userWeight: '',
    userHeightFeet: '',
    userHeightInch: '',
    userWeightPounds: '',
    calculatedBmi: '',
    calculatedBmiImperial: '',
    setHeightTextValue: '',
    setWeightTextValue: '',
    inputType: 'm',
    description: '',
    calculateDescBMI: '',
    calculateDescImperial: '',
    bmiTextColor: 'black',
    bmiTextColorImperial: 'black',
    
  }

  getHeight = (text) => {
    this.setState({ userHeight: text })
  }
  getHeightFeet = (text) => {
    this.setState({ userHeightFeet: text })
  }
  getHeightInch = (text) => {
    this.setState({ userHeightInch: text })
  }
  getWeight = (text) => {
    this.setState({ userWeight: text })
  }
  getWeightPounds = (text) => {
    this.setState({ userWeightPounds: text })
  }

  //Metric BMI calculation
  calculate = (userHeight, userWeight) => {
    
    var result = (userWeight*10000)/(userHeight*userHeight);
    result = result.toFixed(1);
    var resultDesc = '';

    {(result < 18.5) ? (resultDesc='You are underweight!', metricsColor = 'orange') : (result > 18.4 && result < 25) ? (resultDesc = 'Normal weight!', metricsColor = 'green') : (result > 24.9 && result < 30) ? (resultDesc = 'You are overweight!', metricsColor = 'red') : (result > 29.9 ) ? (resultDesc = 'This is obesity!', metricsColor = 'red') : (resultDesc = '', metricsColor = 'black')  }

    this.setState({ calculatedBmi: result })
    this.setState({ calculateDescBMI: resultDesc })
    this.setState({ bmiTextColor: metricsColor })
    
  }

  //Imperial BMI calculation
  calculateImperial = (userHeightFeet, userHeightInch, userWeightPounds) => {
    var totalHeight =Math.pow(Number(userHeightFeet)*12+Number(userHeightInch), 2);
    var resultImperial = (Number(userWeightPounds)/totalHeight)*703;
    resultImperial = resultImperial.toFixed(1);
    var resultDescImperial = '';

    {(resultImperial < 18.5) ? (resultDescImperial='You are underweight!', imperialColor = 'orange') : (resultImperial > 18.4 && resultImperial < 25) ? (resultDescImperial = 'Normal weight!', imperialColor= 'green') : (resultImperial > 24.9 && resultImperial < 30) ? (resultDescImperial = 'You are overweight!', imperialColor='red') : (resultImperial > 29.9) ? (resultDescImperial = 'This is obesity!', imperialColor='red') : (resultImperial = '', imperialColor='black')  }

    this.setState({ calculatedBmiImperial: resultImperial })
    this.setState({ calculateDescImperial: resultDescImperial })
    this.setState({ bmiTextColorImperial: imperialColor })
    
  }


  render() {
    return (
        <View>
          <Text style={styles.titleBMI}>BMI CALCULATOR</Text>

          {/* switch to metrics or imperial  */}

          <SwitchSelector
          style={{
            width: '90%',
            marginLeft: '5%',
            marginBottom: 10,
          }}
            initial={0}
            onPress={value => this.setState({ inputType: value })}
          
            onValueChange = {(this.state.inputType == 'i') ? (this.state.calculatedBmi = '', this.state.calculateDescBMI = '', this.state.bmiTextColor = ''):(this.state.calculatedBmiImperial='', this.state.calculateDescImperial = '', this.state.bmiTextColorImperial = '')}

            textColor='#7a44cf' 
            selectedColor='#fff' 
            buttonColor='midnightblue'
            borderColor='midnightblue'
            hasPadding
            options={[
              { label: "Metrics", value: "m" },
              { label: "Imperial", value: "i" },
            ]}
            testID="metric-switch-selector"
            accessibilityLabel="metric-switch-selector"
             
          />

          {/* get hight based on selected system*/}
          <Text  style = {styles.label}>{this.state.inputType == 'm' ?<Text>Height :</Text>:<Text>Height :</Text>}</Text>
          <View>
          {this.state.inputType == 'm' ?<TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Set your height in CM"
              keyboardType="numeric"
              onChangeText = {this.getHeight}/>:
              <View style = {styles.inputContainer}>    
              <TextInput style = {styles.inputImperial}
              underlineColorAndroid = "transparent"
              placeholder = "FEET"
              keyboardType="numeric"
              onChangeText = {this.getHeightFeet}/>
              <TextInput style = {styles.inputImperial}
              underlineColorAndroid = "transparent"
              placeholder = "INCHES"
              keyboardType="numeric"
              onChangeText = {this.getHeightInch}/>
          </View>}

          
             {/* get weight based on selected system*/}
          </View>
          <Text  style = {styles.label}>{this.state.inputType == 'm' ?<Text>Weight :</Text>:<Text>Weight :</Text>}</Text>
          <View>
          {this.state.inputType == 'm' ?<TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Set your weight in KG"
              keyboardType="numeric"
              onChangeText = {this.getWeight}/>:
           <View>
              <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Set your weight in POUNDS"
              keyboardType="numeric"
              onChangeText = {this.getWeightPounds}/>
              </View>
              }
          </View>

            {/* TouchableOpacity for Metrics and Imperial systems */}
          {this.state.inputType == 'm' ? <TouchableOpacity
              style = {styles.submitButton}
              onPress = {
                () => this.calculate(this.state.userHeight, this.state.userWeight)
              }>
              <Text style = {styles.submitButtonText}> Calculate BMI </Text>
              </TouchableOpacity>:
            <TouchableOpacity
              style = {styles.submitButton}
              onPress = {
                () => this.calculateImperial(this.state.userHeightFeet, this.state.userHeightInch , this.state.userWeightPounds)
              }>
              <Text style = {styles.submitButtonText}> Calculate BMI </Text>
            </TouchableOpacity>
          }
          
          {/* display BMI result */}
          <Text style={styles.output}>Your BMI:</Text>
          {this.state.inputType == 'm'  ? <Text style={styles.output}><Text style = {{color: this.state.bmiTextColor}}>{this.state.calculatedBmi} - {this.state.calculateDescBMI} </Text></Text>:
        <Text style={styles.output}>  <Text style = {{color: this.state.bmiTextColorImperial}}>{this.state.calculatedBmiImperial} - {this.state.calculateDescImperial}</Text> </Text>    }
           
        </View>
      )
   }
}

export default BmiCalculator


//styles

const styles = StyleSheet.create({
   input: {
      margin: 15,
      borderWidth: 2,
      borderColor: 'mediumpurple',
      padding: 10,
   },
   inputImperial: {
    margin: 15,
    borderWidth: 2,
    borderColor: 'mediumpurple',
    padding: 10,
    width: '42%',
 },
  inputContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
   submitButton: {
      margin: 15,
      backgroundColor: 'midnightblue',
      padding: 10,
   },
   submitButtonText:{
      textAlign: "center",
      color: '#fff',
      fontSize: 18,
   },
   output:{
      textAlign: "center",
      fontSize: 20,
      fontWeight: 'bold' ,
   },
   
   titleBMI:{
      height: 100,
      paddingTop: 10,
      lineHeight: 100,
      textAlign: 'center',
      fontSize: 30,
      fontWeight:'bold',
      backgroundColor: 'mediumpurple',
      color: '#fff',
      marginBottom: 15,
   },
   label:{
      marginLeft: 15,
   }
})