/**
 * Created by Andy on 7/9/2017.
 */

import {o} from "atp-sugar";

//Action Types
export const TREE_NODE_OPEN = "atp-tree/node/open";
export const TREE_NODE_OPEN_ALL = "atp-tree/node/openAll";
export const TREE_NODE_CLOSE = "atp-tree/node/close";
export const TREE_NODE_CLOSE_ALL = "atp-tree/node/closeAll";
export const TREE_NODE_MOVE = "atp-tree/node/move";

//Selectors
export const getTreeNode = (getState, nodeId) =>
    typeof getState().atpTree !== 'undefined' && typeof getState().atpTree[nodeId] !== 'undefined'
        ? getState().atpTree[nodeId]
        : {open: false};

//Action creators
export const initTreeNode = nodeId => ({type: TREE_NODE_INIT, nodeId});
export const openTreeNode = nodeId => ({type: TREE_NODE_OPEN, nodeId});
export const openAllTreeNodes = nodePrefix => ({type: TREE_NODE_OPEN_ALL, nodePrefix});
export const closeTreeNode = nodeId => ({type: TREE_NODE_CLOSE, nodeId});
export const closeAllTreeNodes = nodePrefix => ({type: TREE_NODE_CLOSE_ALL, nodePrefix});

const toggleOpenStatus = (state, id, status) => ({
    ...state,
    [id]: {
        ...state[id],
        open: status
    }
});

const toggleAllOpenStatus = (state, prefix, status) => o(state).map(
    (node, nodeId) => ({
        ...node,
        open: nodeId.indexOf(prefix) === 0 ? status : node.open
    })
).raw;

//Reducer
export default (state = [], action) => o(action.type).switch({
    [TREE_NODE_OPEN]:     () => toggleOpenStatus(state, action.nodeId, true),
    [TREE_NODE_CLOSE]:    () => toggleOpenStatus(state, action.nodeId, false),
    [TREE_NODE_OPEN_ALL]: () => toggleAllOpenStatus(state, action.nodePrefix, true),
    [TREE_NODE_CLOSE_ALL]: () => toggleAllOpenStatus(state, action.nodePrefix, false),
    [TREE_NODE_MOVE]: () => state,
    default: () => state
});
