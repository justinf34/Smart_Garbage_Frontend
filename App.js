import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Preview from './christian/components/Preview';
import PreviewImg from './christian/components/Preview';
import { bold } from 'ansi-colors';

export default class GarbageCam extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photo: null,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }


    sendGarbage() {
        url = "http://ec2-18-221-245-198.us-east-2.compute.amazonaws.com/predict";
        data = JSON.stringify({ method: "POST", body: { image: "Hello" } });
        fetch(url, {
            method: 'POST',
            body: data
        });
    }


    render() {
        const { photo } = this.state
        const { hasCameraPermission } = this.state;
        const options = { quality: 1, exif: true }
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {

            if (this.state.photo) {
                console.log(this.state.photo)
                return (
                    <PreviewImg imageUri={this.state.photo.uri}></PreviewImg>
                );
            }

            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type}
                        ref={ref => {
                            this.camera = ref;
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={async () => {
                                    this.sendGarbage();
                                    if (this.camera) {
                                        let photo = await this.camera.takePictureAsync(options);
                                        this.setState({ photo })
                                    }
                                    setTimeout(() => {
                                        this.setState({ photo: null })
                                    }, 2000)
                                }}>
                               <Text style={{textAlign:"center" ,fontWeight:"bold" , fontSize: 28, marginBottom: 30, color: 'green' }}> Capture </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
