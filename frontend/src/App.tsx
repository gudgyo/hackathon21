import React from "react";
import "./App.css";
import { ShowApi } from "./ShowApi";
import UploadImage from "./components/UploadImage";

interface Props {}

class State {
    step: number = 0;
}

export default class App extends React.Component<Props, State> {
    state = new State();

    render = () => (
        <div>
            {(() => {
                switch (this.state.step) {
                    case 0:
                        return <UploadImage />;
                }
            })()}
        </div>
    );
}
