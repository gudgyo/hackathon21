import * as React from "react";
import "./OcrResults.css";

interface Props {
    ocrResults: any;
}

interface State {
    selected: number[];
}

export default class OcrResults extends React.Component<Props, State> {
    state = {
        selected: [this.props.ocrResults.guess],
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

    render = () => {
        let i = 0;
        return (
            <div className="OcrResults container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">📄 Upload Image</h3>
                    </div>
                    <div className="panel-body">
                        {JSON.stringify(this.props.ocrResults)}
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
                                                console.log(boundingBox);
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
                                                            this.onClick(index)
                                                        }
                                                        className={`rectangle${
                                                            this.state.selected.includes(
                                                                index,
                                                            )
                                                                ? " active"
                                                                : ""
                                                        }`}
                                                        style={{
                                                            top: y,
                                                            left: x,
                                                            width: w,
                                                            height: h,
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
            </div>
        );
    };
}
