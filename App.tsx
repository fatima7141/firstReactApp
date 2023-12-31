
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() { // that is a functional component
  
  const[modalIsVisible, setModalIsVisible] =useState(false);
  const [courseGoals, setCourseGoals]= useState<any[]>([]); // j'ai mis trop de truc de type any pour que ca marche 
  
  function startAddGoalHandler(){
    setModalIsVisible(true);
  }

  function endAddGoalHandler(){
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText : any) {
    setCourseGoals((currentcourseGoal : any[])=>[ // a demander pour le type
      ...currentcourseGoal, {text: enteredGoalText,
       id: Math.random().toString()},]);
       endAddGoalHandler();
      }  //Je dois reviser le math.random for the key parce que je n'ai pas trop compris 
  
  function deleteGoalHandler(id : any){ //this is how to delete an element from the array
    setCourseGoals( currentCourseGoal => {
      return currentCourseGoal.filter((goal) => goal.id !== id);
    });
  }
// button dont take style but can take color and title
  return (
    <>
    <StatusBar style="auto"/>
    <View style={styles.appContainer}/*style={styles.container}*/>
      <Button title="Add New Goal" color="orange" onPress={startAddGoalHandler}/> 
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>
      <View style={styles.ListOfGoals}><Text style={styles.ListOfGoals}>List Of Goals</Text></View>
      <View  style={styles.GoalsContainer}>
      <FlatList data={courseGoals} renderItem={itemData=>{
        return <GoalItem text={itemData.item.text}
        id={itemData.item.id} 
        onDeleteitem={deleteGoalHandler}/>;
      }}
      keyExtractor={(item, index)=>{
        return item.id;
      }}
      alwaysBounceVertical={false}/>
      </View>
    </View>
    </>
  );
}

//I really have to understand and add the keyExtractor mentioner vers la fin du viddeo 26

const styles = StyleSheet.create({ //Stylesheet is a builtin methode that adds validation and potential performance improvements
    appContainer: {
      flex:1,
      paddingTop: 70,
      paddingHorizontal: 16,
      backgroundColor : `#2f4f4f`
    },

    inputContainer:{
      flex:1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems : "center",
      marginBottom: 24,
      borderBottomWidth: 2,
      borderTopWidth: 0.01,
      borderColor: `#90ee90`,
      
    },

    TextInput : {
      flex:1,
      borderWidth: 2,
      borderColor: `#90ee90`,
      width: "75%",
      marginRight: 8,
      padding : 8,
    },

    GoalsContainer: {
      flex :7,
    },

    goalItem: {
      margin:8,
      padding: 8,
      borderRadius: 6,
      backgroundColor: "orange",
      

    },

    goalText: {
      color:`#90ee90`
    },

    ListOfGoals: { 
      color:`#90ee90`,
      paddingBottom: 5,
      paddingTop:5,
      fontSize: 20
    }
});
