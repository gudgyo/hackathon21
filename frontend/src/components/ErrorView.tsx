import * as React from "react";
// import "./ErrorView.css"

interface Props {
    message: string;
}

export default ({ message }: Props) => (
    <div className="ErrorView container">
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">🌩 Error</h3>
            </div>
            <div className="alert alert-danger" role="alert">
                There was an error. You might want to{" "}
                <a href="#" onClick={() => window.location.reload()}>
                    start over.
                </a>
            </div>
            <div className="panel-body ">
                <pre>{message}</pre>
            </div>
        </div>
    </div>
);
