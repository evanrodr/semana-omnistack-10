import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function SignUp({ navigation }) {
    return <WebView style={{ flex: 1 }} source={{ uri: 'http://192.168.25.17:3000/' }} />
}

export default SignUp;