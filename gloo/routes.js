const fetch = require("node-fetch");
const debug = require("debug")("gloo:routes");
const template = require("./find-template");
const config = require("./../config");
const express = require("express");

module.exports = function(app) {
    //Sometime later we might want to do something with the favicon.ico.
    app.get("/favicon.ico", (req, res) => res.status(404).send());

    // Static assets will be available on the same path as their directory,
    // i.e. assets => /assets, static => /static
    app.use('/' + config.staticDir, express.static(config.staticDir));

    // All requests that are not static files should be resolved
    app.get("*", (req, res) => {
        
        var templatePath = template.find(req);
        
        if (templatePath)
            fetch(config.taitanUrl + req.path)
                .then(response => {
                    if (response.ok) return response.json()
                    else             throw response.status
                })
                .then(data => res.render(templatePath, data))
                .catch(err => {
                    if (err == 404)
                        res.status(404).render("_404." + config.extension, { req: req });
                    else
                        res.status(500).send("An unexpected error occured. " + err)
                })
        else
            return res.status(404).send("404: The page could not be found and this gloo instance contains no 404 template");

    });

};
