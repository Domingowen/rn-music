export const HISTORY = 'HISTORY';
export const SEARCH = 'SEARCH';
export const PLAYER = 'PLAYER';
export const MUSICLIST = 'MUSICLIST';
export const PLAYERSTATUS = 'PLAYERSTATUS';
export const DOWNLOADMUSIC = 'DOWNLOADMUSIC';
export function SettingHistory (item) {
    return {
        type: HISTORY,
        item
    }
}
export function SettingSearch (item) {
    return {
        type: SEARCH,
        item
    }
}
export function SettingMusicList (item) {
    return {
        type: MUSICLIST,
        item
    }
}
export function SettingPlayer (item) {
    return {
        type: PLAYER,
        item
    }
}
export function SettingPlayerStatus (item) {
    return {
        type: PLAYERSTATUS,
        item
    }
}
export function SettingDownloadMusic (item) {
    return {
        type: DOWNLOADMUSIC,
        item
    }
}