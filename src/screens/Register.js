import React, { Component } from 'react';
import {
    Image, View, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, Alert
} from 'react-native';
import { createUserOnFirebaseAsync } from '../services/FirebaseAPI'

const img = require('./../assets/todolist.png')

export default class Register extends Component {
    state = {
        email: '',
        password: '',
    }

    async _createUserAsync() {
        try {
            const user = await createUserOnFirebaseAsync(this.state.email, this.state.password);
            Alert.alert('Usuário criado!', `Usuário ${user.email} foi criado com sucesso`,
                [{
                    text: 'OK', onPress: () => {
                        this.props.navigation.goBack();
                    }
                }]);
        } catch (error) {
            Alert.alert('Erro ao criar usuário', error.message);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.topView}>
                    <Image style={styles.img} source={img} />
                    <Text style={styles.title}>Cadastro de usuário</Text>
                </View>
                <View style={styles.bottomView}>
                    <TextInput style={styles.input}
                        placeholder="E-mail"
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={email => this.setState({ email })} />
                    <TextInput style={styles.input}
                        placeholder="Senha"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />
                    <TouchableHighlight style={styles.submit} onPress={() =>
                        this._createUserAsync()} underlayColor='#fff'>
                        <Text style={styles.submitText}>Registrar usuário</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView >
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    topView: {
        flex: 0.20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
    },
    img: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    bottomView: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: {
        marginBottom: 20,
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
    },
});
