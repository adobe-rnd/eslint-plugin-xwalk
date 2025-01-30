const { findLocationOfModel } = require('../ast');
const { makeComponentModelsRule } = require("../base-rule");

function getComponentDefs(componentDef) {
  return (componentDef.groups || []).flatMap(group => group.components || [])
}

function groupNames(names) {
  // field collapsing
  const collapsedNames = [];
  for (const name of names) {
    let suffix;
    if (name.endsWith('Text')) suffix = 'Text';
    if (name.endsWith('Title')) suffix = 'Title';
    if (name.endsWith('Type')) suffix = 'Type';
    if (name.endsWith('Alt')) suffix = 'Alt';
    if (name.endsWith('MimeType')) suffix = 'MimeType';

    // has suffix and base field, skip
    if (suffix && names.indexOf(name.substr(0, name.length - suffix.length)) !== -1) continue;

    // otherwise keep the name
    collapsedNames.push(name);
  }

  // element grouping
  const groups = [];
  for (let name of collapsedNames) {
    const match = name.match(/^([^_]+)(_.+)?$/);
    if (!match) continue;
    name = match[1];
    if (groups.indexOf(name) === -1) {
      groups.push(name);
    }
  }

  return groups;
}

const create = makeComponentModelsRule(({ ruleContext, obj: models, readFile, getAst, getFieldNames }) => {
  const limits = ruleContext.options[0] || {};
  for (let model of models) {
    const id = model.id;

    // some models are not used to render blocks - in particular *-metadata models like page-metadata, or <template>-metadata
    // skip those
    if (id.endsWith('-metadata')) continue;

    const fieldNames = getFieldNames(model);
    const groupedFieldNames = groupNames(fieldNames);
    const limit = limits[id] || limits['*'] || 4;
    if (groupedFieldNames.length > limit) {
      // check if the model is only used in key-value blocks
      let componentDef = readFile('component-definition.json');
      componentDef = getComponentDefs(componentDef ? JSON.parse(componentDef) : {});
      const allComponentDefs = componentDef
        .filter(def => def
          && def.plugins
          && def.plugins.xwalk
          && def.plugins.xwalk.page
          && def.plugins.xwalk.page.template
          && def.plugins.xwalk.page.template['model'] === id);
      const allKeyValue = allComponentDefs
        .map(def => Boolean(def.plugins.xwalk.page.template['key-value']))
        .reduce((acc, val) => acc && val, allComponentDefs.length > 0);

      if (!allKeyValue) {
        ruleContext.report({
          ruleId: "max-cells",
          messageId: 'avoidName',
          data: {
            maxcells: limit,
            foundcells: groupedFieldNames.length,
            model: id
          },
          loc: findLocationOfModel(getAst(), id)
        });
      }
    }
  }
});

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Limit the number of cells in a block.",
      category: "Best Practices",
      recommended: true
    },
    schema: [{
      type: "object",
      additionalProperties: { "type": "number" }
    }],
    messages: {
      avoidName: "Avoid using more than {{ maxcells }} cells in a block, found {{ foundcells }} for {{ model }}"
    }
  },
  create
}
