
//Ancestry
export const parent = node => node.parent;
export const ancestors = node => node.parent
    ? [node.parent].concat(ancestors(node.parent))
    : [];
export const hierarchy = node => [node].concat(ancestors(node));
export const root = node => node.parent
    ? root(node.parent)
    : node;

//Checks
export const inSubTree = (root, node) => hierarchy(node).contains(root);