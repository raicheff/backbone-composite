/*
 * Backbone.Composite
 *
 * Copyright (C) 2016 Boris Raicheff
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
      this.subviews = {};
      View.apply(this, Array.prototype.slice.call(arguments));
    },

    remove: function() {
      console.group(this.cid, "(remove)", this.el);
      this._dispose();
      // View.prototype.remove.apply(this, arguments);
      View.prototype.remove.call(this);
      console.groupEnd();
    },

    push: function(view, id) {
      this.subviews[id || view.cid] = view;
      return view;
    },

    pop: function(id) {
      var view = this.subviews[id];
      // this.subviews[id] = void 0;
      delete this.subviews[id];
      return view;
    },

    _dispose: function() {

      _(this.subviews).invoke("remove");
      this.subviews = {};

      if (_.isFunction(this.dispose)) {
        console.log(this.cid, "(dispose)");
        this.dispose();
      }

    }

  });

});

/* EOF */
