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

"use strict";

function onEachDefined(o, prop, cb) {
    var oProp, propName, propValue;
    if (o !== undefined && o !== null) {
        if (typeof prop === "function") {
            cb = prop;
            oProp = o;
        } else {
            oProp = o[prop];
        }
        if (oProp !== undefined && oProp !== null) {
            if (oProp instanceof Array) {
                oProp.forEach(cb);
            } else if (typeof oProp === "object") {
                for (propName in oProp) {
                    if (oProp.hasOwnProperty(propName)) {
                        propValue = oProp[propName];
                        if (propValue !== undefined && propValue !== null) {
                            cb(oProp[propName], propName, oProp);
                        }
                    }
                }
            } else {
                throw new Error("Couldn't copy properties");
            }
        }
    }
}

module.exports = onEachDefined;