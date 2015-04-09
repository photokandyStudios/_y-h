/*globals require, describe, it*/
var should = require("should"),
    h = require("../src/index.js"),
    domLite = require ("dom-lite");
global.document = domLite.document;
global.Node = domLite.Node;
describe ("y.h", function () {
    describe("#hello-world", function () {
        var n = h.el("div", "Hello, World!");
        it("should be a div with Hello, World! in it", function () {
            should(n.outerHTML).be.equal("<div>Hello, World!</div>");
        });
    });
    describe("#nested-hello-world", function () {
        var n = h.el("div", h.el("div","Hello, World!"));
        it("should be a div with Hello, World! in it in another div", function () {
            should(n.outerHTML).be.equal("<div><div>Hello, World!</div></div>");
        });
    });
    describe("#classy-hello-world", function () {
        var n = h.el("div.class","Hello, World!");
        it("should be a div with Hello, World! classed with class", function () {
            should(n.outerHTML).be.equal("<div class=\"class\">Hello, World!</div>");
        });
    });

});

