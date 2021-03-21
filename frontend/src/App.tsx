import React from "react";
import "./App.css";
import UploadImage from "./components/UploadImage";
import Results from "./components/Results";
import OcrResults from "./components/OcrResults";
import ErrorView from "./components/ErrorView";

interface Props {}

class State {
    step: number = 0;
    results: {} | null = null;
    ocrResults: {} | null = null;
    errorMessage: string | null = null;
}

export default class App extends React.Component<Props, State> {
    state = new State();

    onResults = (results: {}) => this.setState({ step: 2, results });

    onOcrResults = (ocrResults: {}) => this.setState({ step: 1, ocrResults });

    onError = (message?: string) =>
        this.setState({ errorMessage: message ?? "Error", step: -1 });

    render = () => (
        <div className="App container">
            <div className="row">
                <div className="column">
                    <div className="container">
                        <ul className="nav nav-pills">
                            <li>
                                <a
                                    className="navbar-brand"
                                    href="#"
                                    style={{ color: "black" }}
                                >
                                    🗣 doc2pat
                                </a>
                            </li>
                            <li role="presentation">
                                <a
                                    href="#"
                                    onClick={() => window.location.reload()}
                                >
                                    ↩️ Start over
                                </a>
                            </li>
                        </ul>
                    </div>
                    {(() => {
                        switch (this.state.step) {
                            case 0:
                                return (
                                    <UploadImage
                                        onResults={this.onResults}
                                        onOcrResults={this.onOcrResults}
                                        onError={this.onError}
                                    />
                                );
                            case 1:
                                return (
                                    <OcrResults
                                        ocrResults={this.state.ocrResults}
                                        onResults={this.onResults}
                                        onError={this.onError}
                                    />
                                );
                            case 2:
                                if (this.state.results) {
                                    return (
                                        <Results results={this.state.results} />
                                    );
                                }
                                break;
                            case -1:
                                if (this.state.errorMessage) {
                                    return (
                                        <ErrorView
                                            message={this.state.errorMessage}
                                        />
                                    );
                                }
                                break;
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}
