import React, {Component, useState, useEffect, useCallback} from 'react';
import {View, Dimensions, Alert, Linking} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';
import RNFS from 'react-native-fs';
import {SafeAreaView} from 'react-navigation';
import TrackPlayer from 'react-native-track-player';
import TopHoc from 'src/components/TopHoc/TopHoc';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Find from 'src/screen/music/homeChildren/Find';
import My from 'src/screen/music/homeChildren/My';
import Request from 'src/common/request';
import AsyncStorage from "@react-native-community/async-storage";
import ExitApp from "react-native-exit-app";
import ReactNativeSideMenu from 'react-native-side-menu';
import Menu from 'src/screen/music/Menu';
import {Provider} from "react-redux";
import MiniPlayer from "../../../App";

export default function MusicHome(props) {
    console.log(props);
    const [tabViewIndex, setTabView] = useState(0);
    const [tabViewSourceMap, setTabViewSourceMap] = useState([
        {key: 'music', title: '音乐'},
        {key: 'find', title: '推荐'},
    ]);

    const menu = <Menu navigator={navigator}/>;
    return (
        <ReactNativeSideMenu menu={menu}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#31c27c'}} forceInset={{bottom: 'never'}}>
                <TabView
                    style={{backgroundColor: '#fff'}}
                    navigationState={{
                        index: tabViewIndex,
                        routes: tabViewSourceMap
                    }}
                    renderScene={({route}) => {
                        switch (route.key) {
                            case 'music':
                                return <My navigation={props.navigation}/>;
                            case 'find':
                                return <Find navigation={props.navigation}/>;
                            default:
                                return null;
                        }
                    }}
                    onIndexChange={index => setTabView(index)}
                    initialLayout={{width: Dimensions.get('window').width}}
                    renderTabBar={(props) => {
                        return <TabBar
                            {...props}
                            indicatorStyle={{backgroundColor: 'transparent'}}
                            style={{backgroundColor: '#31c27c'}}
                            renderLabel={({route, focused, color}) => {
                                return <Text style={{
                                    color: focused ? '#fff' : '#f8f8f8',
                                    fontWeight: focused ? '900' : null,
                                    fontSize: 18
                                }}>
                                    {route.title}
                                </Text>
                            }}
                        />
                    }}
                />
            </SafeAreaView>
        </ReactNativeSideMenu>

    );
}
