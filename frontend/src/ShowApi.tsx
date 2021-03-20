import React from "react";

interface Props {}

interface State {
    content: string;
}

export class ShowApi extends React.Component<Props, State> {
    async componentDidMount() {
        this.setState({
            content: await (await fetch("/api/api-test")).json(),
        });
    }

    render = () => {
        return <p>{this?.state?.content}</p>;
    };
}
