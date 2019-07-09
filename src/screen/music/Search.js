import React, { Component } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";
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
    List
} from "native-base";
import Request from "src/common/request";
import TopHoc from "src/components/TopHoc/TopHoc";
class MusicSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            resultList: null,
            resultNumber: 0,
            resultType: "song"
        };
    }
    componentDidMount() {
        console.log(this.props);
    }
    async search() {
        this.props.settingLoading(true);
        await Request(
            `tencent/search?keyword=${this.state.searchText}&type=${
                this.state.resultType
            }&pageSize=50&page=${this.state.resultNumber}`
        ).then(res => {
            console.log(res);
            this.setState({
                resultList: res.data.list
            });
        });
        this.props.settingLoading(false);
    }
    pullUpLoad() {}
    selectHandle(item) {
        console.log(item);
        this.props.musicAdd({
            id: item.songmid,
            title: item.songname,
            artist: item.singer[0].name,
            album: item.albumname
        });
    }
    renderItem = ({ item, index }) => {
        return (
            <ListItem onPress={this.selectHandle.bind(this, item)}>
                <Body>
                    <Text numberOfLines={1} ellipsizeMode={"tail"}>
                        {item.songname}
                    </Text>
                    <Text note numberOfLines={1} ellipsizeMode={"tail"}>
                        {item.singer[0].name} — {item.albumname}
                    </Text>
                </Body>
                <Right />
            </ListItem>
        );
    };
    returnBack() {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <SafeAreaView
                style={{ backgroundColor: "#31c27c", height: 40, flex: 1 }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 40
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#2BAA6D",
                            height: 30,
                            width: "87%",
                            paddingLeft: 5,
                            marginLeft: 5
                        }}
                    >
                        <Input
                            placeholder="搜索歌手，歌名，歌词"
                            placeholderTextColor={"#fff"}
                            style={{ color: "#fff" }}
                            returnKeyType={"search"}
                            value={this.state.searchText}
                            onChangeText={val =>
                                this.setState({ searchText: val })
                            }
                            autoFocus={true}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            onSubmitEditing={this.search.bind(this)}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ paddingRight: 5 }}
                        onPress={this.returnBack.bind(this)}
                    >
                        <Text style={{ color: "#fff" }}>取消</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        height: "100%",
                        backgroundColor: "#fff"
                    }}
                >
                    <FlatList
                        // style={{flex: 1, height: '100%'}}
                        data={this.state.resultList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        removeClippedSubviews={true}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
export default TopHoc(MusicSearch);
