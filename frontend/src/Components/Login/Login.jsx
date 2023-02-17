import { Box, Button, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon } from "@chakra-ui/icons"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom'
function Login() {

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)



    let navigate = useNavigate()
    let toast = useToast()

    let handleForm = () => {
        let payload = { email, password }
        if (email && password) {

            axios.post(`https://grumpy-clam-nightgown.cyclic.app/user/login`, payload).then((res) => {

                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
                window.location.reload()
                toast({
                    description: res.data.msg,
                    status: res.data.token === undefined ? "error" : "success",
                    isClosable: true,
                    duration: 9000,
                    position: "top 50px"
                })

            }).catch((er) => {
                console.log(er)
                toast({
                    description: "User not found",
                    status: "error",
                    isClosable: true,
                    duration: 9000,
                    position: "top"
                })
            })
        } else {
            toast({
                description: "all fields required",
                status: "error",
                isClosable: true,
                duration: 9000,
                position: "top"
            })
        }
    }
    return (

        <Box shadow={"lg"} w="fit-content" p={"3%"} m="auto" mt={"20vh"} borderRadius={10} display={"flex"} flexDir="column" alignItems="center" justifyContent={"center"} gap={5}>
            Login

            <InputGroup size='md'>
                <Input placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        <ViewIcon />
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Button onClick={handleForm}>
                submit
            </Button>
            <Box>
                If You don't have already Signup
            </Box>
            <Box color={"blue"}>

                <Link to={"/signup"} >
                    SignUp
                </Link>
            </Box>
        </Box>

    )
}

export default Login