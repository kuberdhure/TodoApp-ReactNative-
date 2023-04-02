import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GetInfoDialog } from "./GetInfoDialog";
import { React, useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function updateItems(arr) {
  try {
    console.log("Log from updateItems: " + JSON.stringify(arr));
    await AsyncStorage.setItem("todoData", JSON.stringify(arr));
  } catch (e) {
    console.log(e);
  }
}

async function updateDB(setFunc) {
  var items = [];
  try {
    const data = await AsyncStorage.getItem("todoData");
    if (data !== null && data != undefined && data !== []) {
      console.log("Logging: " + data);
      for (let item of JSON.parse(data)) {
        items.push(item);
      }
      console.log(items);
      setFunc(items);
    }
  } catch (ex) {
    console.log(ex);
  }
}

function AddTodo() {
  const [state, setState] = useState(false);
  const [todos, addTodos] = useState([]);
  const [fnCalled, setCalled] = useState(false);
  var keys = (todos || []).length;

  if (!fnCalled) {
    updateDB(addTodos);
    console.log("UpdateDb called");
    setCalled(true);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={state}
        statusBarTranslucent={true}
      >
        <View style={styles.itemsContainer}>
          <GetInfoDialog
            state={state}
            stateChange={setState}
            addItem={addTodos}
            todos={todos}
            numKeys={keys}
            updateTodo={updateItems}
          />
        </View>
      </Modal>

      {(todos || []).length > 0 ? (
        <TodoList
          data={todos}
          updateState={addTodos}
          updateItems={updateItems}
        />
      ) : null}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setState(true);
          }}
        >
          <Text style={styles.text}>Add New</Text>
        </TouchableOpacity>
        {(todos || []).length > 0 ? (
          <MaterialCommunityIcons
            style={styles.deleteIcon}
            name="delete"
            size={40}
            color="red"
            onPress={() => {
              addTodos([]);
              updateItems([]);
            }}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  btn: {
    marginLeft: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#337ef5",
    height: 45,
    width: 150,
    marginHorizontal: 2,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#337ef5",
  },
  itemsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  deleteIcon: {
    marginLeft: 50,
  },
});

export { AddTodo };
