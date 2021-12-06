import React from 'react';

import 'react-native-gesture-handler';

import { AppRegistry, SafeAreaView } from 'react-native';

import Routes from './src/services/Routes';
import {name as appName} from './app.json';

import { NavigationContainer } from '@react-navigation/native';
import { initializeFirebaseAPI } from './src/services/FirebaseAPI';

const wrappedRoutes = () => {
    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
                <Routes />
            </SafeAreaView>
        </NavigationContainer>
    );
};

AppRegistry.registerComponent(appName, () => {
    initializeFirebaseAPI();
    return wrappedRoutes
});