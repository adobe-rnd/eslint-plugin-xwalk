const rules = require('./rules');

module.exports = {
  rules,
  configs: {
    'recommended': {
      plugins: ['xwalk', 'json'],
      rules: {
        'xwalk/max-cells': ['error', { '*': 4 }],
        'xwalk/no-duplicate-fields': 'error',
        'xwalk/invalid-field-name': 'error',
        'xwalk/no-orphan-collapsible-fields': 'error',
        'xwalk/no-custom-resource-types': 'error',
      }
    }
  }
};
