import React, { Component } from 'react';
import {
    View, Text, Image, Alert, TextInput, StyleSheet, KeyboardAvoidingView, TouchableHighlight
} from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseAPI';
import { CommonActions } from '@react-navigation/native';

const img = require('./../assets/todolist.png');

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: this.props.email,
        password: ''
    };

    async _signInAsync() {
        try {
            const user = await signInOnFirebaseAsync(this.state.email, this.state.password);
            this.props.navigation.dispatch(
                //Limpando a stack de navegação para evitar que o botão de voltar apareça
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'TaskList' }],
                }),
            );
        } catch (error) {
            Alert.alert('Falha no login', error.message);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.topView}>
                    <Image style={styles.img} source={img} />
                </View>
                <View style={styles.bottomView}>
                    <TextInput style={styles.input}
                        placeholder="E-mail"
                        value={this.state.email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={text => this.setState({ email: text })} />
                    <TextInput style={styles.input}
                        placeholder="Senha"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })} />
                    <TouchableHighlight style={styles.submit} onPress={() =>
                        this._signInAsync()} underlayColor='#fff'>
                        <Text style={styles.submitText} >Login</Text>
                    </TouchableHighlight>
                    <View style={styles.textContainer}>
                        <Text>Não possui cadastro?</Text>
                        <Text style={styles.textRegister} onPress={() => {
                            const { navigate } = this.props.navigation;
                            navigate('Register');
                        }}> Criar registro </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    img: {
        width: 200,
        height: 200,
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: {
        marginBottom: 20,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    textRegister: {
        fontWeight: 'bold',
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