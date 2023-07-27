/*! For license information please see lp-1.0.1-beta.1.js.LICENSE.txt */ ! function(t, e) {
    "object" === typeof exports && "object" === typeof module ? module.exports = e() : "function" === typeof define && define.amd ? define([], e) : "object" === typeof exports ? exports.Launchpad = e() : t.Launchpad = e()
}(this, (function() {
    return function(t) {
        var e = {};

        function n(r) {
            if (e[r]) return e[r].exports;
            var o = e[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }
        return n.m = t, n.c = e, n.d = function(t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
            })
        }, n.r = function(t) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function(t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" === typeof t && t && t.__esModule) return t;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var o in t) n.d(r, o, function(e) {
                    return t[e]
                }.bind(null, o));
            return r
        }, n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "../dist", n(n.s = 12)
    }([function(t, e, n) {
        "use strict";
        (function(t) {
            var r = n(2);

            function o(t) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            var i = setTimeout;

            function a() {}

            function c(t) {
                if (!(this instanceof c)) throw new TypeError("Promises must be constructed via new");
                if ("function" !== typeof t) throw new TypeError("not a function");
                this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], p(t, this)
            }

            function s(t, e) {
                for (; 3 === t._state;) t = t._value;
                0 !== t._state ? (t._handled = !0, c._immediateFn((function() {
                    var n = 1 === t._state ? e.onFulfilled : e.onRejected;
                    if (null !== n) {
                        var r;
                        try {
                            r = n(t._value)
                        } catch (o) {
                            return void l(e.promise, o)
                        }
                        u(e.promise, r)
                    } else(1 === t._state ? u : l)(e.promise, t._value)
                }))) : t._deferreds.push(e)
            }

            function u(t, e) {
                try {
                    if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
                    if (e && ("object" === o(e) || "function" === typeof e)) {
                        var n = e.then;
                        if (e instanceof c) return t._state = 3, t._value = e, void f(t);
                        if ("function" === typeof n) return void p((r = n, i = e, function() {
                            r.apply(i, arguments)
                        }), t)
                    }
                    t._state = 1, t._value = e, f(t)
                } catch (a) {
                    l(t, a)
                }
                var r, i
            }

            function l(t, e) {
                t._state = 2, t._value = e, f(t)
            }

            function f(t) {
                2 === t._state && 0 === t._deferreds.length && c._immediateFn((function() {
                    t._handled || c._unhandledRejectionFn(t._value)
                }));
                for (var e = 0, n = t._deferreds.length; e < n; e++) s(t, t._deferreds[e]);
                t._deferreds = null
            }

            function d(t, e, n) {
                this.onFulfilled = "function" === typeof t ? t : null, this.onRejected = "function" === typeof e ? e : null, this.promise = n
            }

            function p(t, e) {
                var n = !1;
                try {
                    t((function(t) {
                        n || (n = !0, u(e, t))
                    }), (function(t) {
                        n || (n = !0, l(e, t))
                    }))
                } catch (r) {
                    if (n) return;
                    n = !0, l(e, r)
                }
            }
            c.prototype.catch = function(t) {
                return this.then(null, t)
            }, c.prototype.then = function(t, e) {
                var n = new this.constructor(a);
                return s(this, new d(t, e, n)), n
            }, c.prototype.finally = r.a, c.all = function(t) {
                return new c((function(e, n) {
                    if (!t || "undefined" === typeof t.length) throw new TypeError("Promise.all accepts an array");
                    var r = Array.prototype.slice.call(t);
                    if (0 === r.length) return e([]);
                    var i = r.length;

                    function a(t, c) {
                        try {
                            if (c && ("object" === o(c) || "function" === typeof c)) {
                                var s = c.then;
                                if ("function" === typeof s) return void s.call(c, (function(e) {
                                    a(t, e)
                                }), n)
                            }
                            r[t] = c, 0 === --i && e(r)
                        } catch (u) {
                            n(u)
                        }
                    }
                    for (var c = 0; c < r.length; c++) a(c, r[c])
                }))
            }, c.resolve = function(t) {
                return t && "object" === o(t) && t.constructor === c ? t : new c((function(e) {
                    e(t)
                }))
            }, c.reject = function(t) {
                return new c((function(e, n) {
                    n(t)
                }))
            }, c.race = function(t) {
                return new c((function(e, n) {
                    for (var r = 0, o = t.length; r < o; r++) t[r].then(e, n)
                }))
            }, c._immediateFn = "function" === typeof t && function(e) {
                t(e)
            } || function(t) {
                i(t, 0)
            }, c._unhandledRejectionFn = function(t) {
                "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
            }, e.a = c
        }).call(this, n(3).setImmediate)
    }, function(t, e) {
        function n(t) {
            return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || new Function("return this")()
        } catch (o) {
            "object" === ("undefined" === typeof window ? "undefined" : n(window)) && (r = window)
        }
        t.exports = r
    }, function(t, e, n) {
        "use strict";
        e.a = function(t) {
            var e = this.constructor;
            return this.then((function(n) {
                return e.resolve(t()).then((function() {
                    return n
                }))
            }), (function(n) {
                return e.resolve(t()).then((function() {
                    return e.reject(n)
                }))
            }))
        }
    }, function(t, e, n) {
        (function(t) {
            var r = "undefined" !== typeof t && t || "undefined" !== typeof self && self || window,
                o = Function.prototype.apply;

            function i(t, e) {
                this._id = t, this._clearFn = e
            }
            e.setTimeout = function() {
                return new i(o.call(setTimeout, r, arguments), clearTimeout)
            }, e.setInterval = function() {
                return new i(o.call(setInterval, r, arguments), clearInterval)
            }, e.clearTimeout = e.clearInterval = function(t) {
                t && t.close()
            }, i.prototype.unref = i.prototype.ref = function() {}, i.prototype.close = function() {
                this._clearFn.call(r, this._id)
            }, e.enroll = function(t, e) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = e
            }, e.unenroll = function(t) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
            }, e._unrefActive = e.active = function(t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 && (t._idleTimeoutId = setTimeout((function() {
                    t._onTimeout && t._onTimeout()
                }), e))
            }, n(4), e.setImmediate = "undefined" !== typeof self && self.setImmediate || "undefined" !== typeof t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" !== typeof self && self.clearImmediate || "undefined" !== typeof t && t.clearImmediate || this && this.clearImmediate
        }).call(this, n(1))
    }, function(t, e, n) {
        (function(t, e) {
            ! function(t, n) {
                "use strict";
                if (!t.setImmediate) {
                    var r, o, i, a, c, s = 1,
                        u = {},
                        l = !1,
                        f = t.document,
                        d = Object.getPrototypeOf && Object.getPrototypeOf(t);
                    d = d && d.setTimeout ? d : t, "[object process]" === {}.toString.call(t.process) ? r = function(t) {
                        e.nextTick((function() {
                            h(t)
                        }))
                    } : ! function() {
                        if (t.postMessage && !t.importScripts) {
                            var e = !0,
                                n = t.onmessage;
                            return t.onmessage = function() {
                                e = !1
                            }, t.postMessage("", "*"), t.onmessage = n, e
                        }
                    }() ? t.MessageChannel ? ((i = new MessageChannel).port1.onmessage = function(t) {
                        h(t.data)
                    }, r = function(t) {
                        i.port2.postMessage(t)
                    }) : f && "onreadystatechange" in f.createElement("script") ? (o = f.documentElement, r = function(t) {
                        var e = f.createElement("script");
                        e.onreadystatechange = function() {
                            h(t), e.onreadystatechange = null, o.removeChild(e), e = null
                        }, o.appendChild(e)
                    }) : r = function(t) {
                        setTimeout(h, 0, t)
                    } : (a = "setImmediate$" + Math.random() + "$", c = function(e) {
                        e.source === t && "string" === typeof e.data && 0 === e.data.indexOf(a) && h(+e.data.slice(a.length))
                    }, t.addEventListener ? t.addEventListener("message", c, !1) : t.attachEvent("onmessage", c), r = function(e) {
                        t.postMessage(a + e, "*")
                    }), d.setImmediate = function(t) {
                        "function" !== typeof t && (t = new Function("" + t));
                        for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];
                        var o = {
                            callback: t,
                            args: e
                        };
                        return u[s] = o, r(s), s++
                    }, d.clearImmediate = p
                }

                function p(t) {
                    delete u[t]
                }

                function h(t) {
                    if (l) setTimeout(h, 0, t);
                    else {
                        var e = u[t];
                        if (e) {
                            l = !0;
                            try {
                                ! function(t) {
                                    var e = t.callback,
                                        n = t.args;
                                    switch (n.length) {
                                        case 0:
                                            e();
                                            break;
                                        case 1:
                                            e(n[0]);
                                            break;
                                        case 2:
                                            e(n[0], n[1]);
                                            break;
                                        case 3:
                                            e(n[0], n[1], n[2]);
                                            break;
                                        default:
                                            e.apply(void 0, n)
                                    }
                                }(e)
                            } finally {
                                p(t), l = !1
                            }
                        }
                    }
                }
            }("undefined" === typeof self ? "undefined" === typeof t ? this : t : self)
        }).call(this, n(1), n(5))
    }, function(t, e) {
        var n, r, o = t.exports = {};

        function i() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }

        function c(t) {
            if (n === setTimeout) return setTimeout(t, 0);
            if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
            try {
                return n(t, 0)
            } catch (e) {
                try {
                    return n.call(null, t, 0)
                } catch (e) {
                    return n.call(this, t, 0)
                }
            }
        }! function() {
            try {
                n = "function" === typeof setTimeout ? setTimeout : i
            } catch (t) {
                n = i
            }
            try {
                r = "function" === typeof clearTimeout ? clearTimeout : a
            } catch (t) {
                r = a
            }
        }();
        var s, u = [],
            l = !1,
            f = -1;

        function d() {
            l && s && (l = !1, s.length ? u = s.concat(u) : f = -1, u.length && p())
        }

        function p() {
            if (!l) {
                var t = c(d);
                l = !0;
                for (var e = u.length; e;) {
                    for (s = u, u = []; ++f < e;) s && s[f].run();
                    f = -1, e = u.length
                }
                s = null, l = !1,
                    function(t) {
                        if (r === clearTimeout) return clearTimeout(t);
                        if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
                        try {
                            r(t)
                        } catch (e) {
                            try {
                                return r.call(null, t)
                            } catch (e) {
                                return r.call(this, t)
                            }
                        }
                    }(t)
            }
        }

        function h(t, e) {
            this.fun = t, this.array = e
        }

        function y() {}
        o.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            u.push(new h(t, e)), 1 !== u.length || l || c(p)
        }, h.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function(t) {
            return []
        }, o.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, o.cwd = function() {
            return "/"
        }, o.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, o.umask = function() {
            return 0
        }
    }, function(t, e, n) {
        (function(t) {
            function e(t) {
                return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            var n = function(t) {
                "use strict";
                var n = Object.prototype,
                    r = n.hasOwnProperty,
                    o = "function" === typeof Symbol ? Symbol : {},
                    i = o.iterator || "@@iterator",
                    a = o.asyncIterator || "@@asyncIterator",
                    c = o.toStringTag || "@@toStringTag";

                function s(t, e, n) {
                    return Object.defineProperty(t, e, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), t[e]
                }
                try {
                    s({}, "")
                } catch (T) {
                    s = function(t, e, n) {
                        return t[e] = n
                    }
                }

                function u(t, e, n, r) {
                    var o = e && e.prototype instanceof d ? e : d,
                        i = Object.create(o.prototype),
                        a = new L(r || []);
                    return i._invoke = function(t, e, n) {
                        var r = "suspendedStart";
                        return function(o, i) {
                            if ("executing" === r) throw new Error("Generator is already running");
                            if ("completed" === r) {
                                if ("throw" === o) throw i;
                                return O()
                            }
                            for (n.method = o, n.arg = i;;) {
                                var a = n.delegate;
                                if (a) {
                                    var c = S(a, n);
                                    if (c) {
                                        if (c === f) continue;
                                        return c
                                    }
                                }
                                if ("next" === n.method) n.sent = n._sent = n.arg;
                                else if ("throw" === n.method) {
                                    if ("suspendedStart" === r) throw r = "completed", n.arg;
                                    n.dispatchException(n.arg)
                                } else "return" === n.method && n.abrupt("return", n.arg);
                                r = "executing";
                                var s = l(t, e, n);
                                if ("normal" === s.type) {
                                    if (r = n.done ? "completed" : "suspendedYield", s.arg === f) continue;
                                    return {
                                        value: s.arg,
                                        done: n.done
                                    }
                                }
                                "throw" === s.type && (r = "completed", n.method = "throw", n.arg = s.arg)
                            }
                        }
                    }(t, n, a), i
                }

                function l(t, e, n) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, n)
                        }
                    } catch (T) {
                        return {
                            type: "throw",
                            arg: T
                        }
                    }
                }
                t.wrap = u;
                var f = {};

                function d() {}

                function p() {}

                function h() {}
                var y = {};
                s(y, i, (function() {
                    return this
                }));
                var g = Object.getPrototypeOf,
                    v = g && g(g(E([])));
                v && v !== n && r.call(v, i) && (y = v);
                var m = h.prototype = d.prototype = Object.create(y);

                function w(t) {
                    ["next", "throw", "return"].forEach((function(e) {
                        s(t, e, (function(t) {
                            return this._invoke(e, t)
                        }))
                    }))
                }

                function b(t, n) {
                    var o;
                    this._invoke = function(i, a) {
                        function c() {
                            return new n((function(o, c) {
                                ! function o(i, a, c, s) {
                                    var u = l(t[i], t, a);
                                    if ("throw" !== u.type) {
                                        var f = u.arg,
                                            d = f.value;
                                        return d && "object" === e(d) && r.call(d, "__await") ? n.resolve(d.__await).then((function(t) {
                                            o("next", t, c, s)
                                        }), (function(t) {
                                            o("throw", t, c, s)
                                        })) : n.resolve(d).then((function(t) {
                                            f.value = t, c(f)
                                        }), (function(t) {
                                            return o("throw", t, c, s)
                                        }))
                                    }
                                    s(u.arg)
                                }(i, a, o, c)
                            }))
                        }
                        return o = o ? o.then(c, c) : c()
                    }
                }

                function S(t, e) {
                    var n = t.iterator[e.method];
                    if (void 0 === n) {
                        if (e.delegate = null, "throw" === e.method) {
                            if (t.iterator.return && (e.method = "return", e.arg = void 0, S(t, e), "throw" === e.method)) return f;
                            e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                        }
                        return f
                    }
                    var r = l(n, t.iterator, e.arg);
                    if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, f;
                    var o = r.arg;
                    return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, f) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f)
                }

                function _(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                }

                function j(t) {
                    var e = t.completion || {};
                    e.type = "normal", delete e.arg, t.completion = e
                }

                function L(t) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], t.forEach(_, this), this.reset(!0)
                }

                function E(t) {
                    if (t) {
                        var e = t[i];
                        if (e) return e.call(t);
                        if ("function" === typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var n = -1,
                                o = function e() {
                                    for (; ++n < t.length;)
                                        if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
                                    return e.value = void 0, e.done = !0, e
                                };
                            return o.next = o
                        }
                    }
                    return {
                        next: O
                    }
                }

                function O() {
                    return {
                        value: void 0,
                        done: !0
                    }
                }
                return p.prototype = h, s(m, "constructor", h), s(h, "constructor", p), p.displayName = s(h, c, "GeneratorFunction"), t.isGeneratorFunction = function(t) {
                    var e = "function" === typeof t && t.constructor;
                    return !!e && (e === p || "GeneratorFunction" === (e.displayName || e.name))
                }, t.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, h) : (t.__proto__ = h, s(t, c, "GeneratorFunction")), t.prototype = Object.create(m), t
                }, t.awrap = function(t) {
                    return {
                        __await: t
                    }
                }, w(b.prototype), s(b.prototype, a, (function() {
                    return this
                })), t.AsyncIterator = b, t.async = function(e, n, r, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new b(u(e, n, r, o), i);
                    return t.isGeneratorFunction(n) ? a : a.next().then((function(t) {
                        return t.done ? t.value : a.next()
                    }))
                }, w(m), s(m, c, "Generator"), s(m, i, (function() {
                    return this
                })), s(m, "toString", (function() {
                    return "[object Generator]"
                })), t.keys = function(t) {
                    var e = [];
                    for (var n in t) e.push(n);
                    return e.reverse(),
                        function n() {
                            for (; e.length;) {
                                var r = e.pop();
                                if (r in t) return n.value = r, n.done = !1, n
                            }
                            return n.done = !0, n
                        }
                }, t.values = E, L.prototype = {
                    constructor: L,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(j), !t)
                            for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                    },
                    stop: function() {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done) throw t;
                        var e = this;

                        function n(n, r) {
                            return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), !!r
                        }
                        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                            var i = this.tryEntries[o],
                                a = i.completion;
                            if ("root" === i.tryLoc) return n("end");
                            if (i.tryLoc <= this.prev) {
                                var c = r.call(i, "catchLoc"),
                                    s = r.call(i, "finallyLoc");
                                if (c && s) {
                                    if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                                    if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                                } else if (c) {
                                    if (this.prev < i.catchLoc) return n(i.catchLoc, !0)
                                } else {
                                    if (!s) throw new Error("try statement without catch or finally");
                                    if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var o = this.tryEntries[n];
                            if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var i = o;
                                break
                            }
                        }
                        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                        var a = i ? i.completion : {};
                        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, f) : this.complete(a)
                    },
                    complete: function(t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), f
                    },
                    finish: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), j(n), f
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.tryLoc === t) {
                                var r = n.completion;
                                if ("throw" === r.type) {
                                    var o = r.arg;
                                    j(n)
                                }
                                return o
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                    delegateYield: function(t, e, n) {
                        return this.delegate = {
                            iterator: E(t),
                            resultName: e,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = void 0), f
                    }
                }, t
            }("object" === e(t) ? t.exports : {});
            try {
                regeneratorRuntime = n
            } catch (r) {
                "object" === ("undefined" === typeof globalThis ? "undefined" : e(globalThis)) ? globalThis.regeneratorRuntime = n: Function("r", "regeneratorRuntime = r")(n)
            }
        }).call(this, n(7)(t))
    }, function(t, e) {
        t.exports = function(t) {
            return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function() {
                    return t.l
                }
            }), Object.defineProperty(t, "id", {
                enumerable: !0,
                get: function() {
                    return t.i
                }
            }), t.webpackPolyfill = 1), t
        }
    }, function(t, e, n) {
        var r = n(9),
            o = n(10);
        t.exports = function(t, e, n) {
            var i = e && n || 0;
            "string" == typeof t && (e = "binary" === t ? new Array(16) : null, t = null);
            var a = (t = t || {}).random || (t.rng || r)();
            if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, e)
                for (var c = 0; c < 16; ++c) e[i + c] = a[c];
            return e || o(a)
        }
    }, function(t, e) {
        var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (n) {
            var r = new Uint8Array(16);
            t.exports = function() {
                return n(r), r
            }
        } else {
            var o = new Array(16);
            t.exports = function() {
                for (var t, e = 0; e < 16; e++) 0 === (3 & e) && (t = 4294967296 * Math.random()), o[e] = t >>> ((3 & e) << 3) & 255;
                return o
            }
        }
    }, function(t, e) {
        for (var n = [], r = 0; r < 256; ++r) n[r] = (r + 256).toString(16).substr(1);
        t.exports = function(t, e) {
            var r = e || 0,
                o = n;
            return [o[t[r++]], o[t[r++]], o[t[r++]], o[t[r++]], "-", o[t[r++]], o[t[r++]], "-", o[t[r++]], o[t[r++]], "-", o[t[r++]], o[t[r++]], "-", o[t[r++]], o[t[r++]], o[t[r++]], o[t[r++]], o[t[r++]], o[t[r++]]].join("")
        }
    }, function(t) {
        t.exports = JSON.parse('{"name":"@common/fp-launchpad","version":"1.0.1-beta.1","description":"Client-side SDK for Launchpad","scripts":{"build:package":"babel ./src -d ./lib","build":"webpack --config ./webpack/webpack.config.prod.js","build:staging":"webpack --config ./webpack/webpack.config.staging.js","test":"jest --silent"},"author":"Farportal NPD","license":"ISC","devDependencies":{"@babel/cli":"^7.10.1","@babel/core":"^7.10.2","@babel/node":"^7.10.1","@babel/plugin-proposal-class-properties":"^7.10.1","@babel/plugin-proposal-object-rest-spread":"^7.10.1","@babel/plugin-syntax-dynamic-import":"^7.8.3","@babel/plugin-transform-modules-commonjs":"^7.10.1","@babel/plugin-transform-runtime":"^7.10.1","@babel/polyfill":"^7.10.1","@babel/preset-env":"^7.11.5","@babel/preset-react":"^7.10.1","@babel/register":"^7.10.1","babel-core":"^7.0.0-bridge.0","babel-eslint":"^8.2.3","babel-jest":"^24.5.0","babel-loader":"8.0.5","babel-preset-es2015":"^6.24.1","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-dynamic-import-node":"^2.3.3","babel-plugin-react-display-name":"^2.0.0","babel-plugin-webpack-alias":"^2.1.2","babel-plugin-webpack-alias-7":"^0.1.1","chai":"^4.1.2","clean-webpack-plugin":"^0.1.19","cross-env":"^5.2.0","html-webpack-plugin":"^3.2.0","jest":"^26.4.2","jest-fetch-mock":"^1.6.6","jquery":"^3.3.1","sinon":"^5.0.7","terser-webpack-plugin":"^3.0.7","uglifyjs-webpack-plugin":"^1.2.5","utf8":"^3.0.0","uuid":"^3.2.1","webpack":"^4.8.3","webpack-cli":"^3.3.11","webpack-dev-server":"^3.1.4","webpack-merge":"^4.2.2"},"dependencies":{"npm":"^6.0.1","promise-polyfill":"8.1.0","whatwg-fetch":"^3.0.0"}}')
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        n.r(e), n.d(e, "init", (function() {
            return It
        })), n.d(e, "isInitialized", (function() {
            return mt
        })), n.d(e, "initEvents", (function() {
            return Ct
        })), n.d(e, "isEventInitialized", (function() {
            return wt
        })), n.d(e, "assignToTests", (function() {
            return Pt
        })), n.d(e, "assignToTest", (function() {
            return Ft
        })), n.d(e, "forceAssignToTest", (function() {
            return Nt
        })), n.d(e, "getAssignedTestVariation", (function() {
            return Dt
        })), n.d(e, "isAssignedToTestVariation", (function() {
            return Bt
        })), n.d(e, "logEvent", (function() {
            return Ut
        })), n.d(e, "addAttribute", (function() {
            return Gt
        })), n.d(e, "getAttributes", (function() {
            return zt
        }));
        var o = "undefined" !== typeof globalThis && globalThis || "undefined" !== typeof self && self || "undefined" !== typeof o && o,
            i = "URLSearchParams" in o,
            a = "Symbol" in o && "iterator" in Symbol,
            c = "FileReader" in o && "Blob" in o && function() {
                try {
                    return new Blob, !0
                } catch (t) {
                    return !1
                }
            }(),
            s = "FormData" in o,
            u = "ArrayBuffer" in o;
        if (u) var l = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
            f = ArrayBuffer.isView || function(t) {
                return t && l.indexOf(Object.prototype.toString.call(t)) > -1
            };

        function d(t) {
            if ("string" !== typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t) || "" === t) throw new TypeError('Invalid character in header field name: "' + t + '"');
            return t.toLowerCase()
        }

        function p(t) {
            return "string" !== typeof t && (t = String(t)), t
        }

        function h(t) {
            var e = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    }
                }
            };
            return a && (e[Symbol.iterator] = function() {
                return e
            }), e
        }

        function y(t) {
            this.map = {}, t instanceof y ? t.forEach((function(t, e) {
                this.append(e, t)
            }), this) : Array.isArray(t) ? t.forEach((function(t) {
                this.append(t[0], t[1])
            }), this) : t && Object.getOwnPropertyNames(t).forEach((function(e) {
                this.append(e, t[e])
            }), this)
        }

        function g(t) {
            if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0
        }

        function v(t) {
            return new Promise((function(e, n) {
                t.onload = function() {
                    e(t.result)
                }, t.onerror = function() {
                    n(t.error)
                }
            }))
        }

        function m(t) {
            var e = new FileReader,
                n = v(e);
            return e.readAsArrayBuffer(t), n
        }

        function w(t) {
            if (t.slice) return t.slice(0);
            var e = new Uint8Array(t.byteLength);
            return e.set(new Uint8Array(t)), e.buffer
        }

        function b() {
            return this.bodyUsed = !1, this._initBody = function(t) {
                var e;
                this.bodyUsed = this.bodyUsed, this._bodyInit = t, t ? "string" === typeof t ? this._bodyText = t : c && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : s && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : i && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : u && c && ((e = t) && DataView.prototype.isPrototypeOf(e)) ? (this._bodyArrayBuffer = w(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u && (ArrayBuffer.prototype.isPrototypeOf(t) || f(t)) ? this._bodyArrayBuffer = w(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = "", this.headers.get("content-type") || ("string" === typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : i && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, c && (this.blob = function() {
                var t = g(this);
                if (t) return t;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                if (this._bodyArrayBuffer) {
                    var t = g(this);
                    return t || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer))
                }
                return this.blob().then(m)
            }), this.text = function() {
                var t, e, n, r = g(this);
                if (r) return r;
                if (this._bodyBlob) return t = this._bodyBlob, e = new FileReader, n = v(e), e.readAsText(t), n;
                if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                    for (var e = new Uint8Array(t), n = new Array(e.length), r = 0; r < e.length; r++) n[r] = String.fromCharCode(e[r]);
                    return n.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, s && (this.formData = function() {
                return this.text().then(j)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }
        y.prototype.append = function(t, e) {
            t = d(t), e = p(e);
            var n = this.map[t];
            this.map[t] = n ? n + ", " + e : e
        }, y.prototype.delete = function(t) {
            delete this.map[d(t)]
        }, y.prototype.get = function(t) {
            return t = d(t), this.has(t) ? this.map[t] : null
        }, y.prototype.has = function(t) {
            return this.map.hasOwnProperty(d(t))
        }, y.prototype.set = function(t, e) {
            this.map[d(t)] = p(e)
        }, y.prototype.forEach = function(t, e) {
            for (var n in this.map) this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this)
        }, y.prototype.keys = function() {
            var t = [];
            return this.forEach((function(e, n) {
                t.push(n)
            })), h(t)
        }, y.prototype.values = function() {
            var t = [];
            return this.forEach((function(e) {
                t.push(e)
            })), h(t)
        }, y.prototype.entries = function() {
            var t = [];
            return this.forEach((function(e, n) {
                t.push([n, e])
            })), h(t)
        }, a && (y.prototype[Symbol.iterator] = y.prototype.entries);
        var S = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

        function _(t, e) {
            if (!(this instanceof _)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
            var n, r, o = (e = e || {}).body;
            if (t instanceof _) {
                if (t.bodyUsed) throw new TypeError("Already read");
                this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new y(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, o || null == t._bodyInit || (o = t._bodyInit, t.bodyUsed = !0)
            } else this.url = String(t);
            if (this.credentials = e.credentials || this.credentials || "same-origin", !e.headers && this.headers || (this.headers = new y(e.headers)), this.method = (n = e.method || this.method || "GET", r = n.toUpperCase(), S.indexOf(r) > -1 ? r : n), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
            if (this._initBody(o), ("GET" === this.method || "HEAD" === this.method) && ("no-store" === e.cache || "no-cache" === e.cache)) {
                var i = /([?&])_=[^&]*/;
                if (i.test(this.url)) this.url = this.url.replace(i, "$1_=" + (new Date).getTime());
                else {
                    this.url += (/\?/.test(this.url) ? "&" : "?") + "_=" + (new Date).getTime()
                }
            }
        }

        function j(t) {
            var e = new FormData;
            return t.trim().split("&").forEach((function(t) {
                if (t) {
                    var n = t.split("="),
                        r = n.shift().replace(/\+/g, " "),
                        o = n.join("=").replace(/\+/g, " ");
                    e.append(decodeURIComponent(r), decodeURIComponent(o))
                }
            })), e
        }

        function L(t, e) {
            if (!(this instanceof L)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
            e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = void 0 === e.statusText ? "" : "" + e.statusText, this.headers = new y(e.headers), this.url = e.url || "", this._initBody(t)
        }
        _.prototype.clone = function() {
            return new _(this, {
                body: this._bodyInit
            })
        }, b.call(_.prototype), b.call(L.prototype), L.prototype.clone = function() {
            return new L(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new y(this.headers),
                url: this.url
            })
        }, L.error = function() {
            var t = new L(null, {
                status: 0,
                statusText: ""
            });
            return t.type = "error", t
        };
        var E = [301, 302, 303, 307, 308];
        L.redirect = function(t, e) {
            if (-1 === E.indexOf(e)) throw new RangeError("Invalid status code");
            return new L(null, {
                status: e,
                headers: {
                    location: t
                }
            })
        };
        var O = o.DOMException;
        try {
            new O
        } catch (Wt) {
            (O = function(t, e) {
                this.message = t, this.name = e;
                var n = Error(t);
                this.stack = n.stack
            }).prototype = Object.create(Error.prototype), O.prototype.constructor = O
        }

        function T(t, e) {
            return new Promise((function(n, i) {
                var a = new _(t, e);
                if (a.signal && a.signal.aborted) return i(new O("Aborted", "AbortError"));
                var s = new XMLHttpRequest;

                function l() {
                    s.abort()
                }
                s.onload = function() {
                    var t, e, r = {
                        status: s.status,
                        statusText: s.statusText,
                        headers: (t = s.getAllResponseHeaders() || "", e = new y, t.replace(/\r?\n[\t ]+/g, " ").split("\r").map((function(t) {
                            return 0 === t.indexOf("\n") ? t.substr(1, t.length) : t
                        })).forEach((function(t) {
                            var n = t.split(":"),
                                r = n.shift().trim();
                            if (r) {
                                var o = n.join(":").trim();
                                e.append(r, o)
                            }
                        })), e)
                    };
                    r.url = "responseURL" in s ? s.responseURL : r.headers.get("X-Request-URL");
                    var o = "response" in s ? s.response : s.responseText;
                    setTimeout((function() {
                        n(new L(o, r))
                    }), 0)
                }, s.onerror = function() {
                    setTimeout((function() {
                        i(new TypeError("Network request failed"))
                    }), 0)
                }, s.ontimeout = function() {
                    setTimeout((function() {
                        i(new TypeError("Network request failed"))
                    }), 0)
                }, s.onabort = function() {
                    setTimeout((function() {
                        i(new O("Aborted", "AbortError"))
                    }), 0)
                }, s.open(a.method, function(t) {
                    try {
                        return "" === t && o.location.href ? o.location.href : t
                    } catch (e) {
                        return t
                    }
                }(a.url), !0), "include" === a.credentials ? s.withCredentials = !0 : "omit" === a.credentials && (s.withCredentials = !1), "responseType" in s && (c ? s.responseType = "blob" : u && a.headers.get("Content-Type") && -1 !== a.headers.get("Content-Type").indexOf("application/octet-stream") && (s.responseType = "arraybuffer")), !e || "object" !== r(e.headers) || e.headers instanceof y ? a.headers.forEach((function(t, e) {
                    s.setRequestHeader(e, t)
                })) : Object.getOwnPropertyNames(e.headers).forEach((function(t) {
                    s.setRequestHeader(t, p(e.headers[t]))
                })), a.signal && (a.signal.addEventListener("abort", l), s.onreadystatechange = function() {
                    4 === s.readyState && a.signal.removeEventListener("abort", l)
                }), s.send("undefined" === typeof a._bodyInit ? null : a._bodyInit)
            }))
        }
        T.polyfill = !0, o.fetch || (o.fetch = T, o.Headers = y, o.Request = _, o.Response = L);
        var x = n(0);
        window.Promise || (window.Promise = x.a), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
            value: function(t, e) {
                if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                for (var n = Object(t), r = 1; r < arguments.length; r++) {
                    var o = arguments[r];
                    if (null != o)
                        for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
                }
                return n
            },
            writable: !0,
            configurable: !0
        });
        n(6);

        function R(t) {
            return (R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        var k = {
            delCookie: function(t) {
                document.cookie = t + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
            },
            setCookie: function(t, e, n) {
                try {
                    var r = new Date;
                    r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3);
                    var o = "expires=" + r.toUTCString();
                    document.cookie = t + "=" + e + ";" + o + ";path=/"
                } catch (i) {
                    console.log(i)
                }
            },
            getCookie: function(t) {
                try {
                    for (var e = t + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
                        for (var o = n[r];
                            " " === o.charAt(0);) o = o.substring(1);
                        if (0 === o.indexOf(e)) return o.substring(e.length, o.length)
                    }
                } catch (i) {
                    console.log(i)
                }
                return ""
            },
            delLocalStorage: function(t) {
                try {
                    window.localStorage && window.localStorage.hasOwnProperty(t) && window.localStorage.removeItem(t)
                } catch (e) {
                    console.log(e)
                }
            },
            setLocalStorage: function(t, e) {
                try {
                    window.localStorage && ("object" == R(e) ? window.localStorage.setItem(t, JSON.stringify(e)) : window.localStorage.setItem(t, e))
                } catch (n) {
                    console.log(n)
                }
            },
            getLocalStorage: function(t) {
                try {
                    if (window.localStorage && window.localStorage.hasOwnProperty(t)) return window.localStorage.getItem(t)
                } catch (e) {
                    console.log(e)
                }
                return null
            },
            delSessionStorage: function(t) {
                try {
                    window.sessionStorage && window.sessionStorage.hasOwnProperty(t) && window.sessionStorage.removeItem(t)
                } catch (e) {
                    console.log(e)
                }
            },
            setSessionStorage: function(t, e) {
                try {
                    window.sessionStorage && ("object" == R(e) ? window.sessionStorage.setItem(t, JSON.stringify(e)) : window.sessionStorage.setItem(t, e))
                } catch (n) {
                    console.log(n)
                }
            },
            getSessionStorage: function(t) {
                try {
                    if (window.sessionStorage && window.sessionStorage.hasOwnProperty(t)) return window.sessionStorage.getItem(t)
                } catch (e) {
                    console.log(e)
                }
                return null
            },
            sessionStorageContainKeyWith: function(t) {
                if (window.sessionStorage)
                    for (var e = 0; e < window.sessionStorage.length; e++)
                        if (window.sessionStorage.key(e).indexOf(t) > -1) return t
            },
            loadScriptAsync: function(t, e, n) {
                var r, o = e;
                document.getElementById(o) || ((r = document.createElement("script")).id = o, r.async = !0, r.src = t, n && (r.onload = n), document.getElementsByTagName("head")[0].appendChild(r))
            }
        };

        function C(t) {
            return (C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        var I, A, P = (I = null, A = {
                init: function(t) {
                    I = t
                },
                delCookie: function(t) {
                    I.delStorage(t)
                },
                setCookie: function(t, e, n) {
                    I.setStorage(t, e)
                },
                getCookie: function(t) {
                    return I.getStorage(t)
                },
                delLocalStorage: function(t) {
                    I.delStorage(t)
                },
                setLocalStorage: function(t, e) {
                    "object" == C(e) ? I.setStorage(t, JSON.stringify(e)) : I.setStorage(t, e)
                },
                getLocalStorage: function(t) {
                    return I.getStorage(t)
                },
                delSessionStorage: function(t) {
                    I.delStorage(t)
                },
                setSessionStorage: function(t, e) {
                    I.setStorage(t, e)
                },
                getSessionStorage: function(t) {
                    return I.getStorage(t)
                }
            }, {
                instance: function() {
                    return A
                }
            }),
            F = function() {
                var t, e = null,
                    n = !1,
                    r = null,
                    o = function(e, n) {
                        return t + "/" + encodeURIComponent(e) + "?subjectid=" + encodeURIComponent(n)
                    },
                    i = function(t, e) {
                        return {
                            success: !1,
                            data: t.map((function(t) {
                                return Object.assign({}, e, {
                                    testCode: t
                                })
                            }))
                        }
                    },
                    a = function(t) {
                        return fetch(t, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then((function(t) {
                            if (200 === t.status) return t.json();
                            throw new Error("Assignment API Failed")
                        }))
                    },
                    c = {
                        init: function(o) {
                            return o ? o.projectid ? (e && !0 !== o._reinitialize || (e = new x.a((function(e, i) {
                                r = o.projectid, t = o.stagingUrl ? o.stagingUrl : "https://launchpadapiassignment.azure.fareportal.com/api/assignment", n = !0, e()
                            }))), e) : (e = null, n = !1, console.warn("Launchpad Sdk ERROR: Missing projectid."), x.a.reject("projectid was not passed.")) : (e = null, n = !1, console.warn("Launchpad Sdk ERROR: No options were passed to AssignmentProvider."), x.a.reject("options must be passed into init"))
                        },
                        assignToTest: function(t, e, n, r, o) {
                            return this.assignToTests([t], e, n, r, o).then((function(t) {
                                return {
                                    success: t.success,
                                    data: t.data[0]
                                }
                            }))
                        },
                        assignToTests: function(t, e, n, c, s) {
                            for (var u = {
                                    testId: void 0,
                                    variation: c,
                                    modification: s,
                                    iseditable: !1
                                }, l = Object.keys(n), f = [], d = 0; d < l.length; d++) {
                                var p = l[d];
                                f.push(p + "=" + n[p])
                            }
                            var h = t.map((function(t) {
                                    return "".concat("testcode", "=").concat(encodeURIComponent(t))
                                })).join("&"),
                                y = o(r, e) + "&".concat(h) + "&defaultVariation=".concat(encodeURIComponent(c)) + "&defaultModification=".concat(encodeURIComponent(s)) + "&".concat(f.join("&")),
                                g = !0;
                            return a(y).then((function(e) {
                                if (e && e.success && e.data && e.data.length > 0) {
                                    var n = e.data.map((function(e, n) {
                                        var r = Object.assign({}, u, {
                                            testCode: t[n]
                                        });
                                        return e && e.variation && e.testId ? (e.iseditable = !1, r = e) : g = !1, r
                                    }));
                                    return {
                                        success: g,
                                        data: n
                                    }
                                }
                                return i(t, u)
                            }), (function(e, n, r) {
                                return console.warn("Launchpad Sdk ERROR: Assignment API Failed"), i(t, u)
                            }))
                        },
                        forceAssignToTest: function(t, e, n, i, c) {
                            for (var s = Object.keys(i), u = [], l = 0; l < s.length; l++) {
                                var f = s[l];
                                u.push(f + "=" + i[f])
                            }
                            var d = "";
                            c || (d += "%[track-events]"), d += "%[user-id]$".concat(n, "%").concat(t, "$").concat(e);
                            var p = o(r, d) + "&".concat("testcode", "=").concat(encodeURIComponent(t)) + "&".concat(u.join("&"));
                            return a(p).then((function(t) {
                                return t && t.success && t.data && t.data.length > 0 && t.data[0] && t.data[0].variation && t.data[0].testId ? {
                                    success: !0,
                                    data: t.data[0]
                                } : {
                                    success: !1
                                }
                            }), (function(t, e, n) {
                                return console.warn("Launchpad Sdk ERROR: Assignment API Failed"), {
                                    success: !1
                                }
                            }))
                        },
                        getSnippetForPreView: function(e, n, r) {
                            var o = "".concat(t, "/preview/").concat(e, "/").concat(n, "/").concat(r);
                            return a(o).then((function(t) {
                                return t && t.success && t.data && t.data.length > 0 ? {
                                    success: !0,
                                    data: t.data
                                } : {
                                    success: !1
                                }
                            }), (function(t, e, n) {
                                return console.warn("Launchpad Sdk ERROR: Assignment API Failed for preview"), {
                                    success: !1
                                }
                            }))
                        }
                    };
                return {
                    instance: function() {
                        return c
                    },
                    isInitialized: function() {
                        return !!e && n
                    }
                }
            }();

        function N(t) {
            return (N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function D() {
            D = function() {
                return t
            };
            var t = {},
                e = Object.prototype,
                n = e.hasOwnProperty,
                r = "function" == typeof Symbol ? Symbol : {},
                o = r.iterator || "@@iterator",
                i = r.asyncIterator || "@@asyncIterator",
                a = r.toStringTag || "@@toStringTag";

            function c(t, e, n) {
                return Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), t[e]
            }
            try {
                c({}, "")
            } catch (Wt) {
                c = function(t, e, n) {
                    return t[e] = n
                }
            }

            function s(t, e, n, r) {
                var o = e && e.prototype instanceof f ? e : f,
                    i = Object.create(o.prototype),
                    a = new j(r || []);
                return i._invoke = function(t, e, n) {
                    var r = "suspendedStart";
                    return function(o, i) {
                        if ("executing" === r) throw new Error("Generator is already running");
                        if ("completed" === r) {
                            if ("throw" === o) throw i;
                            return E()
                        }
                        for (n.method = o, n.arg = i;;) {
                            var a = n.delegate;
                            if (a) {
                                var c = b(a, n);
                                if (c) {
                                    if (c === l) continue;
                                    return c
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if ("suspendedStart" === r) throw r = "completed", n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = "executing";
                            var s = u(t, e, n);
                            if ("normal" === s.type) {
                                if (r = n.done ? "completed" : "suspendedYield", s.arg === l) continue;
                                return {
                                    value: s.arg,
                                    done: n.done
                                }
                            }
                            "throw" === s.type && (r = "completed", n.method = "throw", n.arg = s.arg)
                        }
                    }
                }(t, n, a), i
            }

            function u(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    }
                } catch (Wt) {
                    return {
                        type: "throw",
                        arg: Wt
                    }
                }
            }
            t.wrap = s;
            var l = {};

            function f() {}

            function d() {}

            function p() {}
            var h = {};
            c(h, o, (function() {
                return this
            }));
            var y = Object.getPrototypeOf,
                g = y && y(y(L([])));
            g && g !== e && n.call(g, o) && (h = g);
            var v = p.prototype = f.prototype = Object.create(h);

            function m(t) {
                ["next", "throw", "return"].forEach((function(e) {
                    c(t, e, (function(t) {
                        return this._invoke(e, t)
                    }))
                }))
            }

            function w(t, e) {
                var r;
                this._invoke = function(o, i) {
                    function a() {
                        return new e((function(r, a) {
                            ! function r(o, i, a, c) {
                                var s = u(t[o], t, i);
                                if ("throw" !== s.type) {
                                    var l = s.arg,
                                        f = l.value;
                                    return f && "object" == N(f) && n.call(f, "__await") ? e.resolve(f.__await).then((function(t) {
                                        r("next", t, a, c)
                                    }), (function(t) {
                                        r("throw", t, a, c)
                                    })) : e.resolve(f).then((function(t) {
                                        l.value = t, a(l)
                                    }), (function(t) {
                                        return r("throw", t, a, c)
                                    }))
                                }
                                c(s.arg)
                            }(o, i, r, a)
                        }))
                    }
                    return r = r ? r.then(a, a) : a()
                }
            }

            function b(t, e) {
                var n = t.iterator[e.method];
                if (void 0 === n) {
                    if (e.delegate = null, "throw" === e.method) {
                        if (t.iterator.return && (e.method = "return", e.arg = void 0, b(t, e), "throw" === e.method)) return l;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return l
                }
                var r = u(n, t.iterator, e.arg);
                if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, l;
                var o = r.arg;
                return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, l) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, l)
            }

            function S(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
            }

            function _(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e
            }

            function j(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], t.forEach(S, this), this.reset(!0)
            }

            function L(t) {
                if (t) {
                    var e = t[o];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var r = -1,
                            i = function e() {
                                for (; ++r < t.length;)
                                    if (n.call(t, r)) return e.value = t[r], e.done = !1, e;
                                return e.value = void 0, e.done = !0, e
                            };
                        return i.next = i
                    }
                }
                return {
                    next: E
                }
            }

            function E() {
                return {
                    value: void 0,
                    done: !0
                }
            }
            return d.prototype = p, c(v, "constructor", p), c(p, "constructor", d), d.displayName = c(p, a, "GeneratorFunction"), t.isGeneratorFunction = function(t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name))
            }, t.mark = function(t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, p) : (t.__proto__ = p, c(t, a, "GeneratorFunction")), t.prototype = Object.create(v), t
            }, t.awrap = function(t) {
                return {
                    __await: t
                }
            }, m(w.prototype), c(w.prototype, i, (function() {
                return this
            })), t.AsyncIterator = w, t.async = function(e, n, r, o, i) {
                void 0 === i && (i = Promise);
                var a = new w(s(e, n, r, o), i);
                return t.isGeneratorFunction(n) ? a : a.next().then((function(t) {
                    return t.done ? t.value : a.next()
                }))
            }, m(v), c(v, a, "Generator"), c(v, o, (function() {
                return this
            })), c(v, "toString", (function() {
                return "[object Generator]"
            })), t.keys = function(t) {
                var e = [];
                for (var n in t) e.push(n);
                return e.reverse(),
                    function n() {
                        for (; e.length;) {
                            var r = e.pop();
                            if (r in t) return n.value = r, n.done = !1, n
                        }
                        return n.done = !0, n
                    }
            }, t.values = L, j.prototype = {
                constructor: j,
                reset: function(t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(_), !t)
                        for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type) throw t.arg;
                    return this.rval
                },
                dispatchException: function(t) {
                    if (this.done) throw t;
                    var e = this;

                    function r(n, r) {
                        return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), !!r
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var i = this.tryEntries[o],
                            a = i.completion;
                        if ("root" === i.tryLoc) return r("end");
                        if (i.tryLoc <= this.prev) {
                            var c = n.call(i, "catchLoc"),
                                s = n.call(i, "finallyLoc");
                            if (c && s) {
                                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                            } else if (c) {
                                if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                            } else {
                                if (!s) throw new Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(t, e) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var o = this.tryEntries[r];
                        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var i = o;
                            break
                        }
                    }
                    i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                    var a = i ? i.completion : {};
                    return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, l) : this.complete(a)
                },
                complete: function(t, e) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), l
                },
                finish: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), _(n), l
                    }
                },
                catch: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.tryLoc === t) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var o = r.arg;
                                _(n)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(t, e, n) {
                    return this.delegate = {
                        iterator: L(t),
                        resultName: e,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = void 0), l
                }
            }, t
        }

        function B(t, e, n, r, o, i, a) {
            try {
                var c = t[i](a),
                    s = c.value
            } catch (u) {
                return void n(u)
            }
            c.done ? e(s) : Promise.resolve(s).then(r, o)
        }
        var U = function() {
                var t, e, n, r = null,
                    o = !1,
                    i = null,
                    a = {
                        init: function(e) {
                            if (!e) return console.warn("Launchpad Sdk ERROR: No options were passed to EventHubsProvider."), r = null, o = !1, x.a.reject("options must be passed into init");
                            if (!e.projectid || !e.config) {
                                var n = e.projectid ? "Shared Access Signature" : "projectid";
                                return r = null, o = !1, console.warn("Launchpad Sdk ERROR: Missing " + n), x.a.reject("".concat(n, " was not passed."))
                            }
                            return r && !0 !== e._reinitialize || (r = new x.a((function(n, r) {
                                i = e.config;
                                try {
                                    for (var a = e.config.substring("SharedAccessSignature".length + 1).split("&"), c = 0; c < a.length; c++)
                                        if (a[c].indexOf("sr") > -1) {
                                            t = unescape(a[c].split("=")[1]);
                                            break
                                        }
                                } catch (s) {
                                    console.warn("Launchpad Sdk ERROR: Failed to parse config value in EventsHubProvider."), r("config was not parsed correctly.")
                                }
                                o = !0, n(!0)
                            }))), r
                        },
                        logEvent: (e = D().mark((function e(n) {
                            var r, o, a;
                            return D().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return r = t + "/messages", o = {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/atom+xml;type=entry;charset=utf-8",
                                                Authorization: i
                                            },
                                            body: JSON.stringify(n)
                                        }, (a = fetch(r, o)).catch((function(t) {
                                            window.Launchpad.addAttribute("hub_error", t.message || "error"), console.warn(t)
                                        })), e.abrupt("return", a);
                                    case 5:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })), n = function() {
                            var t = this,
                                n = arguments;
                            return new Promise((function(r, o) {
                                var i = e.apply(t, n);

                                function a(t) {
                                    B(i, r, o, a, c, "next", t)
                                }

                                function c(t) {
                                    B(i, r, o, a, c, "throw", t)
                                }
                                a(void 0)
                            }))
                        }, function(t) {
                            return n.apply(this, arguments)
                        }),
                        updateConfig: function(t) {
                            return t ? (i = t, !0) : (console.warn("Launchpad Sdk ERROR: config cannot be empty."), !1)
                        }
                    };
                return {
                    instance: function() {
                        return a
                    },
                    isInitialized: function() {
                        return !!r && o
                    }
                }
            }(),
            G = {
                LS_CS_KEY: "lp_cs_",
                Test_Code_NAME: "testcodes",
                Test_Code: "TestCodes=",
                UrlQueryStringPreView: "lp_variation_preView",
                LpFlagId: "lp_flag_id",
                LpVariation: "lp_flag_variation",
                LpJsContent: "jscontent",
                LpCssContent: "csscontent",
                PingerInterval: 3e5
            },
            M = function() {
                var t = null,
                    e = k,
                    n = {
                        isInitialized: !1,
                        projectid: null,
                        publisher: null,
                        config: null,
                        expiresOn: null,
                        testcodes: []
                    },
                    r = function(t) {
                        if (t && new Date(t) - new Date > 18e4) return !1;
                        return !0
                    },
                    o = function(t) {
                        var e = {};
                        return t.replace(/\&amp;/gi, "&").split(";").forEach((function(t) {
                            if (t && t.length > 0) {
                                var n, r = t.toLowerCase().indexOf("config=");
                                if (r > -1) {
                                    var o = r + "config=".length;
                                    n = t.substring(o), e.config = n
                                } else {
                                    var i = t.split("=");
                                    e[i[0].toLowerCase()] = i[1]
                                }
                                try {
                                    if (t.toLowerCase().indexOf(G.Test_Code_NAME + "=") > -1) {
                                        var a = t.split("=");
                                        if (a.length > 1) {
                                            var c = a[1].split(",");
                                            e[G.Test_Code_NAME] = c
                                        } else e[G.Test_Code_NAME] = []
                                    } else e[G.Test_Code_NAME] = []
                                } catch (s) {
                                    console.error("Launchpad sdk error while fetching testcodes:".concat(s))
                                }
                            }
                        })), e
                    },
                    i = function(t) {
                        var e = "https://launchpadapiassignment.azure.fareportal.com/api/settings/".concat(t);
                        return fetch(e, {
                            method: "GET"
                        }).then((function(t) {
                            return 200 === t.status && t.text()
                        })).catch((function(t) {
                            return console.warn("Launchpad Sdk ERROR: API call to get ConnectionString failed."), !1
                        }))
                    },
                    a = function(t) {
                        if (t.connectionString) try {
                            var o = t.connectionString.indexOf("se="),
                                a = t.connectionString.indexOf("&skn="),
                                u = t.connectionString.substring(o + "se=".length, a),
                                l = new Date(1e3 * u);
                            if (!r(l)) return c(t.connectionString), n.expiresOn = l, x.a.resolve(t.connectionString);
                            console.log("connectionString is Expired will store data again.")
                        } catch (y) {
                            console.log("Launchpad Sdk INFO: Failed to parse expire time from passed in connectionString.")
                        }
                        var f = e.getLocalStorage(G.LS_CS_KEY + t.projectid);
                        if (f) try {
                            var d = JSON.parse(f),
                                p = d.expiresOn,
                                h = d.connectionString;
                            if (!r(p)) return c(h), n.expiresOn = p, x.a.resolve(h);
                            console.log("connectionString is Expired will store data again!")
                        } catch (y) {
                            console.log("Launchpad Sdk INFO: Failed to parse connectionString from LS.")
                        }
                        return i(t.projectid).then(s)
                    },
                    c = function(t) {
                        if (t.toLowerCase().indexOf(G.Test_Code_NAME + "=") > -1) {
                            var e = t.split(G.Test_Code);
                            if (e.length > 1) {
                                var r = e[1].split(",");
                                n.testcodes = r
                            }
                        }
                    },
                    s = function(t) {
                        if (t) {
                            var r = new Date;
                            return r.setTime(r.getTime() + 72e6), e.setLocalStorage(G.LS_CS_KEY + n.projectid, JSON.stringify({
                                connectionString: t,
                                expiresOn: r.toISOString()
                            })), n.expiresOn = r.toISOString(), t
                        }
                        return !1
                    },
                    u = {
                        init: function(r) {
                            return r ? r.projectid ? (void 0 !== r.helpers && null !== r.helpers && ("function" == typeof r.helpers.delStorage && "function" == typeof r.helpers.setStorage && "function" == typeof r.helpers.getStorage ? (e = P.instance()).init(r.helpers) : console.warn("Launchpad Sdk ERROR: Helpers option was passed. It seems does not contain either delStorage, setStorage or getStorage")), t && !0 !== r._reinitialize || (t = new x.a((function(t, e) {
                                n.projectid = r.projectid, a(r).then((function(r) {
                                    if (r) try {
                                        (n = Object.assign({}, n, o(r))).isInitialized = !0, t(n)
                                    } catch (i) {
                                        return console.warn("Launchpad Sdk ERROR: Could not parse connectionString correctly."), x.a.reject("connectionString was not parsed correctly.")
                                    } else e("failed to get connectionString")
                                }))
                            }))), t) : (t = null, n.isInitialized = !1, n.projectid = null, console.warn("Launchpad Sdk ERROR: Missing projectid."), x.a.reject("projectid was not passed.")) : (console.warn("Launchpad Sdk ERROR: No options were passed to ConnectionStringProvider."), t = null, n.isInitialized = !1, x.a.reject("options must be passed into init"))
                        },
                        get: function(t) {
                            return n[t] ? n[t] : ""
                        },
                        startRefreshListener: function(t) {
                            var e = 7182e4;
                            if (n.expiresOn) {
                                var r = new Date(n.expiresOn),
                                    i = new Date;
                                e = 72e6 - (r.getTime() - i.getTime()) + 18e4
                            }
                            setTimeout((function() {
                                a({
                                    projectid: n.projectid
                                }).then((function(e) {
                                    if (e) try {
                                        n = Object.assign({}, n, o(e)), t()
                                    } catch (r) {
                                        console.warn("Launchpad Sdk ERROR: Could not parse connectionString correctly.")
                                    }
                                }))
                            }), e)
                        },
                        updateCacheConnectionString: function(t) {
                            return new x.a((function(e, r) {
                                i(t).then((function(t) {
                                    if (t) try {
                                        n = Object.assign({}, n, o(t)), s(t) ? e(!0) : (console.warn("Launchpad Sdk ERROR: Could not update connectionString in local storage."), r(!1))
                                    } catch (i) {
                                        console.warn("Launchpad Sdk ERROR: Could not parse connectionString correctly." + i), r(!1)
                                    }
                                })).catch((function(t) {
                                    console.warn("Launchpad Sdk ERROR:" + t), r(!1)
                                }))
                            }))
                        }
                    };
                return {
                    instance: function() {
                        return u
                    },
                    isInitialized: function() {
                        return !!t && n.isInitialized
                    }
                }
            }(),
            z = function(t) {
                this.id = t, this._projects = {}
            };
        z.prototype._checkForProject = function(t) {
            this._projects[t] || (this._projects[t] = {
                attributes: {},
                testCodeHash: {
                    impresson: {
                        testId: "impression",
                        testCode: "impression",
                        variation: "true"
                    }
                }
            })
        }, z.prototype._addFlag = function(t, e) {
            if (t) {
                this._checkForProject(t);
                var n = this._projects[t].testCodeHash;
                n[e.testCode] || (n[e.testCode] = e)
            }
        }, z.prototype._replaceOrAddFlag = function(t, e, n) {
            if (t) {
                this._checkForProject(t);
                var r = this._projects[t].testCodeHash;
                r[e] ? r[e] = n : this._addFlag(t, n)
            }
        }, z.prototype.getFlags = function(t) {
            if (!t) return [];
            this._checkForProject(t);
            var e = this._projects[t].testCodeHash;
            return Object.keys(e).map((function(t) {
                return e[t]
            }))
        }, z.prototype.getAssignedTests = function(t) {
            return this.getFlags(t)
        }, z.prototype._getFlag = function(t, e) {
            if (t) return this._checkForProject(t), this._projects[t].testCodeHash[e]
        }, z.prototype.removeFlags = function(t, e) {
            if (!t) return [];
            this._checkForProject(t), delete this._projects[t].testCodeHash[e]
        }, z.prototype.addAttribute = function(t, e, n) {
            return t ? (this._checkForProject(t), this._projects[t].attributes[e] = n, this) : this
        }, z.prototype.getAttributes = function(t) {
            return t ? (this._checkForProject(t), this._projects[t].attributes) : {}
        }, z.prototype.hasAttribute = function(t, e) {
            return !!t && (this._checkForProject(t), void 0 !== this._projects[t].attributes[e])
        }, z.prototype._populate = function(t) {
            t && t._projects && (this._projects = t._projects)
        };
        var J = z;

        function H(t) {
            return (H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function V() {
            V = function() {
                return t
            };
            var t = {},
                e = Object.prototype,
                n = e.hasOwnProperty,
                r = "function" == typeof Symbol ? Symbol : {},
                o = r.iterator || "@@iterator",
                i = r.asyncIterator || "@@asyncIterator",
                a = r.toStringTag || "@@toStringTag";

            function c(t, e, n) {
                return Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), t[e]
            }
            try {
                c({}, "")
            } catch (Wt) {
                c = function(t, e, n) {
                    return t[e] = n
                }
            }

            function s(t, e, n, r) {
                var o = e && e.prototype instanceof f ? e : f,
                    i = Object.create(o.prototype),
                    a = new j(r || []);
                return i._invoke = function(t, e, n) {
                    var r = "suspendedStart";
                    return function(o, i) {
                        if ("executing" === r) throw new Error("Generator is already running");
                        if ("completed" === r) {
                            if ("throw" === o) throw i;
                            return E()
                        }
                        for (n.method = o, n.arg = i;;) {
                            var a = n.delegate;
                            if (a) {
                                var c = b(a, n);
                                if (c) {
                                    if (c === l) continue;
                                    return c
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if ("suspendedStart" === r) throw r = "completed", n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = "executing";
                            var s = u(t, e, n);
                            if ("normal" === s.type) {
                                if (r = n.done ? "completed" : "suspendedYield", s.arg === l) continue;
                                return {
                                    value: s.arg,
                                    done: n.done
                                }
                            }
                            "throw" === s.type && (r = "completed", n.method = "throw", n.arg = s.arg)
                        }
                    }
                }(t, n, a), i
            }

            function u(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    }
                } catch (Wt) {
                    return {
                        type: "throw",
                        arg: Wt
                    }
                }
            }
            t.wrap = s;
            var l = {};

            function f() {}

            function d() {}

            function p() {}
            var h = {};
            c(h, o, (function() {
                return this
            }));
            var y = Object.getPrototypeOf,
                g = y && y(y(L([])));
            g && g !== e && n.call(g, o) && (h = g);
            var v = p.prototype = f.prototype = Object.create(h);

            function m(t) {
                ["next", "throw", "return"].forEach((function(e) {
                    c(t, e, (function(t) {
                        return this._invoke(e, t)
                    }))
                }))
            }

            function w(t, e) {
                var r;
                this._invoke = function(o, i) {
                    function a() {
                        return new e((function(r, a) {
                            ! function r(o, i, a, c) {
                                var s = u(t[o], t, i);
                                if ("throw" !== s.type) {
                                    var l = s.arg,
                                        f = l.value;
                                    return f && "object" == H(f) && n.call(f, "__await") ? e.resolve(f.__await).then((function(t) {
                                        r("next", t, a, c)
                                    }), (function(t) {
                                        r("throw", t, a, c)
                                    })) : e.resolve(f).then((function(t) {
                                        l.value = t, a(l)
                                    }), (function(t) {
                                        return r("throw", t, a, c)
                                    }))
                                }
                                c(s.arg)
                            }(o, i, r, a)
                        }))
                    }
                    return r = r ? r.then(a, a) : a()
                }
            }

            function b(t, e) {
                var n = t.iterator[e.method];
                if (void 0 === n) {
                    if (e.delegate = null, "throw" === e.method) {
                        if (t.iterator.return && (e.method = "return", e.arg = void 0, b(t, e), "throw" === e.method)) return l;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return l
                }
                var r = u(n, t.iterator, e.arg);
                if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, l;
                var o = r.arg;
                return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, l) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, l)
            }

            function S(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
            }

            function _(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e
            }

            function j(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], t.forEach(S, this), this.reset(!0)
            }

            function L(t) {
                if (t) {
                    var e = t[o];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var r = -1,
                            i = function e() {
                                for (; ++r < t.length;)
                                    if (n.call(t, r)) return e.value = t[r], e.done = !1, e;
                                return e.value = void 0, e.done = !0, e
                            };
                        return i.next = i
                    }
                }
                return {
                    next: E
                }
            }

            function E() {
                return {
                    value: void 0,
                    done: !0
                }
            }
            return d.prototype = p, c(v, "constructor", p), c(p, "constructor", d), d.displayName = c(p, a, "GeneratorFunction"), t.isGeneratorFunction = function(t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name))
            }, t.mark = function(t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, p) : (t.__proto__ = p, c(t, a, "GeneratorFunction")), t.prototype = Object.create(v), t
            }, t.awrap = function(t) {
                return {
                    __await: t
                }
            }, m(w.prototype), c(w.prototype, i, (function() {
                return this
            })), t.AsyncIterator = w, t.async = function(e, n, r, o, i) {
                void 0 === i && (i = Promise);
                var a = new w(s(e, n, r, o), i);
                return t.isGeneratorFunction(n) ? a : a.next().then((function(t) {
                    return t.done ? t.value : a.next()
                }))
            }, m(v), c(v, a, "Generator"), c(v, o, (function() {
                return this
            })), c(v, "toString", (function() {
                return "[object Generator]"
            })), t.keys = function(t) {
                var e = [];
                for (var n in t) e.push(n);
                return e.reverse(),
                    function n() {
                        for (; e.length;) {
                            var r = e.pop();
                            if (r in t) return n.value = r, n.done = !1, n
                        }
                        return n.done = !0, n
                    }
            }, t.values = L, j.prototype = {
                constructor: j,
                reset: function(t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(_), !t)
                        for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type) throw t.arg;
                    return this.rval
                },
                dispatchException: function(t) {
                    if (this.done) throw t;
                    var e = this;

                    function r(n, r) {
                        return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), !!r
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var i = this.tryEntries[o],
                            a = i.completion;
                        if ("root" === i.tryLoc) return r("end");
                        if (i.tryLoc <= this.prev) {
                            var c = n.call(i, "catchLoc"),
                                s = n.call(i, "finallyLoc");
                            if (c && s) {
                                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                            } else if (c) {
                                if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                            } else {
                                if (!s) throw new Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(t, e) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var o = this.tryEntries[r];
                        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var i = o;
                            break
                        }
                    }
                    i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                    var a = i ? i.completion : {};
                    return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, l) : this.complete(a)
                },
                complete: function(t, e) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), l
                },
                finish: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), _(n), l
                    }
                },
                catch: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.tryLoc === t) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var o = r.arg;
                                _(n)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(t, e, n) {
                    return this.delegate = {
                        iterator: L(t),
                        resultName: e,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = void 0), l
                }
            }, t
        }

        function q(t, e, n, r, o, i, a) {
            try {
                var c = t[i](a),
                    s = c.value
            } catch (u) {
                return void n(u)
            }
            c.done ? e(s) : Promise.resolve(s).then(r, o)
        }
        var Y, $, K, Q = n(8),
            W = n(11).version.split("."),
            X = W[0] + W.slice(1).join(""),
            Z = "//staging.launchpadapimeta.azure.fareportal.com/api/meta/",
            tt = "//launchpadapimeta.azure.fareportal.com/api/meta/",
            et = null,
            nt = null,
            rt = !1,
            ot = !1,
            it = !1,
            at = !1,
            ct = [],
            st = null,
            ut = null,
            lt = [],
            ft = null,
            dt = null,
            pt = null,
            ht = k,
            yt = null,
            gt = [],
            vt = [],
            mt = function() {
                return !!et && rt
            },
            wt = function() {
                return !!nt && ot
            },
            bt = function() {
                ht.setSessionStorage("lp_uid_" + yt.id, yt)
            },
            St = function(t) {
                if (!yt)
                    if (t._testSubject) yt = t._testSubject;
                    else {
                        var e = ht.getCookie("uid");
                        t.testSubjectId && (e = t.testSubjectId), yt = function(t) {
                            var e = !1;
                            0 === t.length && (t = Q(), e = !0);
                            var n = new J(t);
                            if (e && n.addAttribute(ft, "GUID", !0), !at && t) {
                                var r = ht.getSessionStorage("lp_uid_" + t);
                                if (at = !0, !r) return n;
                                try {
                                    var o = JSON.parse(r);
                                    return n._populate(o), n
                                } catch (i) {
                                    return console.warn("Launchpad Sdk ERROR: Failed to parse TestSubject."), n
                                }
                            }
                        }(e)
                    }
            },
            _t = function(t) {
                if (t._isPreInit) {
                    var e = {
                            userid: yt.id,
                            tests: yt.getFlags(ft).map((function(t) {
                                return {
                                    id: t.testId,
                                    code: t.testCode,
                                    variation: t.variation
                                }
                            })),
                            attributes: yt.getAttributes(ft)
                        },
                        n = {
                            projectid: ft,
                            accountid: dt,
                            handler: pt
                        };
                    delete(t = Object.assign({}, t, e, n))._isPreInit
                }
                return t
            },
            jt = function() {
                try {
                    var t = ht.getLocalStorage("lp_queue");
                    if (t) {
                        var e = JSON.parse(t);
                        if (e && e.length > 0)
                            if (ct.length > 0) {
                                for (var n = {}, r = e.concat(ct), o = 0; o < r.length; o++) {
                                    var i = r[o].obj.name + "_" + r[o].obj.timestamp;
                                    n[i] || (n[i] = r[o])
                                }
                                ct = Object.keys(n).map((function(t) {
                                    return n[t]
                                }))
                            } else ct = e;
                        it = !0
                    }
                } catch (a) {
                    console.warn("Launchpad Sdk ERROR: Failed to parse Queue."), it = !0
                }
            },
            Lt = function() {
                if (0 !== ct.length) {
                    var t = ct.map((function(t) {
                        return _t(t.obj)
                    }));
                    ct = [];
                    for (var e = 0; e < lt.length; e++) lt[e].logEvent && lt[e].logEvent(t).then((function() {
                        Et()
                    })).catch((function() {
                        vt = vt.concat(t)
                    }))
                }
            },
            Et = function() {
                var t, e = (t = V().mark((function t() {
                    var e, n, r;
                    return V().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (vt && vt.length) {
                                    for (e = 0; e < lt.length; e++)
                                        if (lt[e].logEvent)
                                            for (n = function(t) {
                                                    var n = vt.slice(t, t + 50);
                                                    lt[e].logEvent(n).catch((function() {
                                                        vt = vt.concat(n)
                                                    }))
                                                }, r = 0; r < vt.length; r += 50) n(r);
                                    vt = []
                                }
                            case 1:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })), function() {
                    var e = this,
                        n = arguments;
                    return new Promise((function(r, o) {
                        var i = t.apply(e, n);

                        function a(t) {
                            q(i, r, o, a, c, "next", t)
                        }

                        function c(t) {
                            q(i, r, o, a, c, "throw", t)
                        }
                        a(void 0)
                    }))
                });
                return function() {
                    return e.apply(this, arguments)
                }
            }(),
            Ot = (Y = Lt, $ = 2e3, function() {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                var r = function() {
                    clearTimeout(K), Y.apply(void 0, e)
                };
                clearTimeout(K), K = setTimeout(r, $)
            }),
            Tt = function(t) {
                it || jt(), ct.push(t), ht.setLocalStorage("lp_queue", ct), wt() && Ot()
            },
            xt = function(t) {
                var e, n = t.projectId ? "projectId" : "projectid",
                    r = t[n].indexOf(tt) >= 0,
                    o = t[n].indexOf(Z) >= 0;
                if (r || o) {
                    var i = r ? tt : Z,
                        a = t[n].split(i);
                    a.length > 0 && a[1] && (e = a[1])
                } else e = t[n];
                return e
            },
            Rt = function t() {
                for (var e = ut.get("config"), n = 0; n < lt.length; n++) lt[n].updateConfig(e);
                ut.startRefreshListener(t)
            },
            kt = function(t, e) {
                return new x.a((function(n, r) {
                    try {
                        yt.getFlags(t).map((function(n) {
                            e.find((function(t) {
                                return t === n.testCode
                            })) || !0 !== n.iseditable || yt.removeFlags(t, n.testCode)
                        })), n(!0)
                    } catch (o) {
                        console.warn("Launchpad sdk pinger error" + o), r(!1)
                    }
                }))
            },
            Ct = function(t) {
                var e = new Date;
                return t ? (!0 === t._reinitialize && (nt = null, ot = !1, at = !1, lt = [], yt = null, it = !1), !0 === t._clearQueue && (ct = [], ht.delLocalStorage("lp_queue")), nt || (nt = new x.a((function(n, r) {
                    if (t.projectid || t.projectId) try {
                        ft = xt(t), t.projectid = ft
                    } catch (i) {
                        console.warn("Launchpad Sdk ERROR: Could not parse projectid correctly."), r("projectid was not parsed correctly.")
                    }
                    t.projectid ? ft = t.projectid : (console.warn("Launchpad Sdk ERROR: Missing projectid in options."), r("projectid must be passed in options.")), ut = M.instance();
                    var o = [];
                    ut.init(t).then((function() {
                        var e = ut.get("publisher"),
                            n = ut.get("config");
                        gt = ut.get("testcodes"), t.account = ut.get("account"), t.handler = ut.get("handler"), t.account && (dt = t.account), t.handler && (pt = t.handler), n && n.length > 0 && "AzureEventsHubPublisher" === e ? (t.config = n, lt.push(U.instance())) : console.warn("Launchpad Sdk WARNING: Event initialization failed. No events will be sent.");
                        for (var r = 0; r < lt.length; r++) o.push(lt[r].init(t));
                        return x.a.all(o)
                    })).then((function() {
                        ut.startRefreshListener(Rt), jt(), St(t), gt = ut.get("testcodes"), console.log("TestCodes", gt), ot = !0, Lt(), console.log("Launchpad Sdk INFO: READY for event logging in " + (new Date - e) + "ms."), n()
                    })).catch((function(t) {
                        console.warn("Launchpad Sdk ERROR:" + t), console.log("Launchpad Sdk INFO: NOT READY for event logging in " + (new Date - e) + "ms."), ot = !1, r("Something went wrong while initializing Launchpad event logging." + t)
                    }))
                }))), nt) : (console.warn("Launchpad Sdk ERROR: No options were passed."), nt = null, ot = !1, x.a.reject("options must be passed into initEvents"))
            },
            It = function(t) {
                var e = new Date;
                return t ? (!0 === t._reinitialize && (et = null, rt = !1, at = !1, st = null, yt = null), void 0 !== t.helpers && null !== t.helpers && ("function" == typeof t.helpers.delStorage && "function" == typeof t.helpers.setStorage && "function" == typeof t.helpers.getStorage ? (ht = P.instance()).init(t.helpers) : console.warn("Launchpad Sdk ERROR: Helpers option was passed. It seems does not contain either delStorage, setStorage or getStorage")), Ct(t).then((function() {
                    return et || (et = new x.a((function(n, r) {
                        if (t.projectid || t.projectId) try {
                            ft = xt(t), t.projectid = ft
                        } catch (o) {
                            console.warn("Launchpad Sdk ERROR: Could not parse projectid correctly."), r("projectid was not parsed correctly.")
                        }
                        t.projectid ? ft = t.projectid : (console.warn("Launchpad Sdk ERROR: Missing projectId in options."), r("projectId must be passed in options.")), (st = F.instance()).init(t).then((function() {
                            !(!window || !window.location) && Qt(G.UrlQueryStringPreView) ? Kt(t).then((function(t) {
                                n(t)
                            })).catch((function(t) {
                                r(t)
                            })) : (St(t), rt = !0, function(t) {
                                var e = xt(t);
                                setInterval((function() {
                                    ut.updateCacheConnectionString(e).then((function(t) {
                                        !0 === t && (gt = ut.get("testcodes"), kt(e, gt).then((function() {
                                            return bt()
                                        })))
                                    }))
                                }), G.PingerInterval)
                            }(t), Jt(), console.log("Launchpad Sdk INFO: READY for assignments in " + (new Date - e) + "ms."), n())
                        })).catch((function(t) {
                            console.warn("Launchpad Sdk ERROR:" + t), console.log("Launchpad Sdk INFO: NOT READY for assignments in " + (new Date - e) + "ms."), r("Something went wrong while initializing Launchpad assignments.")
                        }))
                    }))), et
                })).catch((function(t) {
                    return console.warn("Launchpad Sdk ERROR:" + t), x.a.reject(t)
                }))) : (console.warn("Launchpad Sdk ERROR: No options were passed."), et = null, rt = !1, x.a.reject("options must be passed into init"))
            },
            At = function(t, e, n) {
                return st.assignToTests(t, yt.id, yt.getAttributes(ft), e, n).then((function(t) {
                    return t.success && t.data.forEach((function(t) {
                        yt._addFlag(ft, t), bt()
                    })), t.data
                }))
            },
            Pt = function(t, e, n) {
                var r = {
                        testId: void 0,
                        modification: n,
                        variation: e
                    },
                    o = [],
                    i = [];
                return !t || !Array.isArray(t) || t.length < 1 ? x.a.reject("testCodes cannot be empty") : mt() ? (t.forEach((function(t) {
                    var e = yt._getFlag(ft, t);
                    void 0 !== e ? o.push(e) : i.push(t)
                })), At(i, e, n).then((function(t) {
                    return o.concat(t)
                }))) : x.a.resolve(t.map((function(t) {
                    return Object.assign({}, r, {
                        testCode: t
                    })
                })))
            },
            Ft = function(t, e, n) {
                var r = {
                    testId: void 0,
                    testCode: t,
                    modification: n,
                    variation: e
                };
                if (!t || "string" != typeof t || t.length < 1 || t.trim().length < 1) return console.warn("Launchpad Sdk ERROR: testCode cannot be empty."), x.a.reject("testCode cannot be empty");
                if (mt()) {
                    var o = yt._getFlag(ft, t);
                    return void 0 !== o ? x.a.resolve(o) : At([t], e, n).then((function(t) {
                        return t[0]
                    }))
                }
                return x.a.resolve(r)
            },
            Nt = function(t, e) {
                return !t || "string" != typeof t || t.length < 1 || t.trim().length < 1 ? (console.warn("Launchpad Sdk ERROR: testCode cannot be empty."), x.a.reject("testCode cannot be empty")) : !e || "string" != typeof e || e.length < 1 || e.trim().length < 1 ? (console.warn("Launchpad Sdk ERROR: variation cannot be empty."), x.a.reject("variation cannot be empty")) : mt() ? st.forceAssignToTest(t, e, yt.id, yt.getAttributes(ft)).then((function(t) {
                    return t.success ? (yt._addFlag(ft, t.data), bt(), t.data) : t.success
                })) : x.a.resolve(!1)
            },
            Dt = function(t, e, n) {
                var r = {
                    testId: void 0,
                    testCode: t,
                    modification: n,
                    variation: e
                };
                if (mt()) {
                    var o = yt._getFlag(ft, t);
                    if (void 0 !== o) return o
                }
                return r
            },
            Bt = function(t, e) {
                var n = yt ? yt._getFlag(ft, t) : void 0;
                return !(void 0 === n || !e) && n.variation.toLowerCase() === e.toLowerCase()
            },
            Ut = function(t, e) {
                "string" == typeof t && (t = {
                    name: t,
                    values: e
                });
                var n = {
                    name: t.name,
                    values: t.values ? t.values : {},
                    timestamp: (new Date).toISOString(),
                    s: "cs",
                    v: X,
                    _isPreInit: !0
                };
                wt() && (n = _t(n)), Tt({
                    action: "logEvent",
                    obj: n
                })
            },
            Gt = function(t, e) {
                return (mt() || wt()) && (Mt(t, e), yt.addAttribute(ft, t, e), bt()), this
            },
            Mt = function(t, e) {
                yt.hasAttribute(ft, t) && (yt._projects[ft].attributes[t] !== e && (yt._projects[ft].testCodeHash = {
                    impresson: {
                        testId: "impression",
                        testCode: "impression",
                        variation: "true"
                    }
                }))
            },
            zt = function() {
                return mt() ? yt.getAttributes(ft) : {}
            },
            Jt = function() {
                var t = new Date;
                return new x.a((function(e, n) {
                    Ht().then((function(r) {
                        r && x.a.all([Yt(r.CssContent), qt(r.JsContent)]).then((function(n) {
                            e(n), console.log("Launchpad Sdk INFO: snippet loaded  in " + (new Date - t) + "ms.")
                        })).catch((function(t) {
                            n(t)
                        }))
                    })).catch((function(t) {
                        n(t)
                    }))
                }))
            },
            Ht = function() {
                return new x.a((function(t, e) {
                    Gt("page_url", window.location.href);
                    for (var n = 1; n < 5; n++) Gt("page_url" + n, window.location.href);
                    Vt().then((function(e) {
                        t(e)
                    })).catch((function(t) {
                        e("Launchpad error on LaunchpadAssignToTest: " + t)
                    }))
                }))
            },
            Vt = function() {
                var t = {
                    JsContent: "",
                    CssContent: ""
                };
                return Pt(gt, "", "").then((function(e) {
                    if (e && e.length > 0) {
                        var n = "",
                            r = "";
                        return e.forEach((function(e) {
                                if (!(e && e.modification && (e.modification.toLowerCase().indexOf(G.LpJsContent) > -1 || e.modification.toLowerCase().indexOf(G.LpCssContent) > -1))) return x.a.resolve(t);
                                try {
                                    var o = JSON.parse(e.modification);
                                    if (!o) return x.a.reject("Launchpad sdk error: snippet not found");
                                    o.CssContent && (n += o.CssContent.replace(/l_p_d_quotes/g, '"')), o.JsContent && (r = r + "  try { " + o.JsContent.replace(/l_p_d_quotes/g, '"') + "  } catch (lpSnippetError) { console.error('Launchpad sdk error in your snippet : '+ lpSnippetError); }  ")
                                } catch (i) {
                                    return x.a.reject("Launchpad sdk error: " + i)
                                }
                            })), t.CssContent = n, t.JsContent = r,
                            function(t) {
                                try {
                                    yt.getFlags(ft).map((function(e) {
                                        t.find((function(t) {
                                            return t === e.testCode
                                        })) && (e.iseditable = !0)
                                    })), bt()
                                } catch (e) {
                                    console.warn("Launchpad sdk  error in markEditableFlags" + e)
                                }
                            }(gt), x.a.resolve(t)
                    }
                    return console.log("No snippet found"), x.a.resolve(t)
                })).catch((function(t) {
                    return console.warn("Launchpad Sdk error at getBucketedSnippet: " + t), x.a.reject(t)
                }))
            },
            qt = function(t) {
                return $t(t).then((function(t) {
                    return console.log(t), x.a.resolve(t)
                })).catch((function(t) {
                    return console.error(t), x.a.reject(t)
                }))
            },
            Yt = function(t) {
                return new x.a((function(e, n) {
                    try {
                        var r = document.createElement("style");
                        r.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(r), e("Launchpad css snippet loaded successfully..!")
                    } catch (o) {
                        n("Launchpad error while loading css: " + o)
                    }
                }))
            },
            $t = function(t) {
                return new x.a((function(e, n) {
                    try {
                        var r = document.createElement("script");
                        r.type = "text/javascript", r.text = "(function launchpadJsCssSnippet(){" + t + "})();", e("Launchpad js snippet loaded successfully..!"), document.head.appendChild(r)
                    } catch (o) {
                        n("Launchpad error while loading js: " + o)
                    }
                }))
            },
            Kt = function(t) {
                var e = xt(t),
                    n = Qt(G.LpFlagId),
                    r = Qt(G.LpVariation);
                return n && e && r ? st.getSnippetForPreView(e, n, r).then((function(t) {
                    if (t.success) {
                        var e = t.data;
                        if (e && e.length > 0 && (e.toLowerCase().indexOf(G.LpJsContent) > -1 || e.toLowerCase().indexOf(G.LpCssContent) > -1)) try {
                            var n = "",
                                r = "",
                                o = JSON.parse(e);
                            return o ? (o.CssContent && (n = o.CssContent.replace(/l_p_d_quotes/g, '"')), o.JsContent && (r = "  try { " + o.JsContent.replace(/l_p_d_quotes/g, '"') + "  } catch (lpSnippetError) { console.error('Launchpad sdk error in your snippet : '+ lpSnippetError); }  "), x.a.all([Yt(n), qt(r)]).then((function(t) {
                                return x.a.resolve(t)
                            })).catch((function(t) {
                                return x.a.reject(t)
                            }))) : x.a.reject("Launchpad sdk error: snippet not found")
                        } catch (i) {
                            return x.a.reject("Launchpad sdk error: " + i)
                        }
                        return x.a.resolve()
                    }
                    return x.a.reject("Launchpad sdk assignmentProvider error")
                })).catch((function(t) {
                    return x.a.reject("Launchpad sdk error: " + t)
                })) : (console.log("Launchpad sdk Bad request: projectid:" + e + " :: flagid:" + n + "  :: variation:" + r), x.a.resolve())
            },
            Qt = function(t) {
                var e = new RegExp("[?&]" + t + "=([^&#]*)").exec(window.location.search);
                return null == e ? void 0 : decodeURI(e[1]) || 0
            };
        e.default = {
            init: It,
            isInitialized: mt,
            initEvents: Ct,
            isEventInitialized: wt,
            assignToTests: Pt,
            assignToTest: Ft,
            forceAssignToTest: Nt,
            getAssignedTestVariation: Dt,
            isAssignedToTestVariation: Bt,
            logEvent: Ut,
            addAttribute: Gt,
            getAttributes: zt
        }
    }])
}));