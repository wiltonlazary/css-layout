/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

 // @Generated by gentest/gentest.rb from gentest/fixtures/YGBorderTest.html

var Yoga = Yoga || require("../../sources/entry-" + process.env.TEST_ENTRY);

it("border_no_size", function () {
  var root = Yoga.Node.create();
  root.setBorder(Yoga.EDGE_LEFT, 10);
  root.setBorder(Yoga.EDGE_TOP, 10);
  root.setBorder(Yoga.EDGE_RIGHT, 10);
  root.setBorder(Yoga.EDGE_BOTTOM, 10);
  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_LTR);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(20 === root.getComputedWidth(), "20 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(20 === root.getComputedHeight(), "20 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_RTL);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(20 === root.getComputedWidth(), "20 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(20 === root.getComputedHeight(), "20 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  if (typeof root !== "undefined")
    root.freeRecursive();

  (typeof gc !== "undefined") && gc();
  console.assert(0 === Yoga.getInstanceCount(), "0 === Yoga.getInstanceCount() (" + Yoga.getInstanceCount() + ")");
});
it("border_container_match_child", function () {
  var root = Yoga.Node.create();
  root.setBorder(Yoga.EDGE_LEFT, 10);
  root.setBorder(Yoga.EDGE_TOP, 10);
  root.setBorder(Yoga.EDGE_RIGHT, 10);
  root.setBorder(Yoga.EDGE_BOTTOM, 10);

  var root_child0 = Yoga.Node.create();
  root_child0.setWidth(10);
  root_child0.setHeight(10);
  root.insertChild(root_child0, 0);
  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_LTR);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(30 === root.getComputedWidth(), "30 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(30 === root.getComputedHeight(), "30 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  console.assert(10 === root_child0.getComputedLeft(), "10 === root_child0.getComputedLeft() (" + root_child0.getComputedLeft() + ")");
  console.assert(10 === root_child0.getComputedTop(), "10 === root_child0.getComputedTop() (" + root_child0.getComputedTop() + ")");
  console.assert(10 === root_child0.getComputedWidth(), "10 === root_child0.getComputedWidth() (" + root_child0.getComputedWidth() + ")");
  console.assert(10 === root_child0.getComputedHeight(), "10 === root_child0.getComputedHeight() (" + root_child0.getComputedHeight() + ")");

  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_RTL);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(30 === root.getComputedWidth(), "30 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(30 === root.getComputedHeight(), "30 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  console.assert(10 === root_child0.getComputedLeft(), "10 === root_child0.getComputedLeft() (" + root_child0.getComputedLeft() + ")");
  console.assert(10 === root_child0.getComputedTop(), "10 === root_child0.getComputedTop() (" + root_child0.getComputedTop() + ")");
  console.assert(10 === root_child0.getComputedWidth(), "10 === root_child0.getComputedWidth() (" + root_child0.getComputedWidth() + ")");
  console.assert(10 === root_child0.getComputedHeight(), "10 === root_child0.getComputedHeight() (" + root_child0.getComputedHeight() + ")");

  if (typeof root !== "undefined")
    root.freeRecursive();

  (typeof gc !== "undefined") && gc();
  console.assert(0 === Yoga.getInstanceCount(), "0 === Yoga.getInstanceCount() (" + Yoga.getInstanceCount() + ")");
});
it("border_flex_child", function () {
  var root = Yoga.Node.create();
  root.setBorder(Yoga.EDGE_LEFT, 10);
  root.setBorder(Yoga.EDGE_TOP, 10);
  root.setBorder(Yoga.EDGE_RIGHT, 10);
  root.setBorder(Yoga.EDGE_BOTTOM, 10);
  root.setWidth(100);
  root.setHeight(100);

  var root_child0 = Yoga.Node.create();
  root_child0.setFlexGrow(1);
  root_child0.setWidth(10);
  root.insertChild(root_child0, 0);
  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_LTR);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(100 === root.getComputedWidth(), "100 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(100 === root.getComputedHeight(), "100 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  console.assert(10 === root_child0.getComputedLeft(), "10 === root_child0.getComputedLeft() (" + root_child0.getComputedLeft() + ")");
  console.assert(10 === root_child0.getComputedTop(), "10 === root_child0.getComputedTop() (" + root_child0.getComputedTop() + ")");
  console.assert(10 === root_child0.getComputedWidth(), "10 === root_child0.getComputedWidth() (" + root_child0.getComputedWidth() + ")");
  console.assert(80 === root_child0.getComputedHeight(), "80 === root_child0.getComputedHeight() (" + root_child0.getComputedHeight() + ")");

  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_RTL);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(100 === root.getComputedWidth(), "100 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(100 === root.getComputedHeight(), "100 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  console.assert(80 === root_child0.getComputedLeft(), "80 === root_child0.getComputedLeft() (" + root_child0.getComputedLeft() + ")");
  console.assert(10 === root_child0.getComputedTop(), "10 === root_child0.getComputedTop() (" + root_child0.getComputedTop() + ")");
  console.assert(10 === root_child0.getComputedWidth(), "10 === root_child0.getComputedWidth() (" + root_child0.getComputedWidth() + ")");
  console.assert(80 === root_child0.getComputedHeight(), "80 === root_child0.getComputedHeight() (" + root_child0.getComputedHeight() + ")");

  if (typeof root !== "undefined")
    root.freeRecursive();

  (typeof gc !== "undefined") && gc();
  console.assert(0 === Yoga.getInstanceCount(), "0 === Yoga.getInstanceCount() (" + Yoga.getInstanceCount() + ")");
});
it("border_stretch_child", function () {
  var root = Yoga.Node.create();
  root.setBorder(Yoga.EDGE_LEFT, 10);
  root.setBorder(Yoga.EDGE_TOP, 10);
  root.setBorder(Yoga.EDGE_RIGHT, 10);
  root.setBorder(Yoga.EDGE_BOTTOM, 10);
  root.setWidth(100);
  root.setHeight(100);

  var root_child0 = Yoga.Node.create();
  root_child0.setHeight(10);
  root.insertChild(root_child0, 0);
  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_LTR);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(100 === root.getComputedWidth(), "100 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(100 === root.getComputedHeight(), "100 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  console.assert(10 === root_child0.getComputedLeft(), "10 === root_child0.getComputedLeft() (" + root_child0.getComputedLeft() + ")");
  console.assert(10 === root_child0.getComputedTop(), "10 === root_child0.getComputedTop() (" + root_child0.getComputedTop() + ")");
  console.assert(80 === root_child0.getComputedWidth(), "80 === root_child0.getComputedWidth() (" + root_child0.getComputedWidth() + ")");
  console.assert(10 === root_child0.getComputedHeight(), "10 === root_child0.getComputedHeight() (" + root_child0.getComputedHeight() + ")");

  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_RTL);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(100 === root.getComputedWidth(), "100 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(100 === root.getComputedHeight(), "100 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  console.assert(10 === root_child0.getComputedLeft(), "10 === root_child0.getComputedLeft() (" + root_child0.getComputedLeft() + ")");
  console.assert(10 === root_child0.getComputedTop(), "10 === root_child0.getComputedTop() (" + root_child0.getComputedTop() + ")");
  console.assert(80 === root_child0.getComputedWidth(), "80 === root_child0.getComputedWidth() (" + root_child0.getComputedWidth() + ")");
  console.assert(10 === root_child0.getComputedHeight(), "10 === root_child0.getComputedHeight() (" + root_child0.getComputedHeight() + ")");

  if (typeof root !== "undefined")
    root.freeRecursive();

  (typeof gc !== "undefined") && gc();
  console.assert(0 === Yoga.getInstanceCount(), "0 === Yoga.getInstanceCount() (" + Yoga.getInstanceCount() + ")");
});
it("border_center_child", function () {
  var root = Yoga.Node.create();
  root.setJustifyContent(Yoga.JUSTIFY_CENTER);
  root.setAlignItems(Yoga.ALIGN_CENTER);
  root.setBorder(Yoga.EDGE_START, 10);
  root.setBorder(Yoga.EDGE_END, 20);
  root.setBorder(Yoga.EDGE_BOTTOM, 20);
  root.setWidth(100);
  root.setHeight(100);

  var root_child0 = Yoga.Node.create();
  root_child0.setWidth(10);
  root_child0.setHeight(10);
  root.insertChild(root_child0, 0);
  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_LTR);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(100 === root.getComputedWidth(), "100 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(100 === root.getComputedHeight(), "100 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  console.assert(40 === root_child0.getComputedLeft(), "40 === root_child0.getComputedLeft() (" + root_child0.getComputedLeft() + ")");
  console.assert(35 === root_child0.getComputedTop(), "35 === root_child0.getComputedTop() (" + root_child0.getComputedTop() + ")");
  console.assert(10 === root_child0.getComputedWidth(), "10 === root_child0.getComputedWidth() (" + root_child0.getComputedWidth() + ")");
  console.assert(10 === root_child0.getComputedHeight(), "10 === root_child0.getComputedHeight() (" + root_child0.getComputedHeight() + ")");

  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_RTL);

  console.assert(0 === root.getComputedLeft(), "0 === root.getComputedLeft() (" + root.getComputedLeft() + ")");
  console.assert(0 === root.getComputedTop(), "0 === root.getComputedTop() (" + root.getComputedTop() + ")");
  console.assert(100 === root.getComputedWidth(), "100 === root.getComputedWidth() (" + root.getComputedWidth() + ")");
  console.assert(100 === root.getComputedHeight(), "100 === root.getComputedHeight() (" + root.getComputedHeight() + ")");

  console.assert(50 === root_child0.getComputedLeft(), "50 === root_child0.getComputedLeft() (" + root_child0.getComputedLeft() + ")");
  console.assert(35 === root_child0.getComputedTop(), "35 === root_child0.getComputedTop() (" + root_child0.getComputedTop() + ")");
  console.assert(10 === root_child0.getComputedWidth(), "10 === root_child0.getComputedWidth() (" + root_child0.getComputedWidth() + ")");
  console.assert(10 === root_child0.getComputedHeight(), "10 === root_child0.getComputedHeight() (" + root_child0.getComputedHeight() + ")");

  if (typeof root !== "undefined")
    root.freeRecursive();

  (typeof gc !== "undefined") && gc();
  console.assert(0 === Yoga.getInstanceCount(), "0 === Yoga.getInstanceCount() (" + Yoga.getInstanceCount() + ")");
});
