import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
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
} from 'native-base';
// import TrackPlayer from 'react-native-track-player';
// import {connect} from 'react-redux';
import TopHoc from 'src/components/TopHoc/TopHoc';
// import {SettingMusicList, SettingPlayer, SettingPlayerStatus} from 'src/redux/actions/music';
// import * as Progress from 'react-native-progress';

function My(props) {
    const [topIconArr, setTopIconArr] = useState([
        {
            source: require('assets/music/music.svg'),
            title: '全部音乐'
        },
        {
            source: require('assets/music/recently.svg'),
            title: '最近播放'
        },
        {
            source: require('assets/music/love.svg'),
            title: '我喜欢'
        }
    ]);
    let searchHandle = () => {
        props.navigation.navigate('Search')
    };
    let navigationHandle = (index) => {
        switch (index) {
            case 0:
                props.navigation.navigate('AllMusic');
                break;
            case 1:
                props.navigation.navigate('RecentPlay');
                break;
            case 2:
                props.navigation.navigate('Like');
                break;
        }
    };
    return (
        <View style={{flex: 1}}>
            <TouchableOpacity activeOpacity={0.8} onPress={searchHandle}>
                <View style={styles.search}>
                    <Icon name="ios-search" style={{fontSize: 20, marginRight: 10, color: '#000'}}/>
                    <Text style={{color: '#000'}}>搜索</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.top}>
                {topIconArr.map((val, index) => {
                    return <View style={styles.content} key={index}>
                        <TouchableOpacity style={{alignItems: 'center'}}
                                          activeOpacity={0.7}
                                          onPress={() => {
                                              navigationHandle(index)
                                          }}
                        >
                            <SvgUri
                                width={'30'}
                                height={'30'}
                                source={val.source}
                            />
                            <Text style={{paddingTop: 10}}>{val.title}</Text>
                        </TouchableOpacity>
                    </View>
                })}
            </View>
        </View>
    )
}

// const mapStateToProps = state => ({
//     musicList: state.Music.musicList,
//     playerStatus: state.Music.playerStatus,
//     player: state.Music.player
// });
// const mapDispatchToProps = dispatch => ({
//     SettingPlayer: item => dispatch(SettingPlayer(item)),
//     SettingMusicList: item => dispatch(SettingMusicList(item)),
//     SettingPlayerStatus: item => dispatch(SettingPlayerStatus(item))
// });
export default TopHoc(My)
const styles = StyleSheet.create({
    search: {
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#f1f1f1'
    },
    top: {
        flexDirection: 'row',
        // width: '100%',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingTop: 20
    },
    content: {
        width: '33%',

    }
});