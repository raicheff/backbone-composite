/*
 * Backbone.Composite
 *
 * Copyright (C) 2017 Boris Raicheff
 * All rights reserved
 */

(function(global, factory) {

  if (typeof exports === "object") {
    module.exports = factory(require("underscore"), require("backbone"));
  } else if (typeof define === "function" && define.amd) {
    define(["underscore", "backbone"], factory);
  } else {
    factory(global._, global.Backbone);
  }

})(this, function(_, Backbone) {

  "use strict";

  var View = Backbone.View;

  Backbone.View = View.extend({

    constructor: function() {
      View.apply(this, Array.prototype.slice.call(arguments));
      this.subviews = {};
    },

    dispose: function() {
      return this;
    },

    remove: function() {
      console.group(this.cid, "(remove)", this.el);
      this._dispose();
      // View.prototype.remove.apply(this, arguments);
      View.prototype.remove.call(this);
      console.groupEnd();
    },

    push: function(view, id) {
      view.parent = this;
      this.subviews[id || view.cid] = view;
      return view;
    },

    pop: function(id) {
      var view = this.subviews[id];
      // this.subviews[id] = void 0;
      delete this.subviews[id];
      delete view.parent;
      return view;
    },

    _dispose: function() {
      this.dispose();
      _(this.subviews).invoke("remove");
      this.subviews = {};
      return this;

    }

  });

});

/* EOF */
