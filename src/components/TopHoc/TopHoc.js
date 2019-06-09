import React, {Component, useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import RNFS from 'react-native-fs'
import AsyncStorage from '@react-native-community/async-storage';
import { Toast, Spinner } from "native-base";
import {SettingMusicList, SettingPlayer, SettingHistory, SettingDownloadMusic} from 'src/redux/actions/music';
import store from 'src/redux/index';
// import MiniPlayer from 'src/components/MiniPlayer/MiniPlayer';

// import Request from 'src/common/request';
const baseUrl = "https://v1.itooi.cn/";
// const mapStateToProps = state => ({
//     Music: state.Music,
// });
// const mapDispatchToProps = dispatch => ({
//     SettingPlayer: (item) => dispatch(SettingPlayer(item)),
//     SettingMusicList: (item) => dispatch(SettingMusicList(item)),
//     SettingHistory: (item) => dispatch(SettingHistory(item)),
// });
// console.log(AppRoute);

const TopHoc = (Wrapper) => {
    class TopHocWrapper extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false
            }
        }
        componentDidMount(): void {
            this.init();
        }
        init () {
        }
        async add (item) { // 这个只有在在线搜索, 分类歌单，歌手详情 才会去调用的接口，本地的，缓存不调用该接口
            console.log(item);
            Toast.show({
                text: `${item.title}准备播放`,
                buttonText: "Okay",
            });
            let result = { // 添加音乐的初始数据组
                id: item.id, // sing id
                url: `${baseUrl}tencent/url?id=${item.id}&quality=128`, // online music play url
                title: item.title, // music title
                artist: item.artist, // music author
                artwork: `${baseUrl}tencent/pic?id=${item.id}`, // music picture
                album: item.album, // music album
            };

            await TrackPlayer.add({
                ...result
            });

            let queue = await TrackPlayer.getQueue();
            if(queue.length > 0) {
                await this.skip(item.id);
                await this.play();
            } else {
                await this.play();
            }
            Toast.show({
                text: `${item.title}开始播放`,
                buttonText: "Okay",
                duration: 2000
            });
            this.storageMusicToLocal({ // 保存状态到本地
                ...result,
                download: false,
                like: false,
            });
            let musicList = await store.getState().Music.musicList; // 音乐列表
            let checkStoreMusic = musicList.find((val, index) => {
                return val.id === item.id;
            });
            if(!checkStoreMusic) { // 判断是否存在
                store.dispatch(SettingMusicList({ // 保存到列表状态
                    ...result,
                    download: false,
                    like: false,
                }));
            }
            store.dispatch(SettingPlayer({ // 保存到播放状态
                ...result,
                download: false,
                like: false,
            }));
            let currentId = await TrackPlayer.getCurrentTrack();
            console.log(currentId);
            console.log(queue);
        }
        async play () {
            await TrackPlayer.play();
        }
        async pause () {
            await TrackPlayer.pause();
        }
        download (item, local) { // 下载到本地， 最近播放，我的喜欢都会有下载到本地的情况
            Toast.show({
                text: `${item.title}开始下载`,
                buttonText: "Okay",
            });
            let result = { // 添加音乐的初始数据组
                id: item.id, // sing id
                url: `${baseUrl}tencent/url?id=${item.id}&quality=128`, // online music play url
                title: item.title, // music title
                artist: item.artist, // music author
                artwork: `${baseUrl}tencent/pic?id=${item.id}`, // music picture
                album: item.album, // music album
            };
            let filePath = `${RNFS.DocumentDirectoryPath}/wehave/${((Math.random() * 1000) | 0)}.mp3`;
            // console.log(filePath);
            let res = RNFS.downloadFile({
                fromUrl: `${baseUrl}tencent/url?id=${result.id}&quality=128`,
                progress (data) {
                    // console.log(data)
                },
                toFile: filePath,
                background: true
            });
            res.promise.then(async res => {
                console.log(res);
                this.storageMusicToLocal({
                    ...result,
                    localPath: filePath,
                    download: true
                });
                let musicList = await store.getState().Music.musicList;
                let newMusicList = [];
                let isHaveMusic = musicList.find((val, index) => {
                    return val.id === result.id
                });
                if(isHaveMusic) {
                    newMusicList = musicList.filter((val, index) => {
                        if(val.id === result.id) {
                            val.download = true;
                            val.localPath = filePath;
                        }
                        return val;
                    })
                } else {
                    newMusicList = newMusicList.concat(musicList);
                    newMusicList.push({
                        ...result,
                        localPath: filePath,
                        download: true,
                        like: false
                    });
                }
                console.log(newMusicList);
                await store.dispatch(SettingDownloadMusic(newMusicList));
            });

        }

        likeMusic (item) {
            this.storageMusicToLocal(item)
        }
        /*
        * 本地保存音乐列表， 我喜欢，最近播放，全部音乐 共用本地数据列表,
        * */
        storageMusicToLocal (item) {
            storage.save({
                key: 'musicList',
                id: item.id,
                data: {
                    ...item,
                    localPath: item.download ? `${item.localPath}` : null, // local music play path
                    download: item.download ? true: false, // is download true false
                    like: item.like ? true : false, // is like music true false
                }
            });
        }
        remove () {

        }
        async skip(id) {
            await TrackPlayer.pause();
            await TrackPlayer.skip(id);
            await TrackPlayer.play();
            let position = await TrackPlayer.getPosition();
            let buffered = await TrackPlayer.getBufferedPosition();
            let duration = await TrackPlayer.getDuration();
            console.log(position);
            console.log(duration);
        }
        skipToNext () {
            TrackPlayer.skipToNext();
            TrackPlayer.play();
        }

        skipToPrevious() {
            TrackPlayer.skipToPrevious();
            TrackPlayer.play();
        }

        seekTo () {

        }
        settingLoading (isShow) {
            this.setState({
                loading: isShow
            })
        }
        render() {
            return (
                <View style={{flex: 1}}>
                    <Wrapper
                        {...this.props}
                        musicPlay={this.play.bind(this)}
                        musicPause={this.pause.bind(this)}
                        musicAdd={this.add.bind(this)}
                        musicSkip={this.skip.bind(this)}
                        musicSkipToNext={this.skipToNext.bind(this)}
                        musicSkipToPrevious={this.skipToPrevious.bind(this)}
                        musicDownload={this.download.bind(this)}
                        settingLoading={this.settingLoading.bind(this)}
                        musicLike={this.likeMusic.bind(this.item)}
                    />
                    {this.state.loading && <View style={{
                        flex: 1,
                        backgroundColor:'transparent',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10}}>
                        <Spinner color={'#000'}/>
                    </View>}
                </View>
            );
        }

    }
    return TopHocWrapper;
};
export default TopHoc