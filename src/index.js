
import atpTree from "./reducer/tree";
import {openAllTreeNodes, openTreeNode, closeAllTreeNodes, closeTreeNode} from "./reducer/tree";
import TreeNode from "./container/tree-node";

const Tree = {
    reducers: {
        atpTree
    }
};

export default Tree;

export {TreeNode, openAllTreeNodes, openTreeNode, closeAllTreeNodes, closeTreeNode};
