import React, {Component} from 'react';
import {View} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class Home extends Component  {
    constructor(props) {
        super(props);

    }
    render(): React.ReactNode {
        return <Container>
            <Header>
                <Body>
                    <Text>个人中心</Text>
                </Body>
            </Header>
        </Container>
    }
}