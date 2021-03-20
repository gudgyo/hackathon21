import * as React from "react";
import "./UploadImage.css";

interface Props {
    onResults: (results: {}) => void;
    onOcrResults: (results: {}) => void;
}

class State {
    loading: boolean = false;
}

export default class UploadImage extends React.Component<Props, State> {
    state = new State();

    private input: HTMLInputElement | null = null;

    text: HTMLInputElement | null = null;

    onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const data = new FormData();
            data.append("image", e.target.files[0]);

            await new Promise((r) =>
                this.setState({ loading: true }, () => r(undefined)),
            );

            const results = await (
                await fetch("api/upload-image", {
                    method: "POST",
                    body: data,
                })
            ).json();

            e.target.value = "";

            this.props.onOcrResults(results);
        }
    };

    onSubmit = async (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();

        if (this.text?.value) {
            const data = new FormData();
            data.append("text", this.text.value);

            await new Promise((r) =>
                this.setState({ loading: true }, () => r(undefined)),
            );

            const results = await (
                await fetch("api/enter-icd", {
                    method: "POST",
                    body: data,
                })
            ).json();

            this.text && (this.text.value = "");

            this.props.onResults(results);
        }
    };

    render = () => (
        <div className="UploadImage container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">📄 Upload Image</h3>
                </div>
                <div className="panel-body">
                    {!this.state.loading ? (
                        <div className="container">
                            <h3 className="panel-title">💡 Info</h3>
                            <p>
                                Take a photo of your diagnosis. Make sure it
                                contains a so-called ICD-10 code (which looks
                                like a singe letter, then 2-6 numbers) (
                                <a
                                    href="https://www.verywellhealth.com/finding-icd-codes-2615311"
                                    target="_blank"
                                >
                                    link
                                </a>
                                ).
                            </p>

                            <form onSubmit={this.onSubmit}>
                                <label
                                    htmlFor="text"
                                    style={{ fontWeight: "normal" }}
                                >
                                    Or enter ICD-10 code manually:&nbsp;&nbsp;
                                </label>
                                <input
                                    name="text"
                                    ref={(e) => (this.text = e)}
                                ></input>
                                <button type="submit">➡️</button>
                            </form>

                            <img
                                className="img"
                                src="images/3460771.svg"
                                onClick={() => this.input?.click()}
                            />
                            <input
                                ref={(e) => (this.input = e)}
                                className="input"
                                type="file"
                                accept="image/*"
                                onChange={this.onChange}
                                capture="camera"
                            ></input>
                        </div>
                    ) : (
                        <img className="spinner" src="images/load.gif" />
                    )}
                </div>
            </div>
        </div>
    );
}
