import moment from 'moment';

class Converter {
    ts2DateTimeStr(ts) {
        let dateTime = moment.unix(ts).utc('+7');
        return dateTime.format('HH:mm:ss DD/MM/YYYY')
    }

    dateTime2Ts(datetimeStr, format = '') {

    }

    dateTimeIso2dataTimeStr(dateTimeIso) {
        const dateTime = moment(dateTimeIso);
        if (dateTime.isValid()) {
            return dateTime.format('hh:mm:ss DD/MM/YYYY');
        } else {
            return "";
        }
    }

    latLng2DegreeStr(latLng) {
        let absolute = Math.abs(latLng);
        let degrees = Math.floor(absolute);
        let minutesNotTruncated = (absolute - degrees) * 60;
        let minutes = Math.floor(minutesNotTruncated);
        let seconds = Math.floor((minutesNotTruncated - minutes) * 60);

        return `${degrees}°${minutes}'${seconds}" `;
    }


    getReadableFileSizeString(fileSizeInBytes) {
        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes /= 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    }

}

const converter = new Converter();
export default converter;