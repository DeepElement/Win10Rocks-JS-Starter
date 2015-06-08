String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

Array.prototype.contains = function (target, ordered) {
    ordered = ordered || false;
    if (ordered) {
        var lastIdx = -1;
        var foundAll = true;
        for (var i = 0; i <= target.length - 1; i++) {
            lastIdx = this.indexOf(target[i], lastIdx + 1);
            if (lastIdx == -1) {
                foundAll = false;
                break;
            }
        }
        return foundAll;
    } else {
        var foundAll = true;
        for (var i = 0; i <= target.length - 1; i++) {
            if (this.indexOf(target[i]) == -1) {
                foundAll = false;
                break;
            }
        }
        return foundAll;
    }
};