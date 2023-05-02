module.exports = {
    duration: function(r) {
        var t = 0, e = 0;
        (r = Math.ceil(r)) > 60 && (t = parseInt(r / 60), r = parseInt(r % 60), t > 60 && (e = parseInt(t / 60), 
        t = parseInt(t % 60)));
        var n = "";
        return n += parseInt(r) + "秒", 0 != t && (n = parseInt(t) + "分" + n), e > 0 && (n = parseInt(e) + "小时" + n), 
        n;
    },
    kb: function(r) {
        if (r / 1024 >= 1024) return (t = (r - r % 1024) / 1024 / 1024).toFixed(2) + "M";
        var t = (r - r % 1024) / 1024;
        return t.toFixed(2) + "KB";
    }
};