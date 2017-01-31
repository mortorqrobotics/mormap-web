import React from "react";
import Radium from "radium";

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "~/map/components/Leftbar";
import { currentUser } from "~/util";
import { setTeam } from "~/map/actions";

import { makeStore, soundsMiddleware } from "~/util/redux";
import reducers from "~/map/reducers";
import sharedReducers from "~/shared/reducers";
const store = makeStore({
    ...reducers,
    ...sharedReducers,
}, soundsMiddleware());
import { initSIO } from "~/util/sio";
import {
    initAlertCreator,
    initListeners as initSharedListeners,
} from "~/shared/sio";
initSIO(socket => initSharedListeners(socket, store.dispatch));
initSIO(socket => initAlertCreator(socket, store.dispatch));

const currentTeam = teamLocations[currentUser.team.number];
const mapOptions = {
    zoom: currentTeam ? 15 : 4,
    center: currentTeam ? {lat: currentTeam.lat, lng: currentTeam.lng}
        : {lat: 39.9583086, lng: -98.3331244}
}

@Radium
class Map extends React.Component {

    render() {
        return (
            <Root pageName="map" store={store}>
                <Navbar />
                <Leftbar />

                <GoogleMapLoader
                    containerElement= {
                        <div
                            style={{
                                height: "100%",
                            }}
                        />
                    }
                    googleMapElement = {
                        <GoogleMap
                            center={mapOptions.center}
                            zoom={mapOptions.zoom}
                        >
                            {Object.keys(teamLocations).map(teamNum => (
                                // yes they are switched
                                <Marker
                                    key={teamNum}
                                    position = {{
                                        lat: teamLocations[teamNum].lat,
                                        lng: teamLocations[teamNum].lng
                                    }}
                                    onClick={() => store.dispatch(setTeam(teamNum))}
                                />
                            ))}
                        </GoogleMap>
                    }
                />

            </Root>
        )
    }

}

pageInit(Map);
