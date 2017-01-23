import React from "react";
import Radium, { Style } from "radium";

import { LeftbarContainer, LeftbarItem, LeftbarButton } from "~/shared/components/leftbar";
import { leftbarProps } from "~/util/leftbar";
import TextBox from "~/shared/components/forms/TextBox";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ComposeModal from "./ComposeModal";
import ChatItem from "./ChatItem";
import { modalProps } from "~/util/modal";
import { connect } from "react-redux";
import { setTab } from "~/chat/actions";
import { fullName, otherUser, makeChangeHandlerFactory, currentUser } from "~/util";
import styles from "~/chat/styles/leftbar";

@Radium
class Leftbar extends React.Component {

    state = {
        isComposeModalOpen: false,
        search: "",
        isLeftbarOpen: true,
    }

    getChangeHandler = makeChangeHandlerFactory(this)

    chatTitle = (chat) => {
        if (chat.isTwoPeople) {
            return fullName(otherUser(chat.audience.users, currentUser._id))
        } else {
            return chat.name
        }
    }

    getSearchedChats = () => {
        if (this.state.search.length === 0) {
            return this.props.chats
        } else {
            return this.props.chats.filter(chat => (
                this.chatTitle(chat)
                    .toLowerCase()
                    .indexOf(this.state.search.toLowerCase()) !== -1
            ))
        }
    }

    render() {
        return (
            <LeftbarContainer { ...leftbarProps(this, "isLeftbarOpen") } style={{width: "auto"}}>
                <LeftbarButton
                    style={styles.tab.right}
                    onClick={() => this.props.dispatch(setTab("intra"))}
                    isSelected={this.props.currentTab==="intra"}
                >
                   Your Team
                </LeftbarButton>
                <LeftbarButton
                    style={styles.tab.left}
                    onClick={() => this.props.dispatch(setTab("inter"))}
                    isSelected={this.props.currentTab==="inter"}
                >
                   Other Teams
                </LeftbarButton>

                <LeftbarButton
                    onClick={() => this.setState({ isComposeModalOpen: true })}
                >
                    <Glyphicon glyph="pencil" style={{ marginRight: "5px" }} />
                    Compose
                </LeftbarButton>
                <li style={styles.searchLi} className="searchBox">
                    <Style scopeSelector=".searchBox" rules={styles.searchPlaceholder} />
                    <TextBox
                        style={styles.searchBox}
                        placeholder="search chats"
                        value={this.state.search}
                        onChange={this.getChangeHandler("search")}
                    />
                </li>
                {this.getSearchedChats().map(chat => (
                    <ChatItem
                        key={chat._id}
                        chat={chat}
                        title={this.chatTitle(chat)}
                    />
                ))}
                <ComposeModal
                    { ...modalProps(this, "isComposeModalOpen") }
                />
            </LeftbarContainer>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        chats: state.chats,
        currentTab: state.currentTab,
    }
}

export default connect(mapStateToProps)(Leftbar);
