(function() {
    
  var flatValidator = {};

  flatValidator.regex = {
    email: /^[a-zA-Z0-9+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/
  };

  flatValidator.ruleHandlers = {
    required: function(fieldName, data, ruleValue) {
      if (ruleValue !== true) return;
    
      if (data[fieldName] === undefined || data[fieldName] === '') {
        return false;
      }
    
      return true;
    },
    type: function(fieldName, data, ruleValue) {
      if (typeof(data[fieldName]) !== ruleValue && ruleValue !== 'array') {
        return false;
      }
      
      if(ruleValue === 'array' && Object.prototype.toString.call( data[fieldName] ) !== '[object Array]' ) {
          return false;
      }
    
      return true;
    },
    minLength: function(fieldName, data, ruleValue) {
      if (data[fieldName].length < ruleValue) {
        return false;
      }
    
      return true;
    },
    maxLength: function(fieldName, data, ruleValue) {
      if (data[fieldName].length > ruleValue) {
        return false;
      }
    
      return true
    },
    regex: function(fieldName, data, ruleValue) {
      return ruleValue.test(data[fieldName]);
    }
  };
  
  /**
   * Validates data against "rules".
   * 
   * @param  {Object} data  
   * @param  {Object} rules 
   * @return {Object|Boolean}
   * @example
   *
   *  var flatValidator = require('flatValidator');
   *  var data = {email: 'thomas@gmail.com'};
   *  var rules = {email: {type: 'string', regex: flatValidator.regex.email}};
   *  var valid = flatValidator.validate(data, rules);
   */
  flatValidator.validate = function(data, rules) {
    for (var fieldName in rules) {
      var fieldRules = rules[fieldName];
    
      for (var ruleName in fieldRules) {
        var ruleValue = fieldRules[ruleName];
        var ruleHandler = flatValidator.ruleHandlers[ruleName];
        var result = ruleHandler(fieldName, data, ruleValue);
    
        if (result === false) {
          return {
            fieldName: fieldName,
            ruleName: ruleName,
            ruleValue: ruleValue
          };
        }
      }
    }
  
    return true;
  };

  if (typeof(module) !== 'undefined' && module.exports) {
    module.exports = flatValidator;
  } else if (typeof(define) !== 'undefined') {
    define(function() {
      return flatValidator;
    });
  } else {
    this.flatValidator = flatValidator;
  }
  
}());
