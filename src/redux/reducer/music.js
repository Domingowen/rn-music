import {combineReducers} from 'redux'
import {
    HISTORY,
    SEARCH,
    PLAYER,
    MUSICLIST,
    PLAYERSTATUS,
    DOWNLOADMUSIC
} from '../actions/music';
const initial = {
    history: [],
    search: [],
    player: null,
    musicList: [],
    playerStatus: {
        time: null,
        currentTime: null,
        loop: 0, // 0 单曲循环， 1 列表循环
    }
};
const Music = (state = initial, action) => {
    console.log(action);
    switch (action.type) {
        case HISTORY:
            return state;
        case SEARCH:
            return state;
        case PLAYER:
            state = {
                ...state,
                player: action.item
            };
            return state;
        case MUSICLIST:
            state = {
                ...state,
                musicList: state.musicList.concat(action.item)
            };
            return state;
        case PLAYERSTATUS:
            state = {
                ...state,
                playerStatus: {
                    // time: action.item.time,
                    // currentTime: action.item.currentTime,
                    loop: action.item.loop, // 0 单曲循环， 1 列表循环
                }
            };
            return state;
        case DOWNLOADMUSIC:
            state = {
                ...state,
                musicList: action.item
            };
            return state;
        default:
            return state;
    }
};
export default combineReducers({Music});
