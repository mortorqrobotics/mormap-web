import React from "react";
import ReactDOM from "react-dom";
import { StyleRoot } from "radium";

const styles = {
    global: {
        margin: "0",
        padding: "0",
        fontFamily: "'exo 2', sans-serif",
        fontWeight: "200",
        outline: "0",
    },
    alignDiv1: {
        display: "table",
        width: "100%",
        height: "100vh",
    },
    alignDiv2: {
        verticalAlign: "middle",
        display: "table-cell",
    },
}


export default class Root extends React.Component {

    static propTypes = {
        verticalAlignMiddle: React.PropTypes.bool,
    }

    render() {
        return (
            <StyleRoot style={styles.global}>
                {(() => {
                    if (this.props.verticalAlignMiddle) {
                        return (
                            <div style={styles.alignDiv1}>
                                <div style={styles.alignDiv2}>
                                    {this.props.children}
                                </div>
                            </div>
                        )
                    } else {
                        return this.props.children
                    }
                })()}
            </StyleRoot>
        )
    }

}

export function pageInit(Page) {
    window.__pageInit = {
        React: React,
        ReactDOM: ReactDOM,
        Page: Page
    }
}