import TrackPlayer from 'react-native-track-player';
import store from 'src/redux/index';
console.log(store);
const MusicServices = async () => {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
    TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());
    TrackPlayer.addEventListener('remote-seek', (data) => {
        console.log(data.position);
        TrackPlayer.seekTo(data.position)
    });
    TrackPlayer.addEventListener('playback-queue-ended', (data) => {
        console.log(data);
        console.log('end')
    });
    TrackPlayer.addEventListener('playback-state', data => {
        console.log(data);
    });
    TrackPlayer.addEventListener('playback-track-changed', (trackData) => {
        console.log(trackData);
        console.log(TrackPlayer);
        // this.setAudioPlayerRate(this.audioPlayRate, (Platform.OS === 'ios' ? 2000 : 0))
    });
};
export default MusicServices;