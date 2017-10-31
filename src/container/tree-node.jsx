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
            const result = monitor.getDropResult();
            if(result) {
                props.onMove(result);
            }
        }
    },
    (connect, monitor) => ({
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
);

const dropTarget = (action, name) => DropTarget(
    'tree-node',
    {
        drop: (props, monitor) => ({
            dropEffect: action,
            sourceId: monitor.getItem().id,
            targetId: props.id
        }),
        canDrop: (props, monitor) => {
            const sourceId = monitor.getItem().id;
            const restrictedNodes = (props.parents || []).concat(props.id);
            const canDrop = !restrictedNodes.includes(sourceId);
            return canDrop;
        }
    },
    (connect, monitor) => ({
        [name + 'DropTarget']: connect.dropTarget(),
        [name + 'CanDrop']: monitor.canDrop(),
        [name + 'IsOver']: monitor.isOver(),

    })
);

const addChildTarget = dropTarget('into', 'addChild');
const addAfterTarget = dropTarget('after', 'addAfter');

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

export default source(addChildTarget(addAfterTarget(treeNodeContainer)));
