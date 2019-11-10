import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

export default class PreviewImg extends React.Component {
    render() {
        return (
            <View>
                <Image
                    style={{ width: '100%', height: '80%' }}
                    source={{ uri: this.props.imageUri }}>
                </Image>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}

                    onPress={() => {

                    }
                    }>
                </TouchableOpacity>
                <Text style={{textAlign:"center" ,fontWeight:"bold" , fontSize: 28, color: 'green' }}>Compost or not Compost </Text>
            </View >
        )
    }
}