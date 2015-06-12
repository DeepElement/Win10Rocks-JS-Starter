var classHelper = require('../helper/class.node');

var _constructor = function (options) {

};

var members = {
	_memoryStore: {},
	save: function(key, contentString, callback){
		// TODO: save a file to storage
		this._memoryStore[key] = {
			modified: new Date(),
			data: contentString
		};
		return callback();
	},
	fetch : function(key, callback){
		// TODO: load a file from storage
		if(this._memoryStore[key])
			return callback(null, this._memoryStore[key]);
		return callback('does-not-exist');
	},
	list: function(callback){
		// TODO: implement listing of all files managed
		return callback(null, this._memoryStore.map(function(a) {return a.key;}));
	},
	clear: function(callback){g
		// TODO: clear managed storage
		this._memoryStore = {};
		return callback();
	},
	exists: function(key, callback){
		// TODO: implement exists lookup
		return callback(null, this._memoryStore[key] != null);
	}
};

module.exports = classHelper.define(_constructor, members);