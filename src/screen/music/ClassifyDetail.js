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
import TopHoc from 'src/components/TopHoc/TopHoc';

class MusicClassifyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            classifyList: null,
            classifyDetail: null
        }
    }

    componentDidMount(): void {
        this.init();
    }

    async init() {
        await this.setState({
            data: this.props.navigation.getParam('item')
        });
        this.props.settingLoading(true);
        await Request(`tencent/songList?id=${this.state.data.dissid}&pageSize=100&page=0`).then(res => {
            console.log(res);
            this.setState({
                classifyDetail: res.data[0],
                classifyList: res.data[0].songlist
            })
        }).catch(err => {
            console.log(err);
        });
        this.props.settingLoading(false);
    }

    download (item) {
        this.props.musicDownload({
            id: item.mid,
            title: item.title,
            artist: item.singer[0].name,
            album: item.album.name
        })
    }

    play (item) {
        this.props.musicAdd({
            id: item.mid,
            title: item.title,
            artist: item.singer[0].name,
            album: item.album.name
        })
    }

    renderItem({item, index}) {
        return <ListItem>
            <Body>
            <Text>{item.title}</Text>
            <Text note>{item.singer[0].name} {item.album.name}</Text>
            </Body>
            <Right style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Icon type={'AntDesign'} name={'play'} style={{color: '#31c27c', fontSize: 28, marginRight: 10}}
                      onPress={this.play.bind(this,item)}
                />
                <Icon type={"AntDesign"} name={'clouddownload'} style={{color: '#31c27c', fontSize: 35}}
                      onPress={this.download.bind(this,item)}/>
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
                    <Text>歌单详情</Text>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    {this.state.data &&
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Image
                            source={{uri: this.state.data.imgurl}}
                            resizeMode={'cover'}
                            style={{
                                width: '100%',
                                height: 300,
                            }}
                        />
                        <Text style={{paddingTop: 10}}>{this.state.data.dissname}</Text>
                        <Text
                            style={{fontSize: 14, paddingTop: 5, paddingHorizontal: 5}}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                        >{this.state.classifyDetail && this.state.classifyDetail.desc}</Text>
                    </View>
                    }
                    <FlatList
                        data={this.state.classifyList}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>
            </Container>
        );
    }

}

export default TopHoc(MusicClassifyDetail)
const styles = StyleSheet.create({})