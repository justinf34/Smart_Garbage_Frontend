import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {
    state = {
        hasCameraPermission: null,
        photo: null
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    // sayHello(input) {
    //     url = "https://ec2-18-221-245-198.us-east-2.compute.amazonaws.com";
    //     data = JSON.stringify({ image: input });
    //     fetch(url, data)
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log("Success", response)
    //             alert(response)
    //             return response
    //         })
    //         .catch(error => {
    //             console.log("upload error", error)
    //         });

    // }

    sayHello() {
        url = "http://ec2-18-221-245-198.us-east-2.compute.amazonaws.com:ad";
        data = JSON.stringify({ method: "POST", body: { image: "Hello" } });
        fetch(url, {
            method: 'POST',
            body: data
        })
    }


    render() {
        const { photo } = this.state
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={this.sayHello}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
