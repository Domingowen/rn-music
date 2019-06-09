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

class MusicSinger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectList: null,
            area: -100,
            genre: -100,
            sex: -100,
            index: -100,
            listSinger: null
        }
    }

    componentDidMount(): void {
        this.init();
    }

    async init() {
        this.props.settingLoading(true);
        await Request('tencent/artist/category').then(res => {
            console.log(res);
            this.setState({
                selectList: res.data
            })
        }).catch(res => {
            console.log(res);
        });
        await this.loadSingerData();
        this.props.settingLoading(false);
    }
    async loadSingerData () {
        await Request(`tencent/artist/list?sexId=${this.state.sex}&areaId=${this.state.area}&genre=${this.state.genre}&index=${this.state.index}&page=0&pageSize=30`).then(res => {
            console.log(res);
            this.setState({
                listSinger: res.data
            })
        }).catch(res => {
            console.log(res);
        });
    }

    async handleSelect(val, type) {
        switch (type) {
            case 'area':
                await this.setState({
                    area: val.id
                });
                break;
            case 'genre':
                await this.setState({
                    genre: val.id
                });
                break;
            case 'sex':
                await this.setState({
                    sex: val.id
                });
                break;
            case 'index':
                await this.setState({
                    index: val.id
                });
                break;
            default:
                break;
        }
        this.props.settingLoading(true);
        await this.loadSingerData();
        this.props.settingLoading(false);
    }
    handleSingerDetail (item) {
        this.props.navigation.navigate('SingerDetail', {
            item: item
        })
    }

    selectScroll(data, type) {
        return <View>
            <ScrollView
                horizontal={true}
                // showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{height: 40}}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
            >
                {data && data.map((val, index) => {
                    return <TouchableOpacity activeOpacity={0.8}
                                             onPress={this.handleSelect.bind(this, val, type)}
                                             key={index}
                                             style={{width: 50, alignItems: 'center'}}
                    >
                        <Text style={{color: this.state[type] === val.id ? '#31c27c' : '#000'}}>{val.name}</Text>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    }
    renderItems ({item, index}) {
        return <ListItem thumbnail key={index}
                         style={{marginBottom: 10}}
                         onPress={this.handleSingerDetail.bind(this,item)}>
            <Left>
                <Thumbnail source={{ uri: item.singer_pic }} />
            </Left>
            <Body>
            <Text>{item.singer_name}</Text>
            </Body>
        </ListItem>
    }
    render(): React.ReactNode {
        return <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                <Text>歌手</Text>
                </Body>
                <Right/>
            </Header>
            <Content>
                <View style={{borderBottomColor: '#f1f1f1', borderWidth: 1, borderColor: 'transparent', marginBottom: 20}}>
                    {this.state.selectList && this.selectScroll(this.state.selectList.area, 'area')}
                    {this.state.selectList && this.selectScroll(this.state.selectList.genre, 'genre')}
                    {this.state.selectList && this.selectScroll(this.state.selectList.sex, 'sex')}
                    {this.state.selectList && this.selectScroll(this.state.selectList.index, 'index')}
                </View>
                <FlatList
                    data={this.state.listSinger}
                    renderItem={this.renderItems.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </Content>
        </Container>;
    }
}

export default TopHoc(MusicSinger);