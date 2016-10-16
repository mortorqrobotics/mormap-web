import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "./leftbar/Leftbar";
import Middle from "./middle/Middle";

import { makeStore } from "~/util/redux";
import soundsMiddleware from "redux-sounds";
import reducers from "~/chat/reducers";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
}, soundsMiddleware({
    chatMessageNotification: {
        urls: [
            "/audio/bling2.mp3",
            "/audio/bling2.ogg",
            "/audio/bling2.wav",
        ],
        volume: 0.2,
    },
}));
import { initialActions } from "~/chat/actions";
initialActions(store.dispatch);
import { initSIO } from "~/util/sio";
import { initListeners } from "~/chat/sio";
initSIO(socket => initListeners(socket, store.dispatch));
import { initListeners as initSharedListeners } from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));

$(window).focus(() => {
    window.__isFocused = true;
}).blur(() => {
    window.__isFocused = false;
});

@Radium
export default class Chat extends React.Component {

    render() {
        return (
            <Root pageName="chat" store={store}>
                <Navbar />
                <Leftbar />
                <Middle />
            </Root>
        )
    }

}

pageInit(Chat);
