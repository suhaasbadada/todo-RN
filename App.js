import { StatusBar } from 'expo-status-bar';
import React,{useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,ScrollView, KeyboardAvoidingView,Keyboard, TextInput, TouchableOpacity } from 'react-native';
import Tasks from './components/Tasks';

export default function App() {
  const [task,setTask] = useState();
  const [taskItems,setTaskItems]=useState([]);

  const handleAddTask = () =>{
    Keyboard.dismiss();
    setTaskItems([...taskItems,task]);
    setTask(null);
  }

  const completedTask = (index) =>{
    let itemsCopy=[...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems([...itemsCopy]);
  }
  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <ScrollView style={styles.scrollView}>
        <View style={styles.items}>
          {
            taskItems.map((item,index)=>{
              return (
                <TouchableOpacity key={index} onPress={()=>completedTask(index)}>
                    <Tasks text={item}/>
                </TouchableOpacity>
              )
            })
          }                            
        </View>
        </ScrollView>
      </View>
      {/*Write a task*/}
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios"?"padding":"height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write your task'} value={task} onChangeText={text=>setTask(text)}/>

        <TouchableOpacity onPress={()=>handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
     
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',    
    paddingTop: StatusBar.currentHeight,
  },
  tasksWrapper: {
    paddingTop:80,
    paddingHorizontal:20,
    
  },

  sectionTitle:{
    fontSize:24,
    fontWeight:'bold',
    color:'white',
  },
  items:{
    marginTop:30,
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:15,
    paddingRight:10,
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:'white',
    borderRadius:50,
    borderColor:'red',
    borderWidth:.5,
    width:250,
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'white',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'red',
    borderWidth:.5,
  },
  addText:{},
});

