/**
 * Created by AWITTROCK on 7/17/2017.
 */

import {o} from "atp-sugar";
import {connectWithLifecycle} from "react-lifecycle-component";
import {DragSource, DropTarget} from 'react-dnd';

import TreeNode from "../component/tree-node";
import {openTreeNode, closeTreeNode, initTreeNode} from "../reducer/tree";

const source = DragSource(
    'tree-node',
    {
        beginDrag: (props, monitor, component) => ({id: props.id}),
        endDrag: (props, monitor) => {
            props.onMove(monitor.getDropResult());
        }
    },
    (connect, monitor) => ({
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
);

const addChildTarget = DropTarget(
    'tree-node',
    {
        drop: (props, monitor) => ({
            dropEffect: "into",
            sourceId: monitor.getItem().id,
            targetId: props.id
        }),
        canDrop: (props, monitor) => {
            //TODO:  Prevent adding a node to a descendent
            return true;
        }
    },
    (connect, monitor) => ({
        addChildDropTarget: connect.dropTarget(),
        isOverAddChild: monitor.isOver()
    })
);

const addAfterTarget = DropTarget(
    'tree-node',
    {
        drop: (props, monitor) => ({
            dropEffect: "after",
            sourceId: monitor.getItem().id,
            targetId: props.id
        }),
        canDrop: (props, monitor) => {
            //TODO:  Prevent adding a node to a descendent
            return true;
        }
    },
    (connect, monitor) => ({
        addAfterDropTarget: connect.dropTarget(),
        isOverAddAfter: monitor.isOver()
    })
);

//Generic tree node component
const treeNodeContainer = connectWithLifecycle(
    (state, props) => o(props.parentNodeId + "/" + props.id).as(nodeId => ({
        ...props,
        nodeId,
        obj: props.getObject(state, props.id),
        children: props.getChildren(state, props.id).sort(props.sorter),
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

export default source(addChildTarget(addAfterTarget(treeNodeContainer)));
