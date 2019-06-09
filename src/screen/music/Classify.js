import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Input,
    Item,
    ListItem,
    List,
    Thumbnail
} from 'native-base';
import Request from 'src/common/request.js';
import TopHoc from 'src/components/TopHoc/TopHoc';
class MusicClassify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }

    }
    componentDidMount(): void {
        this.setState({
            data: this.props.navigation.getParam('item')
        });

    }
    init () {

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>分类歌单</Text>
                    </Body>
                    <Right/>
                </Header>
            </Container>
        );
    }

}
export default TopHoc(MusicClassify)
const styles = StyleSheet.create({

})