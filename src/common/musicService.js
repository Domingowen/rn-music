import TrackPlayer from 'react-native-track-player';
import store from 'src/redux/index';
console.log(store);
const MusicServices = async () => {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-next', (data) => {
        console.log(data);
        TrackPlayer.skipToNext()
    });
    TrackPlayer.addEventListener('remote-previous', (data) => {
        console.log(data);
        TrackPlayer.skipToPrevious()
    });
    TrackPlayer.addEventListener('remote-seek', (data) => {
        console.log(data.position);
        TrackPlayer.seekTo(data.position)
    });
};
export default MusicServices;