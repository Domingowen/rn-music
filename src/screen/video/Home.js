import React, {Component} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { SafeAreaView } from 'react-navigation';
export default class Home extends Component  {
    constructor(props) {
        super(props);

    }
    render(): React.ReactNode {
        return <Container>
            <Content contentContainerStyle={{flex:1, height: '100%'}}>
                <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} forceInset={{ bottom: 'never' }}>
                    <WebView
                        source={{uri: 'https://www.veligood88.com'}}
                        style={{width: '100%', height: '100%'}}
                        useWebKit={true}
                        thirdPartyCookiesEnabled={true}
                        startInLoadingState={true}
                    />
                </SafeAreaView>
            </Content>
        </Container>;
    }
}