var classHelper = require('../helper/class.node'),
	feed = require("feed-read"),
	eventModel = require("../model/event.node");

var _constructor = function (options) {

};

var members = {
	fetchFeedConfig: function (data, callback) {
		return callback(null, {
			events: [{
				name: 'build-2015',
				feeds: ['https://channel9.msdn.com/Events/Build/2015/RSS']
			}],
			generic: ['http://channel9.msdn.com/all/rss']
		});
	},

	fetchChannel9MediaFeed: function (data, callback) {
		var uri = data.uri;
		feed(uri, function (err, articles) {
			if (err)
				return callback(err);
			// Each article has the following properties:
			//
			//   * "title"     - The article title (String).
			//   * "author"    - The author's name (String).
			//   * "link"      - The original article link (String).
			//   * "content"   - The HTML content of the article (String).
			//   * "published" - The date that the article was published (Date).
			//   * "feed"      - {name, source, link}
			//
			return callback(null, []);
		});
	}
};

module.exports = classHelper.define(_constructor, members);