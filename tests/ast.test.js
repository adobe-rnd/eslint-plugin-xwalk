const {
  parse,
  findLocationOfModel,
  findLocationOfField,
  findLocationOfResourceType,
} = require('../lib/ast.js');
const assert = require('assert');

describe('ast', () => {

  it('returns a model by id', () => {
    const ast = parse(
      `
      [
        {
          "id": "model",
          "fields": []
        }
      ]
      `);

    const loc = findLocationOfModel(ast, 'model');
    assert.notEqual(loc, null);
    assert.deepStrictEqual(loc, {
      start: { line: 3, column: 9, offset: 17 },
      end: { line: 6, column: 10, offset: 76 }
    });
  });

  it('returns an unknown location for model id not found', () => {
    const ast = parse(
      `
      [
        {
          "id": "model",
          "fields": []
        }
      ]
      `);

    const loc = findLocationOfModel(ast, 'another-model');
    assert.notEqual(loc, null);
    assert.deepStrictEqual(loc, {
      start: { line: NaN, column: NaN, offset: NaN },
      end: { line: NaN, column: NaN, offset: NaN }
    });
  });

  it('returns the location of a field in a model', () => {
    const ast = parse(
      `
      [
        {
          "id": "model",
          "fields": [
            {
              "name": "field"
            }
          ]
        }
      ]
      `);

    const loc = findLocationOfField(ast, 'model', 'field');
    assert.notEqual(loc, null);
    assert.deepEqual(loc, {
      start: { line: 7, column: 15, offset: 94 },
      end: { line: 7, column: 30, offset: 109 }
    });
  });

  it('returns an unknown location of a non existing field in a model', () => {
    const ast = parse(
      `
      [
        {
          "id": "model",
          "fields": [
            {
              "name": "field"
            }
          ]
        }
      ]
      `);

    const loc = findLocationOfField(ast, 'model', 'another-field');
    assert.notEqual(loc, null);
    assert.deepEqual(loc, {
      start: { line: NaN, column: NaN, offset: NaN },
      end: { line: NaN, column: NaN, offset: NaN }
    });
  });

  it('returns an unknown location of a field in an unknown model', () => {
    const ast = parse(
      `
      [
        {
          "id": "model",
          "fields": [
            {
              "name": "field"
            }
          ]
        }
      ]
      `);

    const loc = findLocationOfField(ast, 'another-model', 'field');
    assert.notEqual(loc, null);
    assert.deepEqual(loc, {
      start: { line: NaN, column: NaN, offset: NaN },
      end: { line: NaN, column: NaN, offset: NaN }
    });
  });

  it('returns the location of the resource type of a component', () => {
    const ast = parse(
      `
      {
        "groups": [
          {
            "id": "group",
            "components": [
              {
                "id": "component",
                "plugins": {
                  "xwalk": {
                    "page": {
                      "resourceType": "foobar"
                    }
                  }
                }
              }
            ]
          }
        ]
      }
      `);

    const loc = findLocationOfResourceType(ast, 'component');
    assert.notEqual(loc, null);
    assert.deepEqual(loc, {
      start: { line: 12, column: 23, offset: 257 },
      end: { line: 12, column: 47, offset: 281 }
    });
  });

  it('returns an unknown location of the resource type in an unknown component', () => {
    const ast = parse(
      `
      {
        "groups": [
          {
            "id": "group",
            "components": [
              {
                "id": "component",
                "plugins": {
                  "xwalk": {
                    "page": {
                      "resourceType": "foobar"
                    }
                  }
                }
              }
            ]
          }
        ]
      }
      `);

    const loc = findLocationOfResourceType(ast, 'another-component');
    assert.notEqual(loc, null);
    assert.deepEqual(loc, {
      start: { line: NaN, column: NaN, offset: NaN },
      end: { line: NaN, column: NaN, offset: NaN }
    });
  });

  it('returns an unknown location for the resource type if not set', () => {
    const ast = parse(
      `
      {
        "groups": [
          {
            "id": "group",
            "components": [
              {
                "id": "component"
              }
            ]
          }
        ]
      }
      `);

    const loc = findLocationOfResourceType(ast, 'component');
    assert.notEqual(loc, null);
    assert.deepEqual(loc, {
      start: { line: NaN, column: NaN, offset: NaN },
      end: { line: NaN, column: NaN, offset: NaN }
    });
  });
})
