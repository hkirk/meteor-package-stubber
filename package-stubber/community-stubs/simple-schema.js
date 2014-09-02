/**
 * Created by henrik on 24/08/14.
 */



var emptyFn = function () {};
var emptyStringFn  = function () {
  return '';
};
var emptyObjectFn = function () {
  return undefined;
};

SimpleSchema = function () {
  constructor = emptyFn;
  extendOptions = emptyFn;
  _makeGeneric = emptyFn;
  addValidator = emptyFn;
  _globalMessages: {};
  messages = emptyFn;
  messageForError = emptyFn;
  RegEx = {}
};

SimpleSchema.prototype = {
  constructor: SimpleSchema,
  condition: emptyFn,
  namedContext: emptyFn,
  addValidator: emptyFn,
  clean: emptyObjectFn,
  schema: emptyObjectFn,
  getDefinition: emptyObjectFn,
  keyIsInBlackBox: emptyObjectFn,
  label: emptyFn,
  allowsKey: emptyFn
};

SimpleSchema.RegEx = {
  Email: null,
  Domain: null,
  WeakDomain: null,
  IP: null,
  IPv4: null,
  IPv6: null,
  Url: null,
  Id: null
};

SimpleSchema.messages = emptyFn;