module.exports = function (callback, delay) {
    let timerId, start, remaining = delay;

    this.pause = function () {
        clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    this.resume = function () {
        start = Date.now();
        clearTimeout(timerId);
        timerId = setTimeout(callback, remaining);
    };

    this.stop = function () {
        clearTimeout(timerId);
    };

    this.resume();
};