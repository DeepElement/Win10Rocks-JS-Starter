// LokiJS Collection Mapping file
// Is included in the Loki DataStore in the Data Service (`src\service\data.node`)
module.exports = {
	events: {
		proto: require('./event.node')
	},
	media: {
		proto: require('./media.node')
	},
	contributors: {
		proto: require('./contributor.node')
	},
	feedSources: {
		proto: require('./feed-source.node')
	}
};