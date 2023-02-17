import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Box, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import L from "leaflet"
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

let NMTM_BASEURL = `https://nominatim.openstreetmap.org/search?q=17+Strada+Pictor+Alexandru+Romano%2C+Bukarest&format=geojson`
let icon = L.icon({
    iconUrl: "./Location-Icon.png",
    iconSize: [20, 25]
})

function Maps() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let location = useLocation()
    let isToken = localStorage.getItem("token")
    let toast = useToast()
    console.log(location)
    let [position, setPosition] = useState([21.0140475, 75.9114716])
    let getLatAndLong = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition([position.coords.latitude, position.coords.longitude])
        });
    }

    useEffect(() => {
        getLatAndLong()
        fetch(NMTM_BASEURL, {
            method: "GET",
            redirect: "follow"
        }).then((res) => res.json()).then((res) => console.log(res)).catch((er) => console.log(er))
        if (!isToken) {
            onOpen()
        }
    }, [])

    return (
        <Box h={"88vh"} w={"98vw"} p={2} m="auto">

            {isToken && <MapContainer center={position} zoom={location.state ? 3 : 2} scrollWheelZoom={true} style={{ width: "100%", height: "100%", zIndex: -1 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={location.state ? location.state : "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3"}
                />
                {location.state ? <Marker position={position} icon={icon}>
                </Marker> : ""}
            </MapContainer>}
            <>
                {/* when user not logged in */}

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody textAlign={"center"}>
                            User not logged in
                        </ModalBody>
                        <ModalFooter color={"blue"} m="auto">
                            <Link to={"/login"}>
                                Login
                            </Link>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </Box>
    )
}

export default Maps