/*globals require, describe, it */
var should        = require("should"),
    onEachDefined = require("../src/lib/onEachDefined");

describe("onEachDefined", function () {
    describe("#simple-copy", function () {
        var a = {},
            options = {
                attrs: {
                    attr1: true,
                    attr2: "hello",
                    attr3: [1, 2, 3]
                }
            };
        onEachDefined(options, "attrs", function (v, p) {
            a[p] = v;
        });

        it("should work", function () {
            should(a).be.eql({
                attr1: true,
                attr2: "hello",
                attr3: [1, 2, 3]
            });
        });
    });
    describe("#simple-no-sub-copy", function () {
        var a = {},
            options = {
                attr1: true,
                attr2: "hello",
                attr3: [1, 2, 3]
            };
        onEachDefined(options, function (v, p) {
            a[p] = v;
        });

        it("should work", function () {
            should(a).be.eql({
                attr1: true,
                attr2: "hello",
                attr3: [1, 2, 3]
            });
        });
    });
    describe("#array-copy", function () {
        var a = {},
            options = {
                arr: [2, 4, 6]
            };
        onEachDefined(options, "arr", function (v, p) {
            a[p] = v;
        });

        it("should work", function () {
            should(a).be.eql({
                "0": 2,
                "1": 4,
                "2": 6
            });
        });
    });
    describe("#array-no-sub-copy", function () {
        var a = {},
            options = [2, 4, 6];
        onEachDefined(options, function (v, p) {
            a[p] = v;
        });

        it("should work", function () {
            should(a).be.eql({
                "0": 2,
                "1": 4,
                "2": 6
            });
        });
    });
    describe("#array-no-sub-copy-zero-len", function () {
        var a = {},
            options = [];
        onEachDefined(options, function (v, p) {
            a[p] = v;
        });

        it("should work", function () {
            should(a).be.eql({});
        });
    });
});

