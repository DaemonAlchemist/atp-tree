/**
 * Created by AWITTROCK on 7/17/2017.
 */

import {o} from "atp-sugar";
import {connectWithLifecycle} from "react-lifecycle-component";

import TreeNode from "../component/tree-node";
import {openTreeNode, closeTreeNode, initTreeNode} from "../reducer/tree";

//Generic tree node component
export default connectWithLifecycle(
    (state, props) => o(props.parentNodeId + "/" + props.id).as(nodeId => ({
        ...props,
        nodeId,
        obj: props.getObject(state, props.id),
        children: props.getChildren(state, props.id).sort(props.sorter),
        node: state.atpTree[nodeId] || {
            open: false
        }
    })),
    (dispatch, props) => o(props.parentNodeId + "/" + props.id).as(nodeId => ({
        componentDidMount: () => dispatch(initTreeNode(nodeId)),
        onOpen: id => () => dispatch(openTreeNode(id)),
        onClose: id => () => dispatch(closeTreeNode(id))
    }))
)(TreeNode);
