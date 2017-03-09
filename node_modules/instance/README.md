[![NPM version](https://badge.fury.io/js/instance.png)](http://badge.fury.io/js/instance)
[![Build Status](https://secure.travis-ci.org/vesln/instance.png)](http://travis-ci.org/vesln/instance)
[![Coverage Status](https://coveralls.io/repos/vesln/instance/badge.png?branch=master)](https://coveralls.io/r/vesln/instance?branch=master)

# instance

## Usage

```js
var instance = require('instance');
var obj = {};
function Klass(){}
global.other = {};

instance(obj) === obj; // already an instance
instance(klass).constructor.name === 'Klass'
instance('other') === instance(global.other);
instance('something') === instance(require('something'))
```

## Installation

#### npm:

```bash
npm install instance
```

#### component:

```bash
component install vesln/instance
```

#### standalone:

```bash
<script src="instance"></script>
```

## Tests

### Running the tests

All:

```bash
$ make test
```

Node:

```bash
$ make test-node
```

Browser:

```bash
$ make test-browser
```

### Test coverage

```bash
$ npm run coverage
```

## License

(The MIT License)

Copyright (c) 2013 Veselin Todorov <hi@vesln.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
