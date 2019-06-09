import {createStackNavigator} from 'react-navigation';
import MusicHome from 'src/screen/music/Home';
import MusicHistory from 'src/screen/music/History';
import MusicPlayer from 'src/screen/music/Player';
import MusicSearch from 'src/screen/music/Search';
import MusicSinger from 'src/screen/music/Singer';
import MusicSingerDetail from 'src/screen/music/SingerDetail';
import MusicClassify from 'src/screen/music/Classify';
import MusicClassifyDetail from 'src/screen/music/ClassifyDetail';
import MusicRank from 'src/screen/music/Rank';
import MusicRankDetail from 'src/screen/music/RankDetail';
import MusicAllMusic from 'src/screen/music/AllMusic.js';
import MusicRecentPlay from 'src/screen/music/RecentPlay.js';
// import MusicDownloadMusic from 'src/screen/music/DownloadMusic.js';
import MusicLike from 'src/screen/music/Like.js';
const MusicStackNavigator = createStackNavigator({
    Home: {
        screen: MusicHome
    },
    History: {
        screen: MusicHistory
    },
    Player: {
        screen: MusicPlayer
    },
    Search: {
        screen: MusicSearch
    },
    Singer: {
        screen: MusicSinger
    },
    SingerDetail: {
        screen: MusicSingerDetail
    },
    Classify: {
        screen: MusicClassify
    },
    ClassifyDetail: {
        screen: MusicClassifyDetail
    },
    Rank: {
        screen: MusicRank
    },
    RankDetail: {
        screen: MusicRankDetail
    },
    AllMusic: {
        screen: MusicAllMusic
    },
    RecentPlay: {
        screen: MusicRecentPlay
    },
    // DownloadMusic: {
    //     screen: MusicDownloadMusic
    // },
    Like: {
        screen: MusicLike
    }


}, {
    initialRouteName: 'Home',
    headerMode: 'none'
});
export default MusicStackNavigator;