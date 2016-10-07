import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/group/styles/index";
import Button from "~/shared/components/forms/Button";
import { currentUser, pageOptions } from "~/util";
import { connect } from "react-redux";
import { leaveGroup } from "~/group/actions";

@Radium
class LeaveGroupButton extends React.Component {

    handleClick = () => {
        this.props.dispatch(leaveGroup());
    }

    render() {
        return (
            <Button
                style={styles.leaveButton}
                value="Leave"
                onClick={this.handleClick}
            />
        )
    }
}

export default connect()(LeaveGroupButton);
