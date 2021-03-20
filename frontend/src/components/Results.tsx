import * as React from "react";
import "./Results.css";

interface Props {
    results: {};
}

export default ({ results }: Props) => (
    <div className="Results">
        <p>Results are:</p>
        <p>{results}</p>
    </div>
);
