# Description

Simplest validation for javascript available (90 lines of code). Works in Node, commonjs, amd, and global scope.

# Installation

```
npm install flat-validator
```

# Usage

```js

var validator = require('flat-validator');

var data = {
  email: 'thomas@mail.com',
  password: 'superMan15'
};

var rules = {
  email: {
    required: true,
    type: 'string',
    regex: validator.regex.email
  },
  password: {
    required: true,
    type: 'string',
    minLength: 6,
    maxLength: 19
  }
};

// validData is either true or object (fieldName, ruleName, ruleValue).
var validData = validator.validate(data, rules);

```