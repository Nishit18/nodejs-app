exports.convert = function (dataset, callback) {
    if (dataset == null) {
        return callback();
    }
    let resultObj = {};
    for (i = 0; i < dataset.length; i++) {
        var newNum = i == 0 ? 'table' : 'table' + String(i);
        var newVal = dataset[i];
        resultObj[newNum] = newVal;
    }
    return callback(toCamel(resultObj));
};

function toCamel(o) {
    var newO, origKey, newKey, value
    if (o instanceof Array) {
        return o.map(function (value) {
            if (typeof value === "object") {
                value = toCamel(value)
            }
            return value
        })
    } else {
        newO = {}
        for (origKey in o) {
            if (o.hasOwnProperty(origKey)) {
                newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
                value = o[origKey]
                if (value instanceof Array || (value !== null && value.constructor === Object)) {
                    value = toCamel(value)
                }
                newO[newKey] = value
            }
        }
    }
    return newO
}
