/**
 * Created by AWITTROCK on 7/17/2017.
 */

import {o} from "atp-sugar";
import {connect} from "react-redux";
import {dragSource, hierarchicalDropTarget} from 'atp-dnd';
import {compose} from 'atp-pointfree';
import TreeNode from "../component/tree-node";
import {getTreeNode, openTreeNode, closeTreeNode} from "../reducer/tree";

//Generic tree node component
const treeNodeContainer = connect(
    (state, props) => o(props.parentNodeId + "/" + props.id).as(nodeId => ({
        ...props,
        nodeId,
        obj: props.getObject(state, props.id),
        children: props.getChildren(state, props.id).sort(props.sorter),
        parents: props.parents || [],
        node: getTreeNode(() => state, nodeId)
    })),
    (dispatch, props) => o(props.parentNodeId + "/" + props.id).as(nodeId => ({
        onOpen: id => () => dispatch(openTreeNode(id)),
        onClose: id => () => dispatch(closeTreeNode(id)),
        onMove: props.onMove || (({dropEffect, sourceId, targetId}) => {
            console.log("Move node " + sourceId + " " + dropEffect + " node " + targetId);
        })
    }))
)(TreeNode);

const type = props => props.draggable || 'tree-node';
const accepts = props => props.accepts || {};
export default compose(
    dragSource(type),
    hierarchicalDropTarget({type, action: 'into',  name: 'addChild', accepts}),
    hierarchicalDropTarget({type, action: 'after', name: 'addAfter', accepts})
)(treeNodeContainer);
