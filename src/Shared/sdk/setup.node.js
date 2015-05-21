var ioc = require('./helper/ioc.node'),
    config = require('./helper/config.node');

// Register container instances
ioc.register(require('./service/navigation.node'), "application");
ioc.register(require('./service/message.node'), "application");
//ioc.register(require('./command/relay.node'), "request");

// TODO: Extract this to file based json configuration
//config.set("behaviors:viewLoadTimeout", 10000);