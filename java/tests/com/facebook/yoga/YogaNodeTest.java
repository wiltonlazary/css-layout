/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.facebook.yoga;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class YogaNodeTest {

  @Test
  public void testInit() {
    final int refCount = YogaNode.jni_YGNodeGetInstanceCount();
    final YogaNode node = new YogaNode();
    assertEquals(refCount + 1, YogaNode.jni_YGNodeGetInstanceCount());
  }

  @Test
  public void testBaseline() {
    final YogaNode root = new YogaNode();
    root.setFlexDirection(YogaFlexDirection.ROW);
    root.setAlignItems(YogaAlign.BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    final YogaNode child1 = new YogaNode();
    child1.setWidth(40);
    child1.setHeight(40);
    root.addChildAt(child1, 0);

    final YogaNode child2 = new YogaNode();
    child2.setWidth(40);
    child2.setHeight(40);
    child2.setBaselineFunction(new YogaBaselineFunction() {
        public float baseline(YogaNodeAPI node, float width, float height) {
          return 0;
        }
    });
    root.addChildAt(child2, 1);

    root.calculateLayout();

    assertEquals(0, (int) child1.getLayoutY());
    assertEquals(40, (int) child2.getLayoutY());
  }

  @Test
  public void testMeasure() {
    final YogaNode node = new YogaNode();
    node.setMeasureFunction(new YogaMeasureFunction() {
        public long measure(
            YogaNodeAPI node,
            float width,
            YogaMeasureMode widthMode,
            float height,
            YogaMeasureMode heightMode) {
          return YogaMeasureOutput.make(100, 100);
        }
    });
    node.calculateLayout();
    assertEquals(100, (int) node.getLayoutWidth());
    assertEquals(100, (int) node.getLayoutHeight());
  }

  @Test
  public void testMeasureFloat() {
    final YogaNode node = new YogaNode();
    node.setMeasureFunction(new YogaMeasureFunction() {
        public long measure(
            YogaNodeAPI node,
            float width,
            YogaMeasureMode widthMode,
            float height,
            YogaMeasureMode heightMode) {
          return YogaMeasureOutput.make(100.5f, 100.5f);
        }
    });
    node.calculateLayout();
    assertEquals(100.5f, node.getLayoutWidth(), 0.0f);
    assertEquals(100.5f, node.getLayoutHeight(), 0.0f);
  }

  @Test
  public void testMeasureFloatMin() {
    final YogaNode node = new YogaNode();
    node.setMeasureFunction(new YogaMeasureFunction() {
        public long measure(
            YogaNodeAPI node,
            float width,
            YogaMeasureMode widthMode,
            float height,
            YogaMeasureMode heightMode) {
          return YogaMeasureOutput.make(Float.MIN_VALUE, Float.MIN_VALUE);
        }
    });
    node.calculateLayout();
    assertEquals(Float.MIN_VALUE, node.getLayoutWidth(), 0.0f);
    assertEquals(Float.MIN_VALUE, node.getLayoutHeight(), 0.0f);
  }

  @Test
  public void testMeasureFloatMax() {
    final YogaNode node = new YogaNode();
    node.setMeasureFunction(new YogaMeasureFunction() {
        public long measure(
            YogaNodeAPI node,
            float width,
            YogaMeasureMode widthMode,
            float height,
            YogaMeasureMode heightMode) {
          return YogaMeasureOutput.make(Float.MAX_VALUE, Float.MAX_VALUE);
        }
    });
    node.calculateLayout();
    assertEquals(Float.MAX_VALUE, node.getLayoutWidth(), 0.0f);
    assertEquals(Float.MAX_VALUE, node.getLayoutHeight(), 0.0f);
  }

  private YogaLogLevel mLogLevel;
  private String mLogMessage;

  @Test
  public void testLogger() {
    YogaNode.setLogger(new YogaLogger() {
        public void log(YogaLogLevel level, String message) {
          mLogLevel = level;
          mLogMessage = message;
        }
    });
    YogaNode.jni_YGLog(YogaLogLevel.DEBUG.intValue(), "Hello");
    assertEquals(YogaLogLevel.DEBUG, mLogLevel);
    assertEquals("Hello", mLogMessage);
  }

  @Test
  public void testUpdateLogger() {
    YogaNode.setLogger(new YogaLogger() {
        public void log(YogaLogLevel level, String message) {}
    });
    YogaNode.setLogger(new YogaLogger() {
        public void log(YogaLogLevel level, String message) {
          mLogLevel = level;
          mLogMessage = message;
        }
    });
    YogaNode.jni_YGLog(YogaLogLevel.VERBOSE.intValue(), "Flexbox");
    assertEquals(YogaLogLevel.VERBOSE, mLogLevel);
    assertEquals("Flexbox", mLogMessage);
  }

  @Test
  public void testCopyStyle() {
    final YogaNode node0 = new YogaNode();
    assertTrue(YogaConstants.isUndefined(node0.getMaxHeight()));

    final YogaNode node1 = new YogaNode();
    node1.setMaxHeight(100);

    node0.copyStyle(node1);
    assertEquals(100, (int) node0.getMaxHeight().value);
  }

  @Test
  public void testLayoutMargin() {
    final YogaNode node = new YogaNode();
    node.setWidth(100);
    node.setHeight(100);
    node.setMargin(YogaEdge.START, 1);
    node.setMargin(YogaEdge.END, 2);
    node.setMargin(YogaEdge.TOP, 3);
    node.setMargin(YogaEdge.BOTTOM, 4);
    node.calculateLayout();

    assertEquals(1, (int) node.getLayoutMargin(YogaEdge.LEFT));
    assertEquals(2, (int) node.getLayoutMargin(YogaEdge.RIGHT));
    assertEquals(3, (int) node.getLayoutMargin(YogaEdge.TOP));
    assertEquals(4, (int) node.getLayoutMargin(YogaEdge.BOTTOM));
  }

  @Test
  public void testLayoutPadding() {
    final YogaNode node = new YogaNode();
    node.setWidth(100);
    node.setHeight(100);
    node.setPadding(YogaEdge.START, 1);
    node.setPadding(YogaEdge.END, 2);
    node.setPadding(YogaEdge.TOP, 3);
    node.setPadding(YogaEdge.BOTTOM, 4);
    node.calculateLayout();

    assertEquals(1, (int) node.getLayoutPadding(YogaEdge.LEFT));
    assertEquals(2, (int) node.getLayoutPadding(YogaEdge.RIGHT));
    assertEquals(3, (int) node.getLayoutPadding(YogaEdge.TOP));
    assertEquals(4, (int) node.getLayoutPadding(YogaEdge.BOTTOM));
  }
}
