
import {o} from "atp-sugar";
import {connect} from "react-redux";
import TreeNode from "../component/tree-node";
import {getTreeNode, openTreeNode, closeTreeNode} from "../reducer/tree";

export default connect(
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
    }))
)(TreeNode);
