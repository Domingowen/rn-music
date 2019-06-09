import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
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

class MusicSingerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            list: null
        }
    }

    componentDidMount(): void {
        console.log(this.props);
        this.init();
    }

    async init() {
        await this.setState({
            data: this.props.navigation.getParam('item')
        });
        this.props.settingLoading(true);
        await this.loadData();
        this.props.settingLoading(false);
    }

    async loadData() {
        await Request(`tencent/song/artist?id=${this.state.data.singer_mid}&pageSize=100&page=0`).then(res => {
            console.log(res);
            this.setState({
                list: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }

    download(item) {
        this.props.musicDownload({
            id: item.musicData.songmid,
            title: item.musicData.songname,
            artist: item.musicData.singer[0].name,
            album: item.musicData.albumname
        }, false)
    }

    play(item) {
        this.props.musicAdd({
            id: item.musicData.songmid,
            title: item.musicData.songname,
            artist: item.musicData.singer[0].name,
            album: item.musicData.albumname
        })
    }

    renderItem({item, index}) {
        return <ListItem>
            <Body>
            <Text>{item.musicData.songname}</Text>
            <Text note>{item.musicData.singer[0].name} {item.musicData.albumname}</Text>
            </Body>
            <Right style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Icon type={'AntDesign'} name={'play'} style={{color: '#31c27c', fontSize: 28, marginRight: 10}} onPress={this.play.bind(this, item)}/>
                <Icon type={"AntDesign"} name={'clouddownload'} style={{color: '#31c27c', fontSize: 35}} onPress={this.download.bind(this, item)}/>
            </Right>
        </ListItem>
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
                    <Text>歌手详情</Text>
                    </Body>
                    <Right/>
                </Header>
                {this.state.data &&
                <Content>
                    <View style={{
                        alignItems: 'center',
                        paddingVertical: 20,
                        borderBottomColor: '#f1f1f1',
                        borderWidth: 1,
                        borderColor: 'transparent'
                    }}>
                        <Thumbnail large source={{uri: this.state.data.singer_pic}} style={{marginBottom: 10}}/>
                        <Text>{this.state.data.singer_name}</Text>
                    </View>
                    <FlatList
                        data={this.state.list}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>
                }

            </Container>
        )
    }
}

export default TopHoc(MusicSingerDetail);