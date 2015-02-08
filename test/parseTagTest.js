/*globals require, describe, it*/
var assert = require("assert"),
    should = require("should"),
    parseTag = require("../lib/parseTag");

function shouldHaveTag(r, tag) {
    //noinspection BadExpressionStatementJS
    should(r).have.property("tag", tag).and.be.a.String;
}
function shouldHaveClass(r, clas) {
    //noinspection BadExpressionStatementJS
    should(r).have.property("class", clas).and.be.a.String;
}
function shouldHaveId(r, id) {
    //noinspection BadExpressionStatementJS
    should(r).have.property("id", id).and.be.a.String;
}
function shouldHaveAttrs(r, nAttrs, attrs) {
    //noinspection BadExpressionStatementJS
    should(r).have.property("query", attrs.join("&")).and.be.a.String;
    should(r).have.property("queryParts").and.be.length(nAttrs);
    should(r).have.property("queryParts").and.be.eql(attrs);
}
function shouldHaveNoClass(r) {
    //noinspection BadExpressionStatementJS
    should(r).have.property("class").and.not.be.ok;
}
function shouldHaveNoId(r) {
    //noinspection BadExpressionStatementJS
    should(r).have.property("id").and.not.be.ok;
}
function shouldHaveNoAttrs(r) {
    //noinspection BadExpressionStatementJS
    should(r).have.property("query").and.not.be.ok;
    //noinspection BadExpressionStatementJS
    should(r).have.property("queryParts").and.be.empty;
}

describe ("parseTag", function () {
    describe ("#only-tag", function () {
        it("should be a div and nothing else", function () {
            var r = parseTag("div");
            shouldHaveTag(r, "div");
            shouldHaveNoId(r);
            shouldHaveNoClass(r);
            shouldHaveNoAttrs(r);
        });
    });
    describe ("#tag-and-class", function () {
        var r = parseTag("div.class");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should not have anything else", function () {
            shouldHaveNoId(r);
            shouldHaveNoAttrs(r);
        });
    });
    describe ("#tag-and-id", function () {
        var r = parseTag("div#id");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should not have anything else", function () {
            shouldHaveNoClass(r);
            shouldHaveNoAttrs(r);
        });
    });
    describe ("#tag-and-one-attrs", function () {
        var r = parseTag("div?attr1");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a single attribute of attr1", function () {
            shouldHaveAttrs(r, 1, ["attr1"]);
        });
        it("should not have anything else", function () {
            shouldHaveNoClass(r);
            shouldHaveNoId(r);
        });
    });
    describe ("#tag-and-two-attrs", function () {
        var r = parseTag("div?attr1&attr2");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have two attributes of attr1 and attr2", function () {
            shouldHaveAttrs(r, 2, ["attr1", "attr2"]);
        });
        it("should not have anything else", function () {
            shouldHaveNoClass(r);
            shouldHaveNoId(r);
        });
    });
    describe ("#tag-and-class-and-id", function () {
        var r = parseTag("div.class#id");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should not have anything else", function () {
            shouldHaveNoAttrs(r);
        });
    });
    describe ("#tag-and-id-and-class", function () {
        var r = parseTag("div#id.class");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should not have anything else", function () {
            shouldHaveNoAttrs(r);
        });
    });
    describe ("#tag-and-class-and-id-and-one-attr", function () {
        var r = parseTag("div.class#id?attr1");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should have a single attribute of attr1", function () {
            shouldHaveAttrs(r, 1, ["attr1"]);
        });
    });
    describe ("#tag-and-class-and-id-and-two-attrs", function () {
        var r = parseTag("div.class#id?attr1&attr2");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should have two attributes of attr1 and attr2", function () {
            shouldHaveAttrs(r, 2, ["attr1", "attr2"]);
        });
    });
    describe ("#tag-and-id-and-class-and-one-attr", function () {
        var r = parseTag("div#id.class?attr1");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should have a single attribute of attr1", function () {
            shouldHaveAttrs(r, 1, ["attr1"]);
        });
    });
    describe ("#tag-and-id-and-class-and-two-attrs", function () {
        var r = parseTag("div#id.class?attr1&attr2");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should have two attributes of attr1 and attr2", function () {
            shouldHaveAttrs(r, 2, ["attr1", "attr2"]);
        });
    });
    describe ("#tag-and-two-attrs-and-class-and-id", function () {
        var r = parseTag("div?attr1&attr2.class#id");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should have two attributes of attr1 and attr2", function () {
            shouldHaveAttrs(r, 2, ["attr1", "attr2"]);
        });
    });
    describe ("#tag-and-two-attrs-and-id-and-class", function () {
        var r = parseTag("div?attr1&attr2#id.class");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should have two attributes of attr1 and attr2", function () {
            shouldHaveAttrs(r, 2, ["attr1", "attr2"]);
        });
    });
    describe ("#tag-and-id-and-two-attrs-and-class", function () {
        var r = parseTag("div#id?attr1&attr2.class");
        it("should be a div", function () {
            shouldHaveTag(r, "div");
        });
        it("should have a class of class", function () {
            shouldHaveClass(r, "class");
        });
        it("should have a id of id", function () {
            shouldHaveId(r, "id");
        });
        it("should have two attributes of attr1 and attr2", function () {
            shouldHaveAttrs(r, 2, ["attr1", "attr2"]);
        });
    });

});
