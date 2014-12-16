var vsolvit.widgets.siteStatus;

siteStatus = function (ip, callback) {
    if (!this.inUse) {
        this.status = false;
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback(true);

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback(true, e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback(false);
            }
        }, 1500);
    }
}
