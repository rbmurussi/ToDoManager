import { createStackNavigator} from 'react-navigation';
import { Login, Register, ToDoTasks, DoneTasks } from '../screens/Screens';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
export const TaskTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="To Do" component={ToDoTasks} />
            <Tab.Screen name="Done" component={DoneTasks} />
        </Tab.Navigator>
    );
};