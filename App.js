/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { Root } from "native-base";
import React, { useState, useEffect, useCallback } from "react";
import { Platform, StyleSheet, Text, View, Alert, Linking } from "react-native";
import store from "src/redux/index";
import initMusic from "src/common/musicSetting";
import TrackPlayer from "react-native-track-player";
import Request from "src/common/request";
import AsyncStorage from "@react-native-community/async-storage";
import RNFS from "react-native-fs";
import ExitApp from "react-native-exit-app";
import Storage from "react-native-storage";
import { SettingMusicList } from "src/redux/actions/music";
import { Provider } from "react-redux";
import DeviceInfo from "react-native-device-info";
import TopHoc from "src/components/TopHoc/TopHoc";
import AppRoute from "src/route/index";
import MiniPlayer from "src/components/MiniPlayer/MiniPlayer";
import codePush from "react-native-code-push";
global.storage = new Storage({
    storageBackend: AsyncStorage,
    size: 1000,
    defaultExpires: null
});
// type Props = {};
let TopHocW = TopHoc(AppRoute);
function App(props) {
    // console.log(props);
    // const dispatch = useDispatch();
    // const settingMusicList = useCallback((item) => dispatch({type: SettingMusicList, item}), []); // 设置音乐列表到redux;
    // storage.clearMap();
    useEffect(() => {
        initMusic();
        checkSettingUpdate();
        createDocumentMusicFiles();
        initialMusicFilesToLocal();
        syncImmediate();
    }, []);
    let initialMusicFilesToLocal = async () => {
        let musicList = await storage.getAllDataForKey("musicList");
        // settingMusicList(musicList);
        console.log(musicList);
        console.log(RNFS.DocumentDirectoryPath);
        store.dispatch(SettingMusicList(musicList));
        let playerList = [];
        musicList.forEach((item, index) => {
            playerList.push({
                id: item.id,
                url: item.download ? `file://${item.localPath}` : `${item.url}`,
                title: item.title,
                artist: item.artist,
                artwork: `${item.artwork}`,
                album: item.album //专辑名字
            });
        });
        TrackPlayer.setupPlayer().then(res => {
            TrackPlayer.add(playerList);
        });
    };
    //如果有更新的提示
    let syncImmediate = () => {
        codePush
            .checkForUpdate()
            .then(res => {
                if (!res) {
                    console.log("不需要更新");
                } else {
                    if (res.failedInstall) {
                        codePush.clearUpdates();
                    }
                    codePush.sync(
                        {
                            //安装模式
                            //ON_NEXT_RESUME 下次恢复到前台时
                            //ON_NEXT_RESTART 下一次重启时
                            //IMMEDIATE 马上更新
                            installMode: codePush.InstallMode.IMMEDIATE,
                            //对话框
                            updateDialog: {
                                //是否显示更新描述
                                appendReleaseDescription: true,
                                //更新描述的前缀。 默认为"Description"
                                descriptionPrefix: "更新内容：",
                                //强制更新按钮文字，默认为continue
                                mandatoryContinueButtonLabel: "立即更新",
                                //强制更新时的信息. 默认为"An update is available that must be installed."
                                mandatoryUpdateMessage: "必须更新后才能使用",
                                //非强制更新时，按钮文字,默认为"ignore"
                                optionalIgnoreButtonLabel: "稍后",
                                //非强制更新时，确认按钮文字. 默认为"Install"
                                optionalInstallButtonLabel: "后台更新",
                                //非强制更新时，检查到更新的消息文本
                                optionalUpdateMessage: "有新版本了，是否更新？",
                                //Alert窗口的标题
                                title: "更新提示"
                            }
                        },
                        status => {
                            switch (status) {
                                case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                                    console.log("Checking for updates.");
                                    break;
                                case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                                    console.log("Downloading package.");
                                    break;
                                case codePush.SyncStatus.INSTALLING_UPDATE:
                                    console.log("Installing update.");
                                    break;
                                case codePush.SyncStatus.UP_TO_DATE:
                                    console.log("Up-to-date.");
                                    break;
                                case codePush.SyncStatus.UPDATE_INSTALLED:
                                    console.log("Update installed.");
                                    break;
                            }
                        },
                        downloadData => {
                            console.log(downloadData);
                        }
                    );
                }
            })
            .catch(err => {});
    };
    let createDocumentMusicFiles = () => {
        RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/wehave`).then(res => {
            console.log(`${RNFS.DocumentDirectoryPath}/wehave`);
            console.log("下载文件夹创建成功");
        });
        RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/wehaveCache`).then(res => {
            console.log(`${RNFS.DocumentDirectoryPath}/wehaveCache`);
            console.log("文件夹创建成功");
        });
    };
    let checkSettingUpdate = () => {
        const DeviceVersion = DeviceInfo.getVersion();
        Request(
            "https://easy-mock.com/mock/5ce8ae47c7090e496caae399/music/setting"
        )
            .then(async res => {
                console.log(res);
                if (DeviceVersion !== res.data.version) {
                    Alert.alert(
                        "请下载音乐包最新版本，点击确定将会直接下载，关闭将会退出APP",
                        null,
                        [
                            {
                                text: "确定",
                                onPress: async () => {
                                    console.log(res.data.appDownloadUrl);
                                    await Linking.canOpenURL(
                                        res.data.appDownloadUrl
                                    )
                                        .then(supported => {
                                            if (!supported) {
                                                console.log(
                                                    "Can't handle url: " + url
                                                );
                                            } else {
                                                return Linking.openURL(
                                                    res.data.appDownloadUrl
                                                );
                                            }
                                        })
                                        .catch(err =>
                                            console.error(
                                                "An error occurred",
                                                err
                                            )
                                        );
                                    await ExitApp.exitApp();
                                }
                            },
                            {
                                text: "取消",
                                onPress: () => ExitApp.exitApp(),
                                style: "cancel"
                            }
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch(err => {
                // Alert.alert(
                //     "网络问题，APP将会自动关闭重新打开",
                //     null,
                //     [
                //         { text: "确定", onPress: () => ExitApp.exitApp() },
                //         {
                //             text: "取消",
                //             onPress: () => ExitApp.exitApp(),
                //             style: "cancel"
                //         }
                //     ],
                //     { cancelable: false }
                // );
                console.log(err);
            });
    };
    console.log(store);
    // console.log(store);
    return (
        <Provider store={store}>
            <Root>
                <TopHocW />
            </Root>
            <MiniPlayer />
        </Provider>
    );
}
const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.MANUAL
};
export default codePush(codePushOptions)(App);
