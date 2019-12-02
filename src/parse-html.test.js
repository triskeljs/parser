
import assert from 'assert'

import { parseTags, parseRawTags, parseComments } from './parse-html'

/** */
describe( '.' + __filename.substr( process.cwd().length ), function () {
// --------------------------------------

describe('parseTags: throws', function () {

  it('html source should be a String', function () {

    assert.throws(function () {
      parseTags()
    }, /html source should be a String/)

    assert.throws(function () {
      parseTags()
    }, TypeError)

  })

})

describe('parseRawTags', function () {

  function _runTestCases (html, result, raw_tags = 'script, style, code') {

    it(`${ html } [${ raw_tags }]`, function () {

      assert.deepStrictEqual(
        parseRawTags(html, raw_tags.split(/ *, */) ),
        { ast: result, opened_tags: [] },
      )

    })

  }

  [

    [ '<div>', [ '<div>' ] ],
    [ '<div data-value="foo">', [ '<div data-value="foo">' ] ],
    
    [ '<style>foo</style>', [ { $: 'style', _: 'foo' } ] ],

    [ '<div><style>foobar</style></div>', ['<div>', { $: 'style', _: 'foobar' }, '</div>'] ],
    [ '<div><style><div>foobar</div></style></div>', ['<div>', { $: 'style', _: '<div>foobar</div>' }, '</div>'] ],

    [ '<div><style data-foo="bar"><div>foobar</div></style></div>', [
      '<div>', { $: 'style', attrs: { 'data-foo': 'bar' }, _: '<div>foobar</div>' }, '</div>'
    ] ],

    [ '<div><style data-foo=" foo < foobar > bar "><div>foobar</div></style></div>', [
      '<div>', { $: 'style', attrs: { 'data-foo': 'foo < foobar > bar' }, _: '<div>foobar</div>' }, '</div>'
    ] ],

    [ `<div><style data-foo="{
      foo: foobar > foo,
      bar: foobar < bar,
    }"><div>foobar</div></style></div>`, [
      '<div>', { $: 'style', attrs: { 'data-foo': '{foo: foobar > foo,bar: foobar < bar,}' }, _: '<div>foobar</div>' }, '</div>'
    ] ],

    [`<pre><code class="language-html">
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
<html>
</code></pre>`, ['<pre>', {
      $: 'code', attrs: { class: 'language-html' }, _: `
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
<html>
` }, '</pre>' ] ],

    ['<code><script></code>', [{ $: 'code', _: '<script>' }] ],

    ['<code><script><style></style></code>', [{ $: 'code', _: '<script><style></style>' }] ],

  ].forEach( (test_case) => _runTestCases.apply(null, test_case) )

})

describe('parseComments', function () {

  function _runTestCases (html, result) {
    
    it(`${ html }`, function () {

      assert.deepStrictEqual(
        parseComments(html),
        result,
      )

    })

  }

  [

    ['<!-- foo -->', [{ type: 'comment', _: ' foo ' }] ],
    ['<!-- <!-- -->', [{ type: 'comment', _: ' <!-- ' }] ],

    ['<!-- foo --> foobar <!-- bar -->', [{ type: 'comment', _: ' foo ' }, ' foobar ', { type: 'comment', _: ' bar ' }] ],

  ].forEach( (test_case) => _runTestCases.apply(null, test_case) )

})

describe('parseTags({ !raw_tags })', function () {

  function _runTestCases (html, result, opened_tags = []) {

    it(`${ html }`, function () {

      assert.deepStrictEqual(
        parseTags(html),
        { ast: result, opened_tags },
      )

    })

  }

  [

    [ '<div>', [ { $: 'div', _: [] } ], [{ $: 'div', _: [] }] ],
    [ '<div data-value="foo">', [ { $: 'div', attrs: { 'data-value': 'foo' }, _: []  } ], [ { $: 'div', attrs: { 'data-value': 'foo' }, _: [] } ] ],

    [ '<div data-value="foo" />', [ { $: 'div', attrs: { 'data-value': 'foo' }, self_closed: true  } ] ],

  ].forEach( (test_case) => _runTestCases.apply(null, test_case) )

})

/** */
})
/** */
