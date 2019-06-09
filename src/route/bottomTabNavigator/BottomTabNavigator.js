import {createBottomTabNavigator} from 'react-navigation';
import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Music from 'src/route/stackNavigator/MusicStackNavigator.js';
import Video from 'src/screen/video/Home';
import Person from 'src/screen/person/Home';
import SvgUri from 'react-native-svg-uri';
const BottomTabNavigator = createBottomTabNavigator({
    music: {
        screen: Music,
        navigationOptions: {
            title: '音乐',
            tabBarLabel({focused, tintColor}) {
                // console.log(focused);
                // console.log(tintColor);
                return <View style={{alignItems: 'center'}}>
                    <SvgUri
                        width="25"
                        height="25"
                        source={require('src/assets/navigation/music.svg')}
                        fill={focused ? '#31c27c' : 'black'}
                    />
                    <Text style={{color: focused ? '#31c27c' : 'black', fontSize: 13, paddingTop: 2}}>音乐</Text>
                </View>
            }
        }
    }
    // video: {
    //     screen: Video,
    //     navigationOptions: {
    //         title: '视频',
    //         tabBarLabel({focused, tintColor}) {
    //             // console.log(focused);
    //             // console.log(tintColor);
    //             return <View style={{alignItems: 'center'}}>
    //                 <SvgUri
    //                     width="25"
    //                     height="25"
    //                     source={require('src/assets/navigation/video.svg')}
    //                     fill={focused ? '#31c27c' : 'black'}
    //                 />
    //                 <Text style={{color: focused ? '#31c27c' : 'black', fontSize: 13, paddingTop: 2}}>视频</Text>
    //             </View>
    //         }
    //     }
    // },
    // person: {
    //     screen: Person,
    //     navigationOptions: {
    //         title: '我的',
    //         tabBarLabel({focused,horizontal, tintColor}) {
    //             // console.log(focused);
    //             // console.log(tintColor);
    //             return <View style={{alignItems: 'center'}}>
    //                 <SvgUri
    //                     width="25"
    //                     height="25"
    //                     source={require('src/assets/navigation/center.svg')}
    //                     fill={focused ? '#31c27c' : 'black'}
    //                 />
    //                 <Text style={{color: focused ? '#31c27c' : 'black', fontSize: 13, paddingTop: 2}}>我的</Text>
    //             </View>
    //         }
    //     },
    // }
}, {
    initialRouteName: "music",
});
export default BottomTabNavigator;