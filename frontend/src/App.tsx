import React from "react";
import "./App.css";
import { ShowApi } from "./ShowApi";
import UploadImage from "./components/UploadImage";
import Results from "./components/Results";

interface Props {}

class State {
    step: number = 0;
    results: {} | null = null;
}

export default class App extends React.Component<Props, State> {
    state = new State();

    onResults = (results: {}) => this.setState({ step: 1, results });

    render = () => (
        <div>
            {(() => {
                switch (this.state.step) {
                    case 0:
                        return <UploadImage onResults={this.onResults} />;
                    case 1:
                        if (this.state.results) {
                            return <Results results={this.state.results} />;
                        }
                }
            })()}
        </div>
    );
}
