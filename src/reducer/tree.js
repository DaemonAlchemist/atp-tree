/**
 * Created by Andy on 7/9/2017.
 */

import {o} from "atp-sugar";

//Action Types
export const TREE_NODE_OPEN = "atp-tree/node/open";
export const TREE_NODE_CLOSE = "atp-tree/node/close";
export const TREE_SORT = "atp-tree/sort";

//Action creators
export const openTreeNode = node => ({type: TREE_NODE_OPEN, node});
export const closeTreeNode = node => ({type: TREE_NODE_CLOSE, node});
export const sortTree = (treeId, sorter) => ({type: TREE_SORT, treeId, sorter});

//Reducer
export default (state = [], action) => o(action.type).switch({
    [TREE_NODE_OPEN]: () => state,
    [TREE_NODE_CLOSE]: () => state,
    [TREE_SORT]: () => state,
    default: () => state
});
