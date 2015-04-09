# yasmf-h - A Simple DOM Templating Module

This is a simple templating module that generates DOM elements based on a function. It lets you write code like this:

```
    var h = require("yasmf-h"),
        n = h.el("div.ui-container#rootContainer",
              h.el("ul.ui-list", [
                h.li("item 1"),
                h.li("item 2"),
                h.li("item 3")
              ], {
                on: {
                      "click": function () {...}
                    }
              })
            );
   h.renderTo (n, someOtherElement);
```

There are lots of similar projects:

 * [h](https://www.npmjs.com/package/h)
 * [hyperscript](https://www.npmjs.com/package/hyperscript)
 * [virtual-hyperscript](https://www.npmjs.com/package/virtual-hyperscript)

This project generates pure DOM elements, and supplies a few useful features that I didn't see in the other projects. Plus, I
wanted to see how I would build something like this, anyway. There are also some features that are _missing_ from the other
projects, so use whatever fits best in your project.

> Note: This module is intended to be used in a browser. If you want to use it in Node to create HTML, you will need to add an
> additional package that simulates the DOM tree. For tests, I've used `dom-lite`. You can try to use other modules, but many
> appear to fail on setting `textContent`, which this library relies upon.

For the curious, YASMF refers to "Yet Another Simple Mobile Framework". `H` is so named, because it originated there, but it is
useful enough to be split out.

## Installation

If you're using Browserify as a package manager or using this in server-side code, install this using NPM:

```
$ npm --save install yasmf-h
```

If you're using a browser, download one of the JavaScript files in the `build` directory and use a script tag. There is a minified
version (`yasmf-h.min.js`) and a non-minified version (`yasmf-h.js`). The non-minified version does include sourcemaps as this project
is transitioning to ES6 and is using 6to5.

## Usage

Using this module is pretty simple and straightforward. There's actually two stages: one is generating the DOM tree, and the other
is rendering that DOM tree.

### Generating the tree

You use `h.el()` to generate a DOM tree. The result will either be a single DOM node or an array of DOM nodes that are ready for
insertion into your document.

> There are shortcuts provided for just about every HTML element (including HTML5), so you can also use `h.ul()` to
> generate an unordered list.

The `h.el` function has the following signature:

 * `tag`:`string` -- The first parameter specifies the tag name to create. If using a shortcut method like `h.div`, this is
   specified for you.
 * `options`:`object` -- This parameter can occur in the second or third parameter position. It allows you to specify attributes,
   styles, event handlers, and more.
 * `children`:`string|Function|Node|Array<Node>` -- Children. If the parameter is a string or a number, it is counted as text
   content instead. How text content is rendered is based on a simple heuristic -- if there is a `value` parameter on resulting
   element, and it's not an `LI`, then the first text content is assigned to `value`, and the second is set to `textContent` (if
   present). However if no `value` property exists, the first text content is assigned to `textContent`.

> **NOTE**: You may not want to worry about how text content is interpreted. You can make it explicit by passing data destined for
> `textContent` via `options.content` or target `value` using `options.value` or `options.attrs.value`.

Tags are special -- they can contain information about the tag's class, ID, and attributes as well. Certain characters are used to
delimit these properties, but they can occur in any order (except the tag name).

 * `tagName` -- the HTML element. Any HTML element is valid here.
 * `#tagID` -- Anything prepended with `#` marks the element's ID. You can also specify this using the options
   `{ attrs: { id: ... }}`
 * `.class` -- Anything prepended with `.` indicates the element's class. If an element should have multiple classes, separate
   them with spaces.
 * `?attr[&attrs...]` -- Attributes can also be specified using a query string format. This shouldn't be used terribly much,
   since it isn't necessarily as readable as specifying the attributes in an object form, but it can be useful. For example,
   when defining input elements: `input?type=text&size=20&readonly` will generate an read-only text box.

> The order of the tag portions doesn't matter beyond the fact that the tag name *must* come first. Otherwise, they can be in
> any order. They should *not*, however, be duplicated. If this occurs, the results are undefined.

> **NOTE**: Because the tag portions can come in any order, it's easy to be had by the parsing system -- for example, don't
> specify a image file using `&?` syntax, because the `.` in the filename will cause the parser to think there's a class name. This
> would obviously cause unintended results. This feature is really only present for simple attributes like `?size=20` or `?readonly`.

The `options` parameter allows you to configure the element directly. The following are supported:

 * `content`:`*` -- Assigns the value directly to `textContent`.
 * `value`:`*` -- Assigns the value directly to `value`.
 * `attrs`:`object` -- Each key within the object will be applied to the element using `setAttribute`.
 * `styles`:`object` -- Each key within the object will be applied to the element's styles.
 * `on`: `object` -- Each key specifies an event to listen for. The value of that key can either be a function or another object
   that specifies the `handler` and whether or not the event is `capture`d.
 * `hammer`: `object` -- Akin to `on`, but using the Hammer.js library. You need to pass a `Hammer` instance either in this object
   or via `h.Hammer`. Each key (other than `hammer`) will be treated as a Hammer gesture. Within that object, the event handler
   is specified via `handler`, and any options are specified via `options`.
 * `bind`:`{object:, keyPath:, keyType:}` -- Allows data binding. Only works with YASMF `BaseObject`s. This can be passed via
   `h.BaseObject` or defined globally.
 * `store`:`{object:, keyPath:, idOnly:}` -- Stores the element created into the object at the key path (one level only). If
   `idOnly` is `true`, only the element's ID will be stored (instead of the element itself).

### Rendering to the Document

Once you have a generated tree, you can render it to the document like this:

```
   var e document.getElementById("someElement"),
       n = makeTree();
   h.renderTo(n, e);
```

### Other useful functions

 * `mapTo` -- maps a string to another string
 * `iif (expr, a, b)` -- akin to `?:`, but it doesn't do short-circuiting.
 * `ifdef (expr, a, b)` -- Returns `a` if `expr` is defined, and `b` if it isn't.
 * `forIn (o, cb)` -- Iterates over all the keys in the object and calls the callback with those keys. Callback should have
   the form `value, object, key name`.
 * `forEach (arr, cb)` -- iterate over an array; equivalent to `arr.map(cb)`.

### Experimental features

 * `h.useDomMerging` -- This will attempt to merge the tree into the target node when `renderTo` is called. This is *far* from
   perfect, which is why it is disabled by default. To enable it, set it to `true`. **NOTE:** This is a global setting; it will
   affect *all* renders. There are significant limiations here: no event handlers will be copied due to the limitations of the
   DOM API. Certain classes are also handled specially (these have meaning in the YASMF framework).

## Examples

```
//
// <p>paragraph content</p>
return h.p ( "paragraph content" );
// or
return h.el ( "p", "paragraph content" );
// or
return h.p ({content: "paragraph content"});

//
//<input id="txtUsername" class="bigField" type="text" size="20" value="starting value" />
return h.el ( "input#txtUsername.bigField?type=text&size=20", "starting value" );
// or
return h.input ( { attrs: { type: "text", size: "20", class: "bigField", id: "txtUserName" } },
                 "starting value" );
// or
return h.el ( "input#txtUsername.bigField?type=text&size=20", {value:"starting value"} );
```

## Changes

### 0.1.4

* Added `content` and `value` properties to the `options` object for `h.el`.
* Added additional classes for `useDomMerging`

### 0.1.3

* Fixed issue with single letter tags returning `undefined`; oops!

### 0.1.2

* Fixed bug with `LI` and content -- they have `value` attributes!

### 0.1.1

* Public Release

