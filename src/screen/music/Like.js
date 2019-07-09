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
function MusicLike(props) {
    const [list, setList] = useState([]);
    async function init() {
        let likeMusicList = await storage.getAllDataForKey("musicList");
        console.log(likeMusicList);
        this.setState({
            list: likeMusicList
        });
    }
    function play() {
        props.musicAdd(item);
    }
    function renderItems({ item, index }) {
        console.log(item);
        return (
            <ListItem>
                <Body>
                    <Text>{item.title}</Text>
                    <Text note>
                        <Icon
                            type={"AntDesign"}
                            name={"checkcircle"}
                            style={{ color: "#31c27c", fontSize: 12 }}
                        />{" "}
                        {item.artist} {item.album}
                    </Text>
                </Body>
                <Right>
                    <Icon
                        type={"AntDesign"}
                        name={"playcircleo"}
                        style={{
                            color: "#31c27c",
                            fontSize: 28,
                            marginRight: 10
                        }}
                        onPress={play(item)}
                    />
                </Right>
            </ListItem>
        );
    }
    function emptyItem() {
        return (
            <View
                style={{
                    flex: 1,
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
                    <Text>我的喜欢</Text>
                </Body>
                <Right />
            </Header>
            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center"
                }}
                style={{ flex: 1, height: "100%" }}
                data={list}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={emptyItem}
            />
        </Container>
    );
}
export default TopHoc(MusicLike);
