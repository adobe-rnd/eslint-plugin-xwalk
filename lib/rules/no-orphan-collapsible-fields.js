const { findLocationOfField } = require('../ast');
const { makeComponentModelsRule } = require("../base-rule");

const knownNames = [ 'pageTitle' ];

function getOrphanCollapsibleNames(modelId, names) {
  // field collapsing
  const orphans = [];
  for (const name of names) {
    // for some models we allow a few special fields, like pageTitle in the page-metadata model
    if (modelId.endsWith('-metadata') && knownNames.indexOf(name) >= 0) {
      // ship those
      continue;
    }

    let suffix;
    if (name.endsWith('Text')) suffix = 'Text';
    if (name.endsWith('Title')) suffix = 'Title';
    if (name.endsWith('Type')) suffix = 'Type';
    if (name.endsWith('Alt')) suffix = 'Alt';
    if (name.endsWith('MimeType')) suffix = 'MimeType';

    // has suffix and base field, skip
    if (suffix && names.indexOf(name.substr(0, name.length - suffix.length)) === -1) {
      orphans.push(name);
    }
  }

  return orphans;
}

const create = makeComponentModelsRule(({ ruleContext, obj: models, getAst, getFieldNames }) => {
  for (let model of models) {
    const id = model.id;
    const fieldNames = getFieldNames(model);
    const orphans = getOrphanCollapsibleNames(id, fieldNames);
    if (orphans.length > 0) {
      for (let orphan of orphans) {
        ruleContext.report({
          ruleId: "no-oprhan-collapsible-fields",
          messageId: 'avoidOrphanCollapsibleFieldNames',
          data: {
            
          },
          loc: findLocationOfField(getAst(), id, orphan)
        });
      }
    }
  }
});

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Do not use collapsible field name suffixes without the actual field being present in the model.",
      category: "Best Practices",
      recommended: true
    },
    schema: [],
    messages: {
      avoidOrphanCollapsibleFieldNames: "Avoid using orphan collapsible field names."
    }
  },
  create
}
