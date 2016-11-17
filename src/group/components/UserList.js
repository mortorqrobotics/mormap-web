import React from "react";
import Radium from "radium";

import Grid from "react-bootstrap/lib/Grid";
import UserLabel from "./UserLabel";
import styles from "~/shared/styles/userList";
import { connect } from "react-redux"

@Radium
class UserList extends React.Component {

    render() {
        return (
            <Grid fluid={true}>
                <div style={styles.memberList}>
                    {this.props.users.map(user => (
                        <UserLabel
                            user={user}
                            key={user._id}
                        />
                    ))}
                </div>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(UserList);
