/**
 * Created by AWITTROCK on 7/17/2017.
 */

import React from "react";
import {Row, Col, Button} from "react-bootstrap";
import {Draggable, DropTarget, Active, Inactive, CanDrop, CannotDrop} from 'atp-dnd';

import TreeNode from "../container/tree-node";

const DropTargetDiv = ({style}) =>
    <div style={style || {}}>
        <Active>
            <CanDrop><div style={{height: "16px", border: "dashed 1px"}} /></CanDrop>
            <CannotDrop><div style={{height: "16px", border: "dashed 1px red"}} /></CannotDrop>
        </Active>
        <Inactive><div style={{height: "4px", border: "none"}} /></Inactive>
    </div>;


const DropTargetPlaceholder = ({isOver, canDrop}) =>
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
                    <Draggable
                        type={props.draggable || "tree-node"}
                        id={props.id}
                        style={{
                            marginLeft: "20px",
                            display: 'inline-block'
                        }}
                    >
                        <DropTarget
                            action="into"
                            accepts={props.accepts}
                            id={props.getId(props.obj)}
                            onReceiveDrop={props.onReceiveDrop}
                        >
                            <span
                                onClick={() => props.onClick(props.getId(props.obj))}
                                style={{marginLeft: "-4px"}}
                            >
                                {props.obj && props.getContent(props.obj)}
                            </span>
                        </DropTarget>
                    </Draggable>
                    <DropTarget
                        action="into"
                        accepts={props.accepts}
                        id={props.getId(props.obj)}
                        onReceiveDrop={props.onReceiveDrop}
                    >
                        <DropTargetDiv style={{marginLeft: "20px", width: "100%"}}/>
                    </DropTarget>
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
                <DropTarget
                    action="after"
                    accepts={props.accepts}
                    id={props.getId(props.obj)}
                    onReceiveDrop={props.onReceiveDrop}
                >
                    <DropTargetDiv style={{textIndent: "-18px", marginLeft: "18px", width: "calc(100% - 18px)"}}/>
                </DropTarget>
            </Col>
        </Row>
    </li>;
