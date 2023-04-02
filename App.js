import { StyleSheet, Text, View } from "react-native";
import { AddTodo } from "./components/AddTodo";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemsContainers}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Todos.</Text>
          <Text style={styles.subHeader}>Your Everyday todo list.</Text>
        </View>
        <AddTodo />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemsContainers: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  header: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "400",
    marginTop: 40,
    marginLeft: 18,
    alignSelf: "flex-start",
    padding: 4,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 150,
    width: "100%",
    backgroundColor: "#000000",
    padding: 2,
  },
  subHeader: {
    color: "#fff",
    marginLeft: 25,
    marginTop: 5,
    fontSize: 16,
  },
});
