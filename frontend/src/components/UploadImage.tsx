import * as React from "react";
import "./UploadImage.css";

interface Props {
    onResults: (results: {}) => void;
}

export default class UploadImage extends React.Component<Props> {
    private input: HTMLInputElement | null = null;

    onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const data = new FormData();
            data.append("image", e.target.files[0]);

            const results = await (
                await fetch("api/upload-image", {
                    method: "POST",
                    body: data,
                })
            ).json();

            e.target.value = "";

            this.props.onResults(results);
        }
    };

    render = () => (
        <div className="UploadImage container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Upload Image</h3>
                </div>
                <div className="panel-body">
                    <div className="container">
                        <h3 className="panel-title">💡 Info</h3>
                        <div>
                            Take a photo of your diagnosis. Make sure it
                            contains a so-called ICD-10 code (which looks like a
                            singe letter, then 2-5 numbers) (
                            <a
                                href="https://www.verywellhealth.com/finding-icd-codes-2615311"
                                target="_blank"
                            >
                                link
                            </a>
                            ).
                        </div>

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
                </div>
            </div>
        </div>
    );
}
