/*
 * _y-h - simple DOM templating
 *
 * @author Kerri Shotts
 * @license MIT
 *
 * ```
 * Copyright (c) 2014 - 2015 Kerri Shotts, photoKandy Studios LLC
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * ```
 */

/**
 * Parses a tag string with a regular expression. Returns undefined if the
 * match is not found. If chop is true, the first character is eliminated
 * @param {string} str
 * @param {RegExp} regexp
 * @param {boolean} [chop]
 * @returns {*}
 */
function parse(str, regexp, chop) {
    var results = str.match(regexp),
        rStr;
    if (results === null || results === undefined) {
        return undefined;
    }
    if (results instanceof Array) {
        rStr = (chop ? results[0].substr(1) : results[0]).trim();
        return rStr === "" ? undefined : rStr;
    }
}

/**
 * parses an incoming tag into its tag `name`, `id`, and `class` constituents
 * A tag is of the form `tagName.class#id` or `tagName#id.class`. The `id` and `class`
 * are optional.
 *
 * If attributes need to be supplied, it's possible via the `?` query string. Attributes
 * are of the form `?attr=value&attr=value...`.
 *
 *
 *
 * @method parseTag
 * @private
 * @param {string} tag      tag to parse
 * @return {{tag: string, id: string, class: string, query: string, queryParts: Array<string>}} Object of the form `{ tag: tagName, id: id, class: class, query: query, queryPars: Array }`
 */
function parseTag(tag) {
    var tagParts = {
        tag:        "",
        id:         undefined,
        class:      undefined,
        query:      undefined,
        queryParts: []
    };

    // if no tag, return a blank structure
    if (tag === undefined || tag === null) {
        return tagParts;
    }

    // pick out the relevant pieces of the tag
    // element tag name is at the front
    // # identifies ID
    // . identifies class
    // ? identifies attributes (query string format)
    tagParts.tag = parse(tag, /.[^\#\.\?]*/);
    tagParts.id = parse(tag, /\#[^\#\.\?]+/, true);
    tagParts.query = parse(tag, /\?[^\#\.\?]+/, true);
    tagParts.class = parse(tag, /\.[^\#\.\?]+/, true);

    if (tagParts.query !== undefined) {
        // split on &. We don't do anything further (like split on =)
        tagParts.queryParts = tagParts.query.split("&");
    }

    return tagParts;
}

module.exports = parseTag;
