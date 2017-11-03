/**
 * Created by AWITTROCK on 7/17/2017.
 */

import {o} from "atp-sugar";
import {connectWithLifecycle} from "react-lifecycle-component";
import {dragSource, hierarchicalDropTarget} from 'atp-dnd';
import {_} from 'atp-pointfree';
import TreeNode from "../component/tree-node";
import {openTreeNode, closeTreeNode, initTreeNode} from "../reducer/tree";

const addChildTarget = hierarchicalDropTarget('tree-node', 'into', 'addChild');
const addAfterTarget = hierarchicalDropTarget('tree-node', 'after', 'addAfter');

//Generic tree node component
const treeNodeContainer = connectWithLifecycle(
    (state, props) => o(props.parentNodeId + "/" + props.id).as(nodeId => ({
        ...props,
        nodeId,
        obj: props.getObject(state, props.id),
        children: props.getChildren(state, props.id).sort(props.sorter),
        parents: props.parents || [],
        node: typeof state.atpTree !== 'undefined' && typeof state.atpTree[nodeId] !== 'undefined'
            ? state.atpTree[nodeId]
            :{open: false}
    })),
    (dispatch, props) => o(props.parentNodeId + "/" + props.id).as(nodeId => ({
        componentDidMount: () => dispatch(initTreeNode(nodeId)),
        onOpen: id => () => dispatch(openTreeNode(id)),
        onClose: id => () => dispatch(closeTreeNode(id)),
        onMove: props.onMove || (({dropEffect, sourceId, targetId}) => {
            console.log("Move node " + sourceId + " " + dropEffect + " node " + targetId);
        })
    }))
)(TreeNode);

export default _(dragSource('tree-node'), addChildTarget, addAfterTarget)(treeNodeContainer);
