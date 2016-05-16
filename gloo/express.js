const express = require("express");
const cons = require("consolidate");
const debug = require("debug")("gloo:express");
const config = require("./../config");
const nunjucks = require('nunjucks');


module.exports = function() {
    var app = express();
    cons.requires.nunjucks = nunjucks.configure();
    cons.requires.nunjucks.addFilter('split', (str, separator) => str.split(separator));

    app.set("views", "./" + config.templateDir);
    app.engine(config.extension, cons[config.engine]);
    debug("registered view engine: " + config.engine);

    return app;
};