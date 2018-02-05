function convertTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const time = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + 'PM';
    return time;
}

export { convertTime };
