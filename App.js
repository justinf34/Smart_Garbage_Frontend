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
        garbage_class: null
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    sendGarbage(photo) {
        console.log('sendGarbage() called')
        url = "http://ec2-18-221-245-198.us-east-2.compute.amazonaws.com/predict:80";
        // data = JSON.stringify({ image: photo });
        response = fetch(url, {
            method: 'POST',
        }).then(data => {
            console.log(data)
        });

        this.setState({ garbage_class: response.answer })
        // console.log(garbage_class)
        // .then(data1 => {
        //     console.log("model says", data1.answer);
        //     this.setState({ garbage_class: data1.answer })
        // }).catch(error => {
        //     alert(error)
        //     this.setState({ garbage_class: null })
        // })
    }

    render() {
        const { hasCameraPermission } = this.state;
        const options = { quality: 1, exif: true, base64: true }
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {

            if (this.state.garbage_class == 0) {
                return (
                    <PreviewImg compost='Compostable' imageUri={this.state.photo.uri}></PreviewImg>
                );
            }
            else if (this.state.garbage_class == 1) {
                return (
                    <PreviewImg recycle='Recyclable' imageUri={this.state.photo.uri}></PreviewImg>
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
                                    if (this.camera) {
                                        let photo = await this.camera.takePictureAsync(options);
                                        this.sendGarbage(photo)
                                        this.setState({ photo })
                                    }
                                    setTimeout(() => {
                                        this.setState({ photo: null, garbage_class: null })
                                    }, 2000)
                                }}>
                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 28, marginBottom: 30, color: 'green' }}> Capture </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
