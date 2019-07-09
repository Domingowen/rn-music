import React, { Component } from "react";
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
    Thumbnail,
    Card,
    CardItem
} from "native-base";
import Request from "src/common/request.js";
import TopHoc from "src/components/TopHoc/TopHoc";
class MusicRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rankList: []
        };
    }
    componentDidMount() {
        this.init();
    }
    async init() {
        this.props.settingLoading(true);
        await Request("tencent/topList?id=4")
            .then(async res => {
                console.log(res);
                let dataObject = {
                    title: "流行指数榜",
                    data: res.data
                };
                let list = [...this.state.rankList, dataObject];
                await this.setState({
                    rankList: list
                });
            })
            .catch(err => {
                console.log(err);
            });
        await Request("tencent/topList?id=27")
            .then(res => {
                let dataObject = {
                    title: "热门榜",
                    data: res.data
                };
                let list = [...this.state.rankList, dataObject];
                console.log(res);
                this.setState({
                    rankList: list
                });
            })
            .catch(err => {
                console.log(err);
            });
        await Request("tencent/topList?id=26")
            .then(res => {
                let dataObject = {
                    title: "新歌榜",
                    data: res.data
                };
                let list = [...this.state.rankList, dataObject];
                this.setState({
                    rankList: list
                });
            })
            .catch(err => {
                console.log(err);
            });
        console.log(this.state.rankList);
        this.props.settingLoading(false);
    }
    handleRankDetail(item) {
        console.log(111);
        this.props.navigation.navigate("RankDetail", {
            item: item
        });
    }
    renderItems = ({ item, index }) => {
        console.log(item);
        // return (
        // <Card bordered={true}>
        //     <CardItem>
        //         <Left>
        //             <Body>
        //                 <Text>{item.title}</Text>
        //                 <Text note numberOfLines={1}>
        //                     {item.intro}
        //                 </Text>
        //                 {/*<Text note>GeekyAnts</Text>*/}
        //             </Body>
        //         </Left>
        //     </CardItem>
        //     <CardItem
        //         cardBody
        //         button
        //         onPress={this.handleRankDetail.bind(this, item)}
        //     >
        //         <Image
        //             source={{ uri: item.headPicUrl }}
        //             style={{ height: 200, width: "100%", flex: 1 }}
        //         />
        //     </CardItem>
        // </Card>
        // );
    };
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>音乐排行榜</Text>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <FlatList
                        data={this.state.rankList}
                        renderItem={this.renderItems}
                        keyExtractor={(item, index) => index.toString()}
                        style={{
                            paddingHorizontal: 10
                        }}
                    />
                </Content>
            </Container>
        );
    }
}
export default TopHoc(MusicRank);
const styles = StyleSheet.create({});
