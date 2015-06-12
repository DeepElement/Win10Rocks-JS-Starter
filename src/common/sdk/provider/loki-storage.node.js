var classHelper = require('../helper/class.node'),
	ioc = require('../helper/ioc.node');

var _constructor = function (options) {
	this._lokiStorageKey =  "-lokiStorage.json";
	this._storageProvider = null;
};

var members = {
    loadDatabase: function (dbname, callback) {
        if (!this._storageProvider)
            this._storageProvider = ioc.get("storageProvider");
        var dbStorageKey = dbname + this._lokiStorageKey;
        this._storageProvider.fetch(dbStorageKey,
            function (err, resp) {
                if (err) {
                    if (err === 'does-not-exist')
                        return callback();
                    return callback(err);
                }
                var resultStr = "";
                if(!(typeof (resp.data) === 'string'))
                    resultStr = JSON.stringify(resp.data);
                else
                    resultStr = String(resp.data);
                return callback(resultStr);
            });
    },
    saveDatabase: function (dbname, dbstring, callback) {
        var dbStorageKey = dbname + this._lokiStorageKey;
        var storageStr = "";
        if(!(typeof (dbstring) === 'string'))
                storageStr = JSON.stringify(dbstring);
            else
                storageStr = String(dbstring);
        this._storageProvider.save(dbStorageKey,
            storageStr,
            function (err) {
                if (err)
                    return callback(err);
                return callback();
            });
    }
};

module.exports = classHelper.define(_constructor, members);