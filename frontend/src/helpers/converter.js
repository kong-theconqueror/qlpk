import moment from 'moment';

export function ts2DateTimeStr(ts) {
    let dateTime = moment.unix(ts).utc('+7');
    return dateTime.format('hh:mm:ss DD/MM/YYYY')
}

export function ts2MinStr(ts) {
    let min = Math.floor(ts / 60);
    let minStr = min < 10 ? `0${min}` : `${min}`;
    let sec = ts % 60;
    let secStr = sec < 10 ? `0${sec}` : `${sec}`;
    return `${minStr}:${secStr}`;
}