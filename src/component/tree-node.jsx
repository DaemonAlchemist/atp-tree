/**
 * Created by AWITTROCK on 7/17/2017.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";

import TreeNode from "../container/tree-node";

export default props =>
    <li className={props.nodeId}>
        <Row>
            <Col xs={8}>
                <div style={{textIndent: "-18px", marginLeft: "18px"}}>
                    {props.children.length > 0 && props.node.open &&
                        <i className="fa fa-caret-down fa-fw" onClick={props.onClose(props.nodeId)}></i>
                    }
                    {props.children.length > 0 && !props.node.open &&
                        <i className="fa fa-caret-right fa-fw" onClick={props.onOpen(props.nodeId)}></i>
                    }
                    {props.children.length == 0 && <i className="fa fa-fw"></i>}
                    <span onClick={props.onClick(props.getId(props.obj))}>
                        {props.obj && props.getContent(props.obj)}
                    </span>
                </div>
            </Col>
            <Col xs={4}>
                <span className="text-danger">
                    <i
                        className="fa fa-times fa-fw"
                        style={{float: "right"}}
                        onClick={props.onDelete(props.getId(props.obj))}
                    ></i>
                </span>
                <span className="text-success">
                    <i
                        className="fa fa-plus fa-fw"
                        style={{float: "right"}}
                        onClick={props.onAddChild(props.getId(props.obj))}
                    ></i>
                </span>
            </Col>
        </Row>
        <ul style={{
            paddingLeft: "8px",
            listStyleType: "none",
            display: props.node.open ? "block" : "none"
        }}>
            {props.children && props.children.map(obj =>
                <TreeNode
                    {...props}
                    parentNodeId={props.nodeId}
                    key={props.getId(obj)}
                    id={props.getId(obj)}
                />
            )}
        </ul>
    </li>;
