import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

export default class TrashType extends Component {
    render() {
        return (
            <View style={styles.trashtype_container}>
                <Text style={styles.red}></Text>
            </View>
        );
    }
}