const express = require("express");
const cons = require("consolidate");
const debug = require("debug")("gloo:express")
const config = require("./config");


module.exports = function() {
    var app = express();
    app.set("views", "./templates");
    registerSupportedEngines(app);
    return app;
}

function registerSupportedEngines(app) {
    for (var engineDesc of config.supportedEngines) {
        app.engine(engineDesc.extension, cons[engineDesc.engine]);
        debug("registered view engine: " + engineDesc.extension);
    }
}
