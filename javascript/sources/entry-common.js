/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function patch(prototype, name, fn) {

    let original = prototype[name];

    prototype[name] = function (... args) {
        return fn.call(this, original, ... args);
    };

}

module.exports = function (bind, lib) {

    let constants = Object.assign({

        UNDEFINED: NaN

    }, require(`./YGEnums`));

    class Layout {

        constructor(left, right, top, bottom, width, height) {

            this.left = left;
            this.right = right;

            this.top = top;
            this.bottom = bottom;

            this.width = width;
            this.height = height;

        }

        fromJS(expose) {

            expose(this.left, this.right, this.top, this.bottom, this.width, this.height);

        }

        toString() {

            return `<Layout#${this.left}:${this.right};${this.top}:${this.bottom};${this.width}:${this.height}>`;

        }

    }

    class Size {

        static fromJS({ width, height }) {

            return new Size(width, height);

        }

        constructor(width, height) {

            this.width = width;
            this.height = height;

        }

        fromJS(expose) {

            expose(this.width, this.height);

        }

        toString() {

            return `<Size#${this.width}x${this.height}>`;

        }

    }

    class Value {

        constructor(unit, value) {

            this.unit = unit;
            this.value = value;

        }

        fromJS(expose) {

            expose(this.unit, this.value);

        }

        toString() {

            switch (this.unit) {

                case constants.UNIT_PIXEL:
                    return `${this.value}`;

                case constants.UNIT_PERCENT:
                    return `${this.value}%`;

                default: {
                    return `${this.value}?`;
                }

            }

        }

        valueOf() {

            return this.value;

        }

    }

    for (let fnName of [ `setPosition`, `setMargin`, `setFlexBasis`, `setWidth`, `setHeight`, `setMinWidth`, `setMinHeight`, `setMaxWidth`, `setMaxHeight`, `setPadding` ]) {

        let methods = { [constants.UNIT_PIXEL]: lib.Node.prototype[fnName], [constants.UNIT_PERCENT]: lib.Node.prototype[`${fnName}Percent`] };

        if (Object.keys(methods).some(method => methods[method] == null))
            throw new Error(`Assertion failed; some unit derivates of ${fnName} seem missing`);

        patch(lib.Node.prototype, fnName, function (original, ... args) {

            // We patch all these functions to add support for the following calls:
            // .setWidth(100) / .setWidth("100%") / .setWidth(.getWidth())

            let value = args.pop();
            let unit, asNumber;

            if (value instanceof Value) {

                unit = value.unit;
                asNumber = value.valueOf();

            } else {

                unit = typeof value === `string` && value.endsWith(`%`) ? constants.UNIT_PERCENT : constants.UNIT_PIXEL;
                asNumber = parseFloat(value);

            }

            return methods[unit].call(this, ... args, asNumber);

        });

    }

    patch(lib.Node.prototype, `free`, function () {

        // Since we handle the memory allocation ourselves (via lib.Node.create), we also need to handle the deallocation

        lib.Node.destroy(this);

    });

    patch(lib.Node.prototype, `freeRecursive`, function () {

        for (let t = 0, T = this.getChildCount(); t < T; ++t)
            this.getChild(0).freeRecursive();

        this.free();

    });

    patch(lib.Node.prototype, `setMeasureFunc`, function (original, measureFunc) {

        // This patch is just a convenience patch, since it helps write more idiomatic source code (such as .setMeasureFunc(null))
        // We also automatically convert the return value of the measureFunc to a Size object, so that we can return anything that has .width and .height properties

        if (measureFunc) {
            return original.call(this, (... args) => Size.fromJS(measureFunc(... args)));
        } else {
            return this.unsetMeasureFunc();
        }

    });

    patch(lib.Node.prototype, `calculateLayout`, function (original, width = constants.UNDEFINED, height = constants.UNDEFINED, direction = constants.DIRECTION_LTR) {

        // Just a small patch to add support for the function default parameters

        return original.call(this, width, height, direction);

    });

    function setExperimentalFeatureEnabled(... args) {

        return lib.setExperimentalFeatureEnabled(... args);

    }

    function isExperimentalFeatureEnabled(... args) {

        return lib.isExperimentalFeatureEnabled(... args);

    }

    function getInstanceCount(... args) {

        return lib.getInstanceCount(... args);

    }

    bind(`Layout`, Layout);
    bind(`Size`, Size);
    bind(`Value`, Value);

    return Object.assign({

        Node: lib.Node,

        Layout,
        Size,
        Value,

        setExperimentalFeatureEnabled,
        isExperimentalFeatureEnabled,

        getInstanceCount

    }, constants);

};
