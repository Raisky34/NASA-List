import React, { Component, PropTypes } from 'react'
/**
 * To specify parent of loader component necessary mark it with class 'loader-parent'
 */
export default class LoaderBox extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let  className = `loader-box ${this.props.className || ''}`;
        if(!this.props.visible){
            className = className + ' hide'
        }
        return (
            <div className={className}>
                <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            </div>)
    }
};

LoaderBox.propTypes = {
    visible: PropTypes.bool,
    className: PropTypes.string,
};

LoaderBox.defaultProps = {
    visible: false
};