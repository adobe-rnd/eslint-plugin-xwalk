const { iterator } = require("@humanwhocodes/momoa");
const { parse } = require("@humanwhocodes/momoa");

const unknownLocation = { 
  start: { line: NaN, column: NaN, offset: NaN }, 
  end: { line: NaN, column: NaN, offset: NaN } 
};

function findById(ast, id) {
  for (const { node, parent } of iterator(ast)) {
    if (node.type === 'Member') {
      if (node.name.value === 'id' && node.value.value === id) {
        return parent;
      }
    }
  }
  return null;
}

function findLocationOfModel(ast, id) {
  const node = findById(ast, id);
  return node ? node.loc : unknownLocation;
}

function findNodeOfFieldInModel(modelNode, fieldName) {
  if (modelNode) {
    for (const { node, parent } of iterator(modelNode)) {
      if (node.type === 'Member' && node.name.value === 'name' && node.value.value === fieldName) {
        return { ...node, parent };
      }
    }
  }
  return null;
}

function findLocationOfField(ast, id, fieldName) {
  const modelNode = findById(ast, id);
  let effectiveNode = modelNode;
  let effectiveFieldName = fieldName;
  while (effectiveFieldName.includes('/')) {
    const [ parentFieldName, rest ] = effectiveFieldName.split('/', 2);
    effectiveFieldName = rest;
    effectiveNode = findNodeOfFieldInModel(effectiveNode, parentFieldName)?.parent;
  }
  if (!effectiveNode) {
    // if we haven't found the effective container node restore the original field name and node
    effectiveNode = modelNode;
    effectiveFieldName = fieldName;
  }
  return findNodeOfFieldInModel(effectiveNode, effectiveFieldName)?.loc || unknownLocation;
}

function findLocationOfResourceType(ast, id) {
  const componentNode = findById(ast, id);
  if (componentNode) {
    for (const { node } of iterator(componentNode)) {
      if (node.type === 'Member' && node.name.value === 'resourceType') {
        return node.loc;
      }
    }
  }
  return unknownLocation;
}

module.exports = {
  parse,
  findLocationOfModel,
  findLocationOfField,
  findLocationOfResourceType
} 
