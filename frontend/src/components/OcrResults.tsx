import * as React from "react";
import "./OcrResults.css";

interface Props {
    ocrResults: any;
    onResults: (results: {}) => void;
}

interface State {
    selected: number[];
    loading: boolean;
}

export default class OcrResults extends React.Component<Props, State> {
    state = {
        selected: [this.props.ocrResults.guess],
        loading: false,
    };

    onClick = (index: number) => {
        if (this.state.selected.includes(index)) {
            this.setState({
                selected: this.state.selected.filter((n) => n != index),
            });
        } else {
            this.setState({
                selected: [...this.state.selected, index],
            });
        }
    };

    onSubmit = async () => {
        const data = new FormData();
        let icd = "";

        let i = 0;
        this.props.ocrResults.data.regions.forEach((region: any) =>
            region.lines.forEach((line: any) =>
                line.words.forEach(
                    ({ text }: { boundingBox: string; text: string }) => {
                        const index = i++;
                        icd += text;
                    },
                ),
            ),
        );

        data.append("text", icd);

        await new Promise((r) =>
            this.setState({ loading: true }, () => r(undefined)),
        );

        const results = await (
            await fetch("api/enter-icd", {
                method: "POST",
                body: data,
            })
        ).json();

        this.props.onResults(results);
    };

    render = () => {
        let i = 0;
        return (
            <div className="OcrResults container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">📄 Upload Image</h3>
                    </div>
                    <div className="panel-body">
                        {!this.state.loading ? (
                            <div className="row">
                                <div className="container">
                                    <button
                                        className="btn"
                                        type="button"
                                        onClick={this.onSubmit}
                                        disabled={!this.state.selected.length}
                                    >
                                        ☑️ Submit
                                    </button>
                                    <div className="frame">
                                        <img
                                            className="background"
                                            src={this.props.ocrResults.data_uri}
                                        />
                                        {this.props.ocrResults.data.regions.map(
                                            (region: any) =>
                                                region.lines.map((line: any) =>
                                                    line.words.map(
                                                        ({
                                                            boundingBox,
                                                            text,
                                                        }: {
                                                            boundingBox: string;
                                                            text: string;
                                                        }) => {
                                                            console.log(
                                                                boundingBox,
                                                            );
                                                            const [
                                                                x,
                                                                y,
                                                                w,
                                                                h,
                                                            ] = boundingBox
                                                                .split(",")
                                                                .map(Number);
                                                            const index = i++;

                                                            return (
                                                                <div
                                                                    onClick={() =>
                                                                        this.onClick(
                                                                            index,
                                                                        )
                                                                    }
                                                                    className={`rectangle${
                                                                        this.state.selected.includes(
                                                                            index,
                                                                        )
                                                                            ? " active"
                                                                            : ""
                                                                    }`}
                                                                    style={{
                                                                        top:
                                                                            y -
                                                                            2,
                                                                        left:
                                                                            x -
                                                                            2,
                                                                        width:
                                                                            w +
                                                                            4,
                                                                        height:
                                                                            h +
                                                                            4,
                                                                    }}
                                                                ></div>
                                                            );
                                                        },
                                                    ),
                                                ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <img className="spinner" src="images/load.gif" />
                        )}
                    </div>
                </div>
            </div>
        );
    };
}
