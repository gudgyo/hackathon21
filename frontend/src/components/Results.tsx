import * as React from "react";
import "./Results.css";

interface Props {
    results: any;
}

export default ({ results }: Props) => (
    <div className="Results container">
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">📈 Results</h3>
            </div>
            <div className="panel-body">
                <div className="container">
                <img src={`icd_images/${results?.disease_icon}.png`} />
                    <p>Results are:</p>
                    <p>{JSON.stringify(results)}</p>
                </div>
            </div>
        </div>
    </div>
);
