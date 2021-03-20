import * as React from "react";

export default class UploadImage extends React.Component {
    onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const data = new FormData();
            data.append("image", e.target.files[0]);

            await fetch("api/upload-image", {
                method: "POST",
                body: data,
            });

            e.target.value = "";
        }
    };

    render = () => (
        <input type="file" accept="image/*" onChange={this.onChange}></input>
    );
}
