import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image
} from "react-native";
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
} from "native-base";
import Request from "src/common/request.js";
import TopHoc from "src/components/TopHoc/TopHoc";
import { connect } from "react-redux";
import {
    SettingMusicList,
    SettingPlayer,
    SettingPlayerStatus
} from "src/redux/actions/music";
function MusicRecentPlay(props) {
    console.log(props);
    const [list, setList] = useState([]);
    async function init() {
        let player = props.player;
        let list = props.musicList;
        let newList =
            list &&
            list.filter((val, index) => {
                if (player) {
                    console.log(val);
                    val.play = val.id === player.id;
                }
                return val;
            });
        setList(newList);
    }
    useEffect(() => {
        init();
    }, [props.musicList, props.player]);
    console.log(list);
    function play(item) {
        props.SettingPlayer({
            ...item,
            play: true
        });
        props.musicSkip(item.id);
    }
    async function download(item) {
        await props.musicDownload(item, true);
    }

    function renderItems({ item, index }) {
        // console.log(item);
        return (
            <ListItem onPress={() => play(item)}>
                <Body>
                    <Text style={{ color: item.play ? "#31c27c" : "#000" }}>
                        {item.title}
                    </Text>
                    <Text
                        note
                        style={{ color: item.play ? "#31c27c" : "#000" }}
                    >
                        {item.download && (
                            <Icon
                                type={"AntDesign"}
                                name={"checkcircle"}
                                style={{ color: "#31c27c", fontSize: 12 }}
                            />
                        )}
                        {item.artist} {item.album}
                    </Text>
                </Body>
                <Right
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}
                >
                    {!item.download && (
                        <Icon
                            type={"AntDesign"}
                            name={"clouddownload"}
                            style={{ color: "#31c27c", fontSize: 35 }}
                            onPress={() => download(item)}
                        />
                    )}
                </Right>
            </ListItem>
        );
    }
    function emptyItem() {
        return (
            <View
                style={{
                    height: 400,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text>最近没有播放过音乐</Text>
            </View>
        );
    }
    return (
        <Container>
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => props.navigation.goBack()}
                    >
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Text>最近播放</Text>
                </Body>
                <Right />
            </Header>
            <FlatList
                // contentContainerStyle={{flex: 1,}}
                // style={{flex: 1, height: '100%'}}
                data={list}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={emptyItem}
            />
        </Container>
    );
}
const mapStateToProps = state => ({
    musicList: state.Music.musicList,
    playerStatus: state.Music.playerStatus,
    player: state.Music.player
});
const mapDispatchToProps = dispatch => ({
    SettingPlayer: item => dispatch(SettingPlayer(item)),
    SettingMusicList: item => dispatch(SettingMusicList(item)),
    SettingPlayerStatus: item => dispatch(SettingPlayerStatus(item))
});
export default TopHoc(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MusicRecentPlay)
);
