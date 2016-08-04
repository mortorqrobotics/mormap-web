import React from "react";
import Radium from "radium";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import styles from "~/styles/navbar";

@Radium
export default class SearchBox extends React.Component {

    static propTypes = {
        path: React.PropTypes.string,
        glyph: React.PropTypes.string,
    }

    onClick = () => {
        window.location.assign(this.props.path);
    }

    render() {
        return (
            <li style={styles.glyphLink.li} onClick={this.onClick}>
                <Glyphicon style={styles.glyphLink.glyph} glyph={this.props.glyph} />
            </li>
        )
    }
}
