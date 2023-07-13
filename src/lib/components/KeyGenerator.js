export function generateRandomAPIKey() {
    let date = new Date().getTime();
    var key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function rand(c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return key;
}
