export const getUVColor = (uv) => {
    if (uv < 2) {
        return '#2ECC71';
    } else if (uv <= 5) {
        return '#ffd700';
    } else if (uv <= 7) {
        return '#FFA500';
    } else if (uv <= 10) {
        return '#dc143c';
    } else {
        return '#c71585';
    }
};

export const getPressureColor = (pressure) => {
    if (pressure < 980) {
        return '#3498DB'; // Deep blue for very low pressure
    } else if (pressure < 1010) {
        return '#2ECC71'; // Light green for low pressure
    } else if (pressure < 1025) {
        return '#F1C40F'; // Yellow for moderate pressure
    } else if (pressure < 1040) {
        return '#FF7F50'; // Orange for high pressure
    } else {
        return '#DC143C'; // Deep red for very high pressure
    }
};

export const getHumidityColor = (humidity) => {
    if (humidity < 40) {
        return '#F1C40F';
    } else if (humidity < 60) {
        return '#A0CDFF';
    } else {
        return '#00BFFF';
    }
};
export const getGustsColor = (gusts) => {
    if (gusts < 38) {
        return '#AACCFF';
    } else if (gusts < 50) {
        return '#FFFF00';
    } else if (gusts < 74) {
        return '#FFA500';
    } else if (gusts < 133) {
        return '#FF0000';
    } else {
        return '#8B0000';
    }
};
export const getTempsColor = (temp) => {
    if (temp < -10) {
        return '#00008B';
    } else if (temp < 0) {
        return '#2ECC71';
    } else if (temp < 15) {
        return '#90EE90';
    } else if (temp <= 20) {
        return '#FFFF00';
    } else if (temp <= 25) {
        return '#AACCFF';
    } else if (temp <= 30) {
        return '#FFA500';
    } else if (temp <= 35) {
        return '#8B0000';
    } else {
        return '#800080';
    }
};
