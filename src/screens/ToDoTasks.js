import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { TaskListView } from '../components/Components';
import { readTasksFromFirebaseAsync } from '../services/FirebaseAPI';

const imagePlus = require('../assets/plus.png');

export default class ToDoTasks extends Component {

    state = {
        tasks: [],
    };

    componentDidMount() {
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
    }

    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter(t => !t.isDone);
        this.setState({ tasks: tasksToDo });
    }

    _goToTask() {
        console.log("passou aqui")
        this.props.navigation.navigate('Task');
    }

    render() {
        return (
            <View style={styles.container}>
                <TaskListView tasks={this.state.tasks} navigation={this.props.navigation} />
                <TouchableOpacity style={styles.floatButton} onPress={() => this._goToTask()}>
                    <Image source={imagePlus} style={styles.image} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    icon: {
        color: 'orange',
        width: 26,
        height: 26,
    },
    image: {
        width: 50,
        height: 50,
    },
    floatButton: {
        position: 'absolute',
        right: 10,
        bottom: 20,
    }
});