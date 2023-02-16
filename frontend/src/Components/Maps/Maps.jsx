import React, { useEffect, useState } from 'react'
import {MapContainer,TileLayer,Marker,Popup,useMap, Circle, useMapEvent} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Box } from '@chakra-ui/react'
import L from "leaflet"
import { useLocation } from 'react-router-dom'

let NMTM_BASEURL=`https://nominatim.openstreetmap.org/search?q=17+Strada+Pictor+Alexandru+Romano%2C+Bukarest&format=geojson`
let icon=L.icon({
   iconUrl:"./Location-Icon.png",
   iconSize:[20,25]
})

function Maps() {
    let locationSelection;
    let location=useLocation()
    console.log(location)
    let [position,setPosition]=useState([21.0140475 ,75.9114716])
   let  getLatAndLong=()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
      locationSelection=[position.coords.latitude, position.coords.longitude]
        setPosition([position.coords.latitude, position.coords.longitude])
      });
   } 


    useEffect(()=>{
         getLatAndLong()
         fetch(NMTM_BASEURL,{
         method:"GET",
         redirect:"follow"
         }).then((res)=>res.json()).then((res)=>console.log(res)).catch((er)=>console.log(er))
        },[])
    return(
        <Box h={"100vh"} w={"100vw"}>

      <MapContainer center={position} zoom={13}  scrollWheelZoom={true} style={{width:"100%",height:"100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={location.state}
        />
        <Marker position={position} icon={icon}>
        </Marker>
        </MapContainer>
        </Box>
    )
}

export default Maps