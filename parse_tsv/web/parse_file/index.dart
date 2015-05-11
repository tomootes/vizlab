// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'tsv.dart';

Stopwatch stopwatch = new Stopwatch();

void main() {
  stopwatch..start();
  String path = "data/sjonglering2.tsv";
  var sjonglering = new Tsv(path);
  var coordinates = sjonglering.getFileContents(path);
  print(coordinates);
}