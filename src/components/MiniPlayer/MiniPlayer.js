import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
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
import TrackPlayer from "react-native-track-player";
import {
    SettingMusicList,
    SettingPlayer,
    SettingPlayerStatus
} from "src/redux/actions/music";
import { connect } from "react-redux";
// import ProgressCircle from "react-native-progress/Circle";
import * as Progress from "react-native-progress";

function MiniPlayer(props) {
    // console.log(props, 'miniPlayer');
    const [playStatus, setPlayStatus] = useState(false); // true pause icon false play icon
    const [loop, setLoop] = useState(false); // true single loop false list loop
    const [playProgress, setPlayProgress] = useState(0);
    // console.log(TrackPlayer.getState());
    TrackPlayer.addEventListener("playback-queue-ended", async data => {
        // console.log(data);
        checkingMusicPlayStatus();
    });
    TrackPlayer.addEventListener("playback-state", data => {
        console.log(data, "state");
    });
    TrackPlayer.addEventListener("playback-track-changed", trackData => {
        console.log(trackData, "track-changed");
        // console.log(TrackPlayer);
        // this.setAudioPlayerRate(this.audioPlayRate, (Platform.OS === 'ios' ? 2000 : 0))
    });
    useEffect(() => {
        // console.log(playStatus);
        if (playStatus) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
        if (loop) {
            props.SettingPlayerStatus({
                loop: 0
            });
        } else {
            props.SettingPlayerStatus({
                loop: 1
            });
        }
    }, [playStatus, loop]);
    useEffect(() => {
        if (props.player) {
            setPlayStatus(true);
        }
        console.log(props.player);
    }, [props.player]);
    let playStatusHandle = () => {
        setPlayStatus(!playStatus);
    };

    let timer = null;
    let progressSetInterval = async () => {
        clearInterval(timer);
        let singDuration = Math.floor(await TrackPlayer.getDuration());

        if (props.player) {
            timer = setInterval(async () => {
                let singPosition = Math.floor(await TrackPlayer.getPosition());
                // console.log(singPosition);
                // console.log(singDuration);
                let currentPosition = singPosition / singDuration;
                // console.log(currentPosition);
                setPlayProgress(Number(currentPosition));
                if (singPosition === singDuration) {
                    checkingMusicPlayStatus();
                }
            }, 1000);
        }
    };
    useEffect(() => {
        progressSetInterval();
        return () => {
            clearInterval(timer);
            timer = null;
        };
    }, [playProgress, props.player]);
    // console.log(playProgress);
    async function settingMusicLoop() {
        setLoop(!loop);
    }

    async function checkingMusicPlayStatus() {
        switch (props.playerStatus.loop) {
            case 0: // 单曲循环
                TrackPlayer.seekTo(0);
                break;
            case 1: // 列表循环
                let musicQueue = await TrackPlayer.getQueue();
                if (props.player.id === musicQueue[musicQueue.length - 1].id) {
                    TrackPlayer.skip(musicQueue[0].id);
                }
                TrackPlayer.play();
                break;
            default:
                break;
        }
    }
    return (
        <View style={miniPlayer.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%"
                }}
            >
                {props.player && (
                    <View
                        style={{
                            borderRadius: 50,
                            width: 50,
                            height: 50,
                            overflow: "hidden"
                        }}
                    >
                        <Image
                            source={{ uri: props.player.artwork }}
                            style={{ width: 50, height: 50 }}
                            resizeMode={"contain"}
                        />
                    </View>
                )}
                <View style={{ paddingLeft: 10 }}>
                    <Text>
                        {props.player
                            ? props.player.title
                            : "free音乐，听见不同"}
                    </Text>
                    {props.player && <Text>{props.player.artist}</Text>}
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => settingMusicLoop()}>
                    {loop ? ( // true single cycle
                        // false list loop
                        <Icon
                            type={"MaterialIcons"}
                            name={"repeat-one"}
                            style={{ color: "#31c27c", fontSize: 24 }}
                        />
                    ) : (
                        <Icon
                            type={"MaterialIcons"}
                            name={"repeat"}
                            style={{ color: "#31c27c", fontSize: 24 }}
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={{
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => playStatusHandle()}
                    activeOpacity={0.8}
                >
                    <Progress.Circle
                        size={40}
                        progress={playProgress}
                        indeterminate={false}
                        borderWidth={1}
                        borderColor={"#31c27c"}
                        color={"#31c27c"}
                    />
                    {playStatus ? (
                        <Icon
                            type={"AntDesign"}
                            name={"pause"}
                            style={{
                                color: "#31c27c",
                                fontSize: 24,
                                position: "absolute",
                                top: 8
                            }}
                        />
                    ) : (
                        <Icon
                            type={"AntDesign"}
                            name={"caretright"}
                            style={{
                                color: "#31c27c",
                                fontSize: 24,
                                position: "absolute",
                                top: 8
                            }}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
const mapStateToProps = state => ({
    playerStatus: state.Music.playerStatus,
    player: state.Music.player
});
const mapDispatchToProps = dispatch => ({
    SettingPlayer: item => dispatch(SettingPlayer(item)),
    SettingPlayerStatus: item => dispatch(SettingPlayerStatus(item))
});
const miniPlayer = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: 80,
        backgroundColor: "#fff",
        borderTopColor: "#f1f1f1",
        borderWidth: 1,
        borderColor: "transparent",
        alignItems: "center",
        paddingHorizontal: 10,
        zIndex: 100
        // paddingBottom: 20
        // paddingTop:20,
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniPlayer);
