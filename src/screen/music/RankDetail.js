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

class MusicRankDetail extends Component {
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

    init() {

    }

    download(item) {
        this.props.musicDownload({
            id: item.mid,
            title: item.title,
            artist: item.singer[0].name,
            album: item.album.name
        })
    }

    play(item) {
        this.props.musicAdd({
            id: item.mid,
            title: item.title,
            artist: item.singer[0].name,
            album: item.album.name
        })
    }

    renderItems({item, index}) {
        return <ListItem thumbnail>
            <Body>
            <Text>{item.title}</Text>
            <Text note numberOfLines={1}>{item.singerName}</Text>
            </Body>
            <Right style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Icon type={'AntDesign'} name={'play'} style={{color: '#31c27c', fontSize: 28, marginRight: 10}}
                      onPress={this.play.bind(this, item)}/>
                <Icon type={"AntDesign"} name={'clouddownload'} style={{color: '#31c27c', fontSize: 35}}
                      onPress={this.download.bind(this, item)}/>
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
                    <Text>{this.state.data && this.state.data.data.title}</Text>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    {this.state.data &&
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Image
                            source={{uri: this.state.data.data.headPicUrl}}
                            resizeMode={'cover'}
                            style={{
                                width: '100%',
                                height: 300,
                            }}
                        />
                    </View>
                    }
                    <FlatList
                        data={this.state.data && this.state.data.data.song.slice(0, 50)}
                        renderItem={this.renderItems.bind(this)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>
            </Container>
        );
    }

}

export default TopHoc(MusicRankDetail)
const styles = StyleSheet.create({})