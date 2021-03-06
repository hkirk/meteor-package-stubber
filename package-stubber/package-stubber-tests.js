var exampleAppDir = 'package-stubber/example-app';


Tinytest.add('PackageStubber - finds test packages', function (test) {
  var expected = ['jasmine-unit', 'mocha-web-velocity'],
      actual;

  actual = PackageStubber.listTestPackages({
    appDir: exampleAppDir
  });

  test.equal(actual, expected);
});


Tinytest.add('PackageStubber - list packages', function (test) {
  var expected = [
        "blaze-layout",
        "iron-router",
        "jasmine-unit",
        "mirror",
        "mocha-web-velocity",
        "moment",
        "package-stubber",
        "roles",
        "velocity"
      ],
      actual;

  actual = PackageStubber.listPackages({
    appDir: exampleAppDir
  });

  test.equal(actual, expected);
});


Tinytest.add('PackageStubber - list package exports', function (test) {
  var expected = [
        {"package":"blaze-layout","name":"Layout"},
        {"package":"iron-router","name":"RouteController"},
        {"package":"iron-router","name":"Route"},
        {"package":"iron-router","name":"Router"},
        {"package":"iron-router","name":"IronLocation"},
        {"package":"iron-router","name":"Utils"},
        {"package":"iron-router","name":"IronRouter"},
        {"package":"iron-router","name":"WaitList"},
        {"package":"mirror","name":"Mirror"},
        {"package":"mocha-web-velocity","name":"MochaWeb"},
        {"package":"mocha-web-velocity","name":"MeteorCollectionTestReporter"},
        {"package":"moment","name":"moment"},
        {"package":"package-stubber","name":"PackageStubber"},
        {"package":"roles","name":"Roles"},
        {"package":"velocity","name":"VelocityTestFiles"},
        {"package":"velocity","name":"VelocityTestReports"},
        {"package":"velocity","name":"VelocityAggregateReports"},
        {"package":"velocity","name":"VelocityLogs"}
      ],
      actual;

  actual = PackageStubber.listPackageExports({
    appDir: exampleAppDir
  });

  test.equal(actual, expected);
});


Tinytest.add('PackageStubber - deep-copy object', function (test) {
  var target = {
        name: 'parentObject',
        fn: function () { return true; },
        num: 1,
        nil: null,
        d: new Date(1978, 7, 9),
        child: {
          name: 'childObject',
          fn: function () { return false; },
          num: 2,
          nil: null,
          d: new Date(2009, 0, 1)
        }
      },
      expected = {
        name:"parentObject",
        fn:"FUNCTION_PLACEHOLDER",
        num:1,
        nil:null,
        d: new Date(1978, 7, 9),
        child:{
          name:"childObject",
          fn:"FUNCTION_PLACEHOLDER",
          num:2,
          nil:null,
          d: new Date(2009, 0, 1)
        }
      },
      actual;

  actual = PackageStubber.deepCopyReplaceFn(target);
  test.equal(JSON.stringify(actual), JSON.stringify(expected), 'defaults');

  expected.fn = "FOO"
  expected.child.fn = "FOO"
  actual = PackageStubber.deepCopyReplaceFn(target, "FOO");
  test.equal(JSON.stringify(actual), JSON.stringify(expected), 
      'custom fnPlaceholder');
});


Tinytest.add('PackageStubber - generate stub', function (test) {
  var target = {
        name: 'parentObject',
        fn: function () { return true; },
        num: 1,
        nil: null,
        d: new Date(1978, 7, 9),
        child: {
          name: 'childObject',
          fn: function () { return false; },
          num: 2,
          nil: null,
          d: new Date(2009, 0, 1)
        }
      },
      expected1 = {
        "name": "parentObject",
        "fn": "FUNCTION_PLACEHOLDER",
        "num": 1,
        "nil": null,
        "d": new Date(1978, 7, 9),
        "child": {
          "name": "childObject",
          "fn": "FUNCTION_PLACEHOLDER",
          "num": 2,
          "nil": null,
          "d": new Date(2009, 0, 1)
        }
      },
      expected,
      actual;

  actual = PackageStubber.generateStubSource(target, 'test', 'test-package');
  expected = JSON.stringify(expected1, null, 2)
                 .replace(/"FUNCTION_PLACEHOLDER"/g, "function emptyFn () {}");
  test.equal(actual, expected, 'defaults');
});


Tinytest.add('PackageStubber - list packages to ignore', function (test) {
  var expected = new MiniSet([
        "meteor-package-stubber",
        "package-stubber",
        "velocity",
        "mirror",
        "jasmine-unit",
        "mocha-web-velocity"
      ]),
      actual;

  actual = PackageStubber.listPackagesToIgnore({
    appDir: exampleAppDir
  });
  test.equal(actual.keys().sort(), expected.keys().sort(), 'defaults');

  expected.add('foo');
  actual = PackageStubber.listPackagesToIgnore({
    appDir: exampleAppDir,
    dontStub: 'foo'
  });
  test.equal(actual.keys().sort(), expected.keys().sort(), 'dontStub string');

  expected.add('bar');
  actual = PackageStubber.listPackagesToIgnore({
    appDir: exampleAppDir,
    dontStub: ['foo', 'bar']
  });
  test.equal(actual.keys().sort(), expected.keys().sort(), 'dontStub array');
});


Tinytest.add('PackageStubber - get core stubs', function (test) {
  var expected = [
        'jquery',
        'underscore'
      ],
      options = {
        appDir: exampleAppDir
      },
      actual;

  options.packagesToIgnore = PackageStubber.listPackagesToIgnore(options);

  actual = _.pluck(PackageStubber.getCoreStubs(options), 'package')

  test.equal(actual.sort(), expected.sort(), 'defaults');
});


Tinytest.add('PackageStubber - get community stubs', function (test) {
  var expected = [
        'iron-router'
      ],
      options = {
        appDir: exampleAppDir
      },
      actual;

  options.packagesToIgnore = PackageStubber.listPackagesToIgnore(options);

  actual = _.pluck(PackageStubber.getCommunityStubs(options), 'package')

  test.equal(actual.sort(), expected.sort(), 'defaults');
});
