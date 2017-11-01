/**
 * Created by AWITTROCK on 7/17/2017.
 */

import React from "react";
import {Row, Col, Button} from "react-bootstrap";

import TreeNode from "../container/tree-node";

const DropTarget = ({isOver, canDrop}) =>
    <div
        style={{
            height: isOver ? "16px" : "4px",
            border: isOver ? "dashed 1px" + (!canDrop ? " #f00" : "") : "none"
        }}
    ></div>

export default props =>
    <li className={props.nodeId}>
        <Row
            className={props.isSelected(props.obj) ? " bg-info" : ""}
            style={Object.assign({}, props.isSelected(props.obj) ? {color: "#000"} : {})}
        >
            <Col xs={8}>
                <div style={{textIndent: "-18px", marginLeft: "18px"}}>
                    {props.children.length > 0 && props.node.open &&
                        <i className="fa fa-caret-down fa-fw fa-lg" onClick={props.onClose(props.nodeId)}></i>
                    }
                    {props.children.length > 0 && !props.node.open &&
                        <i className="fa fa-caret-right fa-fw fa-lg" onClick={props.onOpen(props.nodeId)}></i>
                    }
                    {props.children.length == 0 && <i className="fa fa-fw fa-lg"></i>}
                    {props.dragSource(props.addChildDropTarget(
                        <span
                            onClick={() => props.onClick(props.getId(props.obj))}
                            style={{marginLeft: "-4px"}}
                        >
                            {props.obj && props.getContent(props.obj)}
                        </span>
                    ))}
                    {props.addChildDropTarget(
                        <div style={{marginLeft: "20px", width: "100%"}}>
                            <DropTarget isOver={props.addChildIsOver} canDrop={props.addChildCanDrop}/>
                        </div>
                    )}
                </div>
            </Col>
            <Col xs={4} className="text-right">
                <Button
                    bsSize="xsmall"
                    bsStyle="success"
                    onClick={() => {
                        props.onAddChild(props.getId(props.obj));
                        props.onOpen(props.nodeId)();
                    }}
                >
                    <i className="fa fa-plus fa-fw"></i>
                </Button>
                <Button
                    bsSize="xsmall"
                    bsStyle="danger"
                    onClick={() => props.onDelete(props.getId(props.obj))}
                >
                    <i className="fa fa-times fa-fw"></i>
                </Button>
            </Col>
        </Row>
        <ul style={{
            paddingLeft: "20px",
            marginTop: "4px",
            listStyleType: "none",
            display: props.node.open ? "block" : "none",
        }}>
            {props.children && props.children.map(obj =>
                <TreeNode
                    {...props}
                    parentNodeId={props.nodeId}
                    parents={props.parents.concat(props.getId(props.obj))}
                    key={props.getId(obj)}
                    id={props.getId(obj)}
                />
            )}
        </ul>
        <Row>
            <Col xs={12}>
                <div style={{textIndent: "-18px", marginLeft: "18px"}}>
                    {props.addAfterDropTarget(
                        <div style={{width: "100%"}}>
                            <DropTarget isOver={props.addAfterIsOver} canDrop={props.addAfterCanDrop}/>
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    </li>;
