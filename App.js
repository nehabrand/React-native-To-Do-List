import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [editInput, setEditInput] = useState('');
  const [editTodos, setEditTodos] = useState(null);

  const addHandler = () => {
    if (!input.trim()) return; // Prevent adding empty todos
    const newTodo = {
      id: new Date().getTime().toString(),
      text: input.trim(),
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const deleteHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const saveHandler = (id) => {
    setTodos(todos.map((item) => (item.id === id ? { ...item, text: editInput } : item)));
    setEditInput('');
    setEditTodos(null);
  };

  return (
    <View style={styles.app}>
      <Text style={styles.heading}>My TO DO List</Text>
      <View style={styles.addtext}>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder="Enter todo"
      />
      <TouchableOpacity style={styles.addButton} onPress={addHandler}>
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.todoItem}>
            {editTodos === item.id ? (
              <TextInput
                style={styles.input}
                onChangeText={setEditInput}
                value={editInput}
                autoFocus
              />
            ) : (
              <Text>{item.text}</Text>
            )}
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteHandler(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => { setEditTodos(item.id); setEditInput(item.text); }}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              {editTodos === item.id && (
                <TouchableOpacity style={styles.saveButton} onPress={() => saveHandler(item.id)}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#E8EAED',
    alignItems:'center',
  },
  heading: {
    justifyContent: 'center',
    alignItems:'center',
    fle:2,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    flexDirection:'row',
    width: 200,
    height: 60,
    backgroundColor: 'white',
    //borderWidth: 1,
    borderColor: '#ccc',
    //borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: 'black',
    //borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    //borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  editButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  addtext:{
    flexDirection: 'row',
    //alignItems: 'center',
  }
});

export default App;
