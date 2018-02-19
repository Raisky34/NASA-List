import React, { Component } from "react";
import { strings } from '../localization/Localization';

class NotFound extends Component {

    render() {
        return (
            <div className="login-box">
                <div className="login-logo">
                    <h1 className="my">{strings.notFound.header}</h1>
                    <h2><span className="label label-default"><a href="/">{strings.notFound.link.title}</a></span></h2>
                </div>
            </div>
        )
    }

}

export default NotFound
