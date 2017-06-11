
const test = require('tape')
const pull = require('pull-stream')
const { drain } = pull
const html = require('../')
const { read } = require('pull-files')

test('bundles html', t => {
  t.plan(2)

  pull(
    read([ 'foo.js', 'foo.css' ], { cwd: __dirname }),
    html('foo.html', { title: 'testing' }),
    drain(file => {
      t.true(file, 'got file')
      console.log(file)
      console.log(file.data.toString())
    }, t.false)
  )
})

test('script async', t => {
  t.plan(3)

  pull(
    read([ 'foo.js'], { cwd: __dirname }),
    html('foo.html', { scriptAsync: true}),
    drain(file => {
      const html = file.data.toString()
      t.assert(html.indexOf('async="true"') > -1, 'script has async attribute')
      t.assert(html.indexOf('async="true"') < html.indexOf('</head>'), 'script is before closing head tag')
    }, t.false)
  )
})


