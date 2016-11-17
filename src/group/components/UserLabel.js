import React from "react";
import Radium from "radium";

import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { fullName, currentUser } from "~/util";
import ProfilePicture from "~/shared/components/ProfilePicture";
import styles from "~/shared/styles/userList";
import { connect } from "react-redux";
import { deleteUser } from "~/group/actions";

const RadiumGlyphicon = Radium(Glyphicon);

@Radium
class UserLabel extends React.Component {

    static propTypes = {
        user: React.PropTypes.object,
    }

    handleUserClick = () => {
        window.location.assign("/profiles/id/" + this.props.user._id);
    }

    renderDeleteButton = () => {
        if (currentUser.isAdmin()) {
            return (
                <RadiumGlyphicon
                    glyph="trash"
                    style={styles.userDisplay.glyph}
                    onClick={this.handleDeleted}
                />
            )
        }
    }

    handleDeleted = (event) => {
        event.stopPropagation();
        this.props.dispatch(deleteUser(this.props.user._id))
    }

    render() {
        return (
            <Col sm={6} md={4} lg={3}>
                <span style={styles.userDisplay.span} onClick={this.handleUserClick}>
                    <ProfilePicture
                        user={this.props.user}
                        picSize="small"
                        frameSize={30}
                        hasIndicator
                    />
                    <span style={styles.userDisplay.name}>
                        {fullName(this.props.user)}
                    </span>
                    {this.renderDeleteButton()}
                </span>
            </Col>
        )
    }
}

export default connect()(UserLabel)
