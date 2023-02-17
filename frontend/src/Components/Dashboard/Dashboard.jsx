import { Box, Grid, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    let toast = useToast()
    let [maps, setMaps] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    let navigate = useNavigate()
    let isToken = localStorage.getItem("token")
    let handleNavigation = (url) => {
        navigate("/map", { state: url })
    }
    let getMaps = () => {
        fetch("https://grumpy-clam-nightgown.cyclic.app/dashboard/getMaps", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => res.json())
            .then((res) => {
                console.log(res?.msg[0]?.maps)
                setMaps(res?.msg[0]?.maps)

            }).catch((e) => console.log(e))
    }
    useEffect(() => {
        getMaps()
    }, [])

    useEffect(() => {
        if (!isToken) {

            onOpen()
        }
    })

    return (
        <Box m="auto" >
            <Box m="auto" p={5}   >
                <Grid templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} gap={6} m="auto">
                    {maps.map((el, index) => (
                        <Box key={index} h={"40vh"} w={{ sm: '30vw', md: '25vw', lg: '15vw' }} cursor="pointer" onClick={() => handleNavigation(el.url)} boxShadow={"md"} borderRadius={10}>

                            <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false} style={{ width: "100%", height: "100%", zIndex: -1 }} >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url={el.url}
                                />
                            </MapContainer>
                        </Box>
                    ))}

                </Grid>

            </Box>
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

export default Dashboard