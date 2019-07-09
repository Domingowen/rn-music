/*
 *
 * 全部音乐
 * */

import React, { Component, useState, useEffect } from "react";
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
import RNFS from "react-native-fs";
import { connect } from "react-redux";
import {
    SettingMusicList,
    SettingPlayer,
    SettingPlayerStatus
} from "src/redux/actions/music";

function MusicAllMusic(props) {
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
                return val.download && val;
            });
        setList(newList);
    }
    useEffect(() => {
        init();
    }, [props.player, props.musicList]);
    console.log(list);
    function play(item) {
        props.SettingPlayer({
            ...item,
            play: true
        });
        props.musicSkip(item.id);
    }
    function renderItems({ item, index }) {
        return (
            item.download && (
                <ListItem onPress={() => play(item)}>
                    <Body>
                        <Text style={{ color: item.play ? "#31c27c" : "#000" }}>
                            {item.title}
                        </Text>
                        <Text
                            note
                            style={{ color: item.play ? "#31c27c" : "#000" }}
                        >
                            {" "}
                            <Icon
                                type={"AntDesign"}
                                name={"checkcircle"}
                                style={{ color: "#31c27c", fontSize: 12 }}
                            />
                            {item.artist} {item.album}
                        </Text>
                    </Body>
                    {/*<Right>*/}
                    {/*<Icon type={'AntDesign'} name={'play'} style={{color: '#31c27c', fontSize: 28, marginRight: 10}}*/}
                    {/*onPress={() => play(item)}/>*/}
                    {/*</Right>*/}
                </ListItem>
            )
        );
    }

    function emptyItem() {
        return (
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 400
                    // backgroundColor: 'red'
                }}
            >
                <Text>当前本地没有任何音乐哦</Text>
            </View>
        );
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                    >
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Text>全部歌曲</Text>
                </Body>
                <Right />
            </Header>
            <FlatList
                // contentContainerStyle={{flexGrow: 1, height: '100%'}}
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
    )(MusicAllMusic)
);
