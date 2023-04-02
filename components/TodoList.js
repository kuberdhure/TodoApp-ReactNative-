import { View, FlatList, StyleSheet } from "react-native";
import { React } from "react";
import { TodoItem } from "./TodoItem";

function TodoList(props) {
  let data = props.data.sort((a, b) => {
    if (a.isChecked !== b.isChecked) {
      return a.isChecked ? 1 : -1;
    }
    return 0;
  });

  return (
    <View style={styles.todoList}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          // console.log(item);
          return (
            <TodoItem
              list={props.data}
              itemKey={item.key}
              todo={item.todo}
              isChecked={item.isChecked}
              updateState={props.updateState}
              updateItems={props.updateItems}
              setChecked={(value) => {
                let updatedList = [...props.data];
                updatedList[index].isChecked = value;
                props.updateState(updatedList);
              }}
            />
          );
        }}
        backgroundColor={"#000000"}
        alignItems={"center"}
        justifyContent={"space-between"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoList: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 25,
    backgroundColor: "#fff",
  },
});
export { TodoList };
