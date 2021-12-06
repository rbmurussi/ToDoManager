import React, { Component } from 'react';
import { StyleSheet, View, Switch, TouchableHighlight, TextInput, Text, Alert } from 'react-native';
import { writeTaskOnFirebaseAsync } from '../services/FirebaseAPI';

export default class Task extends Component {
    state = {
        key: '',
        title: '',
        resume: '',
        priority: true,
        isDone: false,
    };

    constructor(props) {
        super(props);

        try {
            const { task } = this.props.route.params;
            this.state = {
                key: task.key,
                title: task.title,
                resume: task.resume,
                priority: task.priority,
                isDone: task.isDone,
            };
            console.log("Editando tarefa existente")
        } catch (error) {
            console.log("Criando nova tarefa")
        }
    }
    async _saveTaskAsync() {
        var task = {
            key: this.state.key,
            title: this.state.title,
            resume: this.state.resume,
            priority: this.state.priority,
            isDone: this.state.isDone,
        };

        try {
            await writeTaskOnFirebaseAsync(task);
            this.props.navigation.goBack();
        } catch (error) {
            Alert.alert("Ops, houve um erro", error.message);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Título"
                    value={this.state.title}
                    onChangeText={(typedTtitle) => this.setState({ title: typedTtitle })} />

                <TextInput style={[styles.input, styles.multilineInput]}
                    placeholder="Resumo"
                    multiline={true}
                    numberOfLines={4}
                    value={this.state.resume}
                    onChangeText={(typedResume) => this.setState({ resume: typedResume })} />

                <View style={styles.switchContainer}>
                    <Switch value={this.state.priority}
                        onValueChange={(value) => this.setState({ priority: value })} />
                    <Text style={styles.switchText}>É prioridade?</Text>
                </View>

                <View style={styles.switchContainer}>
                    <Switch value={this.state.isDone}
                        onValueChange={(value) => this.setState({ isDone: value })} />
                    <Text style={styles.switchText}>Finalizado?</Text>
                </View>

                <TouchableHighlight style={styles.submit} onPress={() =>
                    this._saveTaskAsync()} underlayColor='#fff'>
                    <Text style={styles.submitText} >Salvar</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const lightGray = '#D3D3D3D3';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    input: {
        padding: 8,
        marginBottom: 20,
        height: 40,
        borderWidth: 1.0,
        borderColor: lightGray,
    },
    multilineInput: {
        height: 100,
        borderWidth: 1.0,
        borderColor: lightGray,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    switchText: {
        marginLeft: 20,
        color: 'black',
        fontSize: 16,
    },
    submit: {
        marginTop: 10,
        padding: 12,
        backgroundColor: 'orange',
        borderRadius: 10,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    }
});