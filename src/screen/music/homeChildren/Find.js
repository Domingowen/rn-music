import React, { Component, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image
} from "react-native";
import SvgUri from "react-native-svg-uri";
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
    Item,
    Input
} from "native-base";
import Request from "../../../common/request";
// import {useNavigation} from "react-navigation-hooks";

export default function Find(props) {
    const [topHeaderIconArr, setTopHeaderIconArr] = useState([
        {
            source: require("src/assets/music/singer.svg"),
            title: "歌手"
        },
        {
            source: require("src/assets/music/ranking.svg"),
            title: "排行"
        },
        {
            source: require("src/assets/music/classify.svg"),
            title: "分类歌单"
        }
    ]);
    const [data, setData] = useState({
        hot: null,
        singer: null
    });

    useEffect(() => {
        const init = async () => {
            /*热门歌单*/
            await Request("tencent/songList/hot?cat=全部&pageSize=11&page=0")
                .then(res => {
                    setData(prevState => ({
                        ...prevState,
                        hot: res.data.list
                    }));
                })
                .catch(err => {
                    console.log(err);
                });
            /*热门歌手*/
            await Request(
                "tencent/artist/list?sexId=-100&areaId=-100&genre=-100&index=-100&page=0&pageSize=30"
            )
                .then(res => {
                    setData(prevState => ({
                        ...prevState,
                        singer: res.data
                    }));
                })
                .catch(err => {
                    console.log(err);
                });
        };
        init();
    }, []);
    console.log(data);
    let headerNavigator = index => {
        switch (index) {
            case 0:
                props.navigation.navigate("Singer");
                break;
            case 1:
                props.navigation.navigate("Rank");
                break;
            case 2:
                props.navigation.navigate("Classify");
                break;
            default:
                break;
        }
    };
    let search = () => {
        props.navigation.navigate("Search");
    };

    let singerDetail = item => {
        //歌手详情
        props.navigation.navigate("SingerDetail", {
            item: item
        });
    };

    let classifyDetail = item => {
        // 歌单详情
        props.navigation.navigate("ClassifyDetail", {
            item: item
        });
    };
    let renderHotItem = () => {
        // 热门歌单
        return (
            data.hot && (
                <View>
                    <View>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 20,
                                paddingBottom: 20,
                                letterSpacing: 5
                            }}
                        >
                            为你推荐的歌单
                        </Text>
                    </View>
                    <View
                        style={{
                            flexWrap: "wrap",
                            flexDirection: "row",
                            paddingBottom: 20
                        }}
                    >
                        {data.hot.map((val, index) => {
                            // console.log(val);
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    key={index}
                                    onPress={() => classifyDetail(val)}
                                    style={{ marginBottom: 10, width: "33%" }}
                                >
                                    <View style={styles.hotItem}>
                                        <Image
                                            style={{
                                                width: 120,
                                                height: 120
                                            }}
                                            // resizeMode={'contain'}
                                            source={{ uri: val.imgurl }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                paddingTop: 10
                                            }}
                                        >
                                            {val.dissname}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )
        );
    };
    let renderSingerItem = () => {
        // 热门歌手
        return (
            data.singer && (
                <View>
                    <View>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 20,
                                paddingBottom: 20,
                                letterSpacing: 5
                            }}
                        >
                            你会喜欢的歌手
                        </Text>
                    </View>
                    <View
                        style={{
                            flexWrap: "wrap",
                            flexDirection: "row"
                            // paddingBottom: 20
                        }}
                    >
                        {data.singer.slice(0, 12).map((val, index) => {
                            // console.log(val);
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    key={index}
                                    onPress={() => singerDetail(val)}
                                    style={{ marginBottom: 10, width: "33%" }}
                                >
                                    <View style={styles.hotItem}>
                                        <Image
                                            style={{
                                                width: 120,
                                                height: 120
                                            }}
                                            // resizeMode={'contain'}
                                            source={{ uri: val.singer_pic }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                paddingTop: 10
                                            }}
                                        >
                                            {val.singer_name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )
        );
    };

    let renderHeader = () => {
        // 头部
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 20,
                    marginBottom: 20
                }}
            >
                {topHeaderIconArr.map((val, index) => {
                    return (
                        <View key={index} style={{ width: "33%" }}>
                            <TouchableOpacity
                                style={{ alignItems: "center", width: "100%" }}
                                activeOpacity={0.6}
                                onPress={() => headerNavigator(index)}
                            >
                                <SvgUri
                                    width={"30"}
                                    height={"30"}
                                    source={val.source}
                                    // fill={'#31c27c'}
                                />
                                <Text style={{ paddingTop: 5 }}>
                                    {val.title}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <Container style={{ marginBottom: 40 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => search()}>
                <View style={styles.search}>
                    <Icon
                        name="ios-search"
                        style={{ fontSize: 20, marginRight: 10, color: "#000" }}
                    />
                    <Text style={{ color: "#000" }}>搜索</Text>
                </View>
            </TouchableOpacity>
            <ScrollView>
                {/* <View style={{ marginBottom: 20 }}></View> */}
                {renderHeader()}
                {renderHotItem()}
                {renderSingerItem()}
            </ScrollView>
        </Container>
    );
}
const styles = StyleSheet.create({
    search: {
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        height: 40,
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "#f1f1f1"
    },
    hotItem: {
        alignItems: "center"
        // justifyContent: 'center'
        // height: 60
    }
});
