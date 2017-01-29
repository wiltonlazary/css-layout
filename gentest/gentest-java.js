/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function toValueJava(value) {
  var n = value.toString().replace('px','').replace('%','');
  return n + (Number(n) == n && n % 1 !== 0 ? '' : '');
}

function toMethodName(value) {
  if (value.indexOf('%') >= 0){
    return 'Percent';
  }
  return '';
}

var JavaEmitter = function() {
  Emitter.call(this, 'java', '  ');
};

function toJavaUpper(symbol) {
  var out = '';
  for (var i = 0; i < symbol.length; i++) {
    var c = symbol[i];
    if (c == c.toUpperCase() && i != 0 && symbol[i - 1] != symbol[i - 1].toUpperCase()) {
      out += '_';
    }
    out += c.toUpperCase();
  }
  return out;
}

JavaEmitter.prototype = Object.create(Emitter.prototype, {
  constructor:{value:JavaEmitter},

  emitPrologue:{value:function() {
    this.push([
      'package com.facebook.yoga;',
      '',
      'import org.junit.Test;',
      '',
      'import static org.junit.Assert.assertEquals;',
      '',
      'public class YogaTest {',
    ]);
    this.pushIndent();
  }},

  emitTestPrologue:{value:function(name, experiments) {
    this.push('@Test');
    this.push('public void test_' + name + '() {');
    this.pushIndent();

    if (experiments.length > 0) {
      for (var i in experiments) {
        this.push('YogaNode.setExperimentalFeatureEnabled(YogaExperimentalFeature.' + toJavaUpper(experiments[i]) +', true);');
      }
      this.push('');
    }
  }},

  emitTestTreePrologue:{value:function(nodeName) {
    this.push('final YogaNode ' + nodeName + ' = new YogaNode();');
  }},

  emitTestEpilogue:{value:function(experiments) {
    if (experiments.length > 0) {
      this.push('');
      for (var i in experiments) {
        this.push('YogaNode.setExperimentalFeatureEnabled(YogaExperimentalFeature.' + toJavaUpper(experiments[i]) +', false);');
      }
    }

    this.popIndent();
    this.push([
      '}',
      '',
    ]);
  }},

  emitEpilogue:{value:function(lines) {
    this.popIndent();
    this.push([
      '}',
      '',
    ]);
  }},

  AssertEQ:{value:function(v0, v1) {
    this.push('assertEquals(' + v0 + 'f, ' + v1 + ', 0.0f);');
  }},

  YGAlignAuto:{value:'YogaAlign.AUTO'},
  YGAlignCenter:{value:'YogaAlign.CENTER'},
  YGAlignFlexEnd:{value:'YogaAlign.FLEX_END'},
  YGAlignFlexStart:{value:'YogaAlign.FLEX_START'},
  YGAlignStretch:{value:'YogaAlign.STRETCH'},
  YGAlignBaseline:{value:'YogaAlign.BASELINE'},

  YGDirectionInherit:{value:'YogaDirection.INHERIT'},
  YGDirectionLTR:{value:'YogaDirection.LTR'},
  YGDirectionRTL:{value:'YogaDirection.RTL'},

  YGEdgeBottom:{value:'YogaEdge.BOTTOM'},
  YGEdgeEnd:{value:'YogaEdge.END'},
  YGEdgeLeft:{value:'YogaEdge.LEFT'},
  YGEdgeRight:{value:'YogaEdge.RIGHT'},
  YGEdgeStart:{value:'YogaEdge.START'},
  YGEdgeTop:{value:'YogaEdge.TOP'},

  YGFlexDirectionColumn:{value:'YogaFlexDirection.COLUMN'},
  YGFlexDirectionColumnReverse:{value:'YogaFlexDirection.COLUMN_REVERSE'},
  YGFlexDirectionRow:{value:'YogaFlexDirection.ROW'},
  YGFlexDirectionRowReverse:{value:'YogaFlexDirection.ROW_REVERSE'},

  YGJustifyCenter:{value:'YogaJustify.CENTER'},
  YGJustifyFlexEnd:{value:'YogaJustify.FLEX_END'},
  YGJustifyFlexStart:{value:'YogaJustify.FLEX_START'},
  YGJustifySpaceAround:{value:'YogaJustify.SPACE_AROUND'},
  YGJustifySpaceBetween:{value:'YogaJustify.SPACE_BETWEEN'},

  YGOverflowHidden:{value:'YogaOverflow.HIDDEN'},
  YGOverflowVisible:{value:'YogaOverflow.VISIBLE'},

  YGPositionTypeAbsolute:{value:'YogaPositionType.ABSOLUTE'},
  YGPositionTypeRelative:{value:'YogaPositionType.RELATIVE'},

  YGUndefined:{value:'YogaConstants.UNDEFINED'},

  YGWrapNoWrap:{value:'YogaWrap.NO_WRAP'},
  YGWrapWrap:{value:'YogaWrap.WRAP'},

  YGNodeCalculateLayout:{value:function(node, dir) {
    this.push(node + '.setDirection(' + dir + ');');
    this.push(node + '.calculateLayout();');
  }},

  YGNodeInsertChild:{value:function(parentName, nodeName, index) {
    this.push(parentName + '.addChildAt(' + nodeName + ', ' + index + ');');
  }},

  YGNodeLayoutGetLeft:{value:function(nodeName) {
    return nodeName + '.getLayoutX()';
  }},

  YGNodeLayoutGetTop:{value:function(nodeName) {
    return nodeName + '.getLayoutY()';
  }},

  YGNodeLayoutGetWidth:{value:function(nodeName) {
    return nodeName + '.getLayoutWidth()';
  }},

  YGNodeLayoutGetHeight:{value:function(nodeName) {
    return nodeName + '.getLayoutHeight()';
  }},

  YGNodeStyleSetAlignContent:{value:function(nodeName, value) {
    this.push(nodeName + '.setAlignContent(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetAlignItems:{value:function(nodeName, value) {
    this.push(nodeName + '.setAlignItems(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetAlignSelf:{value:function(nodeName, value) {
    this.push(nodeName + '.setAlignSelf(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetBorder:{value:function(nodeName, edge, value) {
    this.push(nodeName + '.setBorder(' + edge + ', ' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetDirection:{value:function(nodeName, value) {
    this.push(nodeName + '.setDirection(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetFlexBasis:{value:function(nodeName, value) {
    this.push(nodeName + '.setFlexBasis' + toMethodName(value) + '(' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetFlexDirection:{value:function(nodeName, value) {
    this.push(nodeName + '.setFlexDirection(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetFlexGrow:{value:function(nodeName, value) {
    this.push(nodeName + '.setFlexGrow(' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetFlexShrink:{value:function(nodeName, value) {
    this.push(nodeName + '.setFlexShrink(' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetFlexWrap:{value:function(nodeName, value) {
    this.push(nodeName + '.setWrap(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetHeight:{value:function(nodeName, value) {
    this.push(nodeName + '.setHeight' + toMethodName(value) + '(' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetJustifyContent:{value:function(nodeName, value) {
    this.push(nodeName + '.setJustifyContent(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetMargin:{value:function(nodeName, edge, value) {
    this.push(nodeName + '.setMargin' + toMethodName(value) + '(' + edge + ', ' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetMaxHeight:{value:function(nodeName, value) {
    this.push(nodeName + '.setMaxHeight' + toMethodName(value) + '(' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetMaxWidth:{value:function(nodeName, value) {
    this.push(nodeName + '.setMaxWidth' + toMethodName(value) + '(' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetMinHeight:{value:function(nodeName, value) {
    this.push(nodeName + '.setMinHeight' + toMethodName(value) + '(' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetMinWidth:{value:function(nodeName, value) {
    this.push(nodeName + '.setMinWidth' + toMethodName(value) + '(' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetOverflow:{value:function(nodeName, value) {
    this.push(nodeName + '.setOverflow(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetPadding:{value:function(nodeName, edge, value) {
    this.push(nodeName + '.setPadding' + toMethodName(value) + '(' + edge + ', ' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetPosition:{value:function(nodeName, edge, value) {
    this.push(nodeName + '.setPosition' + toMethodName(value) + '(' + edge + ', ' + toValueJava(value) + 'f);');
  }},

  YGNodeStyleSetPositionType:{value:function(nodeName, value) {
    this.push(nodeName + '.setPositionType(' + toValueJava(value) + ');');
  }},

  YGNodeStyleSetWidth:{value:function(nodeName, value) {
    this.push(nodeName + '.setWidth' + toMethodName(value) + '(' + toValueJava(value) + 'f);');
  }},
});
