import * as React from "react";

interface Props {
    onResults: (results: {}) => void;
}

export default class UploadImage extends React.Component<Props> {
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
        <input type="file" accept="image/*" onChange={this.onChange}></input>
    );
}
