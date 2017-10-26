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
        beginDrag: (props, monitor, component) => {
            console.log("Begin drag " + props.id);
            return {id: props.id};
        },
        endDrag: (props, monitor, component) => {
            console.log("Drop result " + JSON.stringify(monitor.getDropResult()));
            console.log("End drag");
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
        drop: (props, monitor, component) => {
            console.log("Dropped " + JSON.stringify(monitor.getItem()) + " onto " + props.id);
            return {dropEffect: "addChild", sourceId: monitor.getItem().id, targetId: props.id};
        },
        hover: (props, monitor, component) => {
            console.log("Hovering over item " + props.id);
        },
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
        drop: (props, monitor, component) => {
            console.log("Dropped " + JSON.stringify(monitor.getItem()) + " onto " + props.id);
            return {dropEffect: "addAfter", sourceId: monitor.getItem().id, targetId: props.id};
        },
        hover: (props, monitor, component) => {
            console.log("Hovering AFTER item " + props.id);
        },
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

const SourceNode = component => props => props.dragSource(component(props));
const TargetNode = component => props => props.dropTarget(component(props));

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
        onClose: id => () => dispatch(closeTreeNode(id))
    }))
)(TreeNode);

export default source(addChildTarget(addAfterTarget(treeNodeContainer)));
