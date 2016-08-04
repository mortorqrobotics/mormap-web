import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/styles/navbar";

@Radium
export default class SearchDropItem extends React.Component {

    static propTypes = {
        userid: React.PropTypes.string,
        name: React.PropTypes.string,
        profpicpath: React.PropTypes.string,
    }

    onClick = () => {
        window.location.assign("/profiles/id/" + this.props.userid);
    }

    render() {
        return (
            <li onClick={this.onClick} style={styles.searchDropItem.li}>
        	    <img 
        	        style={styles.searchDropItem.img}
        	        src={this.props.profpicpath}
        	    />
        	    <span style={styles.searchDropItem.span}>{this.props.name}</span>
        	</li>
        )
    }
}