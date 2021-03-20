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
            <div className="panel-body ">
                <div
                    className="background-image"
                    style={{
                        backgroundImage: `url(icd_images/${results?.disease_icon}.png)`,
                    }}
                ></div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-xs-2">
                                <img
                                    className="thumbnail col-xs-12 icd-icon"
                                    src={`icd_images/${results.disease_icon}.png`}
                                ></img>
                            </div>

                            <div className="col-xs-10"></div>
                            <h4>Disease</h4>
                            <h3>
                                <b>{results.disease}</b>
                            </h3>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <h4>ICD-10 code</h4>
                        <p>{results.icd}</p>
                    </li>
                    <li className="list-group-item">
                        <h4>Affects</h4>
                        <div className="row">
                            {results.iconlist.map((iconName: string) => (
                                <div className="col-xs-3 col-md-2">
                                    <img
                                        className="thumbnail col-xs-12"
                                        src={`images/${iconName}.png`}
                                    ></img>
                                </div>
                            ))}
                        </div>
                    </li>

                    {results.definition && (
                        <li className="list-group-item text-justify">
                            <h4>Definition</h4>
                            <p className="definition">{results.definition}</p>
                        </li>
                    )}
                    {results.causes && (
                        <li className="list-group-item text-justify">
                            <h4>Causes</h4>
                            <p>{results.causes}</p>
                        </li>
                    )}
                    {results.duration && (
                        <li className="list-group-item text-justify">
                            <h4>Duration</h4>
                            <p>{results.duration}</p>
                        </li>
                    )}
                    {results.frequency && (
                        <li className="list-group-item text-justify">
                            <h4>Frequency</h4>
                            <p>{results.frequency}</p>
                        </li>
                    )}
                    {results.prevention && (
                        <li className="list-group-item text-justify">
                            <h4>Prevention</h4>
                            <p>{results.prevention}</p>
                        </li>
                    )}
                    {results.prognosis && (
                        <li className="list-group-item text-justify">
                            <h4>Prognosis</h4>
                            <p>{results.prognosis}</p>
                        </li>
                    )}
                    {results.risks && (
                        <li className="list-group-item text-justify">
                            <h4>Risks</h4>
                            <p>{results.risks}</p>
                        </li>
                    )}
                    {results.syptoms && (
                        <li className="list-group-item text-justify">
                            <h4>Syptoms</h4>
                            <p>{results.syptoms}</p>
                        </li>
                    )}
                    {results.treatment && (
                        <li className="list-group-item text-justify">
                            <h4>Treatment</h4>
                            <p>{results.treatment}</p>
                        </li>
                    )}
                </ul>
            </div>
        </div>
        {/* <p>
            Yep, it's debug, and we forgot it here.
            <br />
            {JSON.stringify(Object.keys(results), null, 1)}
        </p> */}
    </div>
);
