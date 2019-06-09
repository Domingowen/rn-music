import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
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
import RNFS from 'react-native-fs'
import TopHoc from 'src/components/TopHoc/TopHoc';

class MusicDownloadMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }
    componentDidMount(): void {
        this.init();
    }
    async init () {
        let allMusicList = await storage.getAllDataForKey('allMusic');
        console.log(allMusicList);
        this.setState({
            list: allMusicList
        })
    }
    play (item) {
        this.props.musicAdd(item, true);
    }

    renderItems ({item, index}) {
        console.log(item);
        return <ListItem>
            <Body>
            <Text>{item.title}</Text>
            <Text note><Icon type={'AntDesign'} name={'checkcircle'} style={{color: '#31c27c', fontSize: 12}}/> {item.artist} {item.album}</Text>
            </Body>
            <Right>
                <Icon type={'AntDesign'} name={'playcircleo'} style={{color: '#31c27c', fontSize: 28, marginRight: 10}} onPress={this.play.bind(this, item)}/>
            </Right>
        </ListItem>
    }
    render(): React.ReactNode {
        return  <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body>
                <Text>下载音乐</Text>
                </Body>
                <Right/>
            </Header>
            <Content>
                <FlatList
                    data={this.state.list}
                    renderItem={this.renderItems.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </Content>
        </Container>;
    }

}
export default TopHoc(MusicDownloadMusic);