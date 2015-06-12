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
                return callback(resp);
            });
    },
    saveDatabase: function (dbname, dbstring, callback) {
        var dbStorageKey = dbname + this._lokiStorageKey;
        this._storageProvider.save(dbStorageKey,
            dbstring,
            function (err) {
                if (err)
                    return callback(err);
                return callback();
            });
    }
};

module.exports = classHelper.define(_constructor, members);