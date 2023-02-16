import { Box, Grid, Stat } from '@chakra-ui/react'
import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Navigate, useNavigate } from 'react-router-dom'

function Dashboard() {
    let position=[51.505, -0.09]
    let arr=[
        {url:"https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/basic-4326/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/dataviz/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/ocean/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/toner-v2/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        {url:"https://api.maptiler.com/maps/winter-v2/256/{z}/{x}/{y}.png?key=yFSLa0Hjgw8Nbb8rM6h3" },
        
        

    ]
    let navigate=useNavigate()
    let handleNavigation=(url)=>{
          navigate("/map",{state:url})
    }
  return (
   <Box m="auto">

            
            <Box m="auto" p={5}>
               
                <Grid templateColumns={{sm:'repeat(2, 1fr)',md:'repeat(3, 1fr)',lg:'repeat(5, 1fr)'}} gap={6} >
                   {arr.map((el,index)=>(
                    <Box h={"40vh"} w={"15vw"} onClick={()=>handleNavigation(el.url)}>

                  
                       <MapContainer center={[51.505, -0.09]} zoom={3}  scrollWheelZoom={true} style={{width:"100%",height:"100%"}}>
                       <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url={el.url}
                       />
                      
                  
                       </MapContainer>
                       </Box>
                 ))} 
                  
                </Grid>
         
            </Box>

   </Box>
  )
}

export default Dashboard