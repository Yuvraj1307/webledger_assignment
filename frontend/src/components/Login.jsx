 import { useNavigate  } from 'react-router-dom';
 import axios from 'axios';
 import {AtomLoader,BrokenCirclesLoader,FillCircleLoader} from "react-loaders-kit"
  
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  HStack,
  Center
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function Login() {
  // const navigate  = useNavigate ();
  const [loading, setLoading] = useState(false);

  const loaderProps = {
      loading,
      size: 100,
      duration: 5,
      colors: ['#5e22f0', '#5e22f0']
  }
  let [width,setWinWidth]=useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  let lesswidth=width<270
  let [{ email, password }, setDetails] = useState({
     email: '',
    password: '',
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === 'submit') {
      setLoading(true)
      let obj = { email, password };
      console.log(obj)
      axios
        .post('http://localhost:4500/user/login', obj)
        .then((res) =>{
          console.log(res)
          setLoading(false)
          if(res.data.msg==="login success"){
            alert("Login successful")
            
            window.location.href=`http://localhost:3000?token=${res.data.token}&userID=${res.data.userID}&name=${res.data.name}`
            // navigate(`/?token=${res.data.token}&userID=${res.data.userID}&name=${res.data.name}`)
          }
        })
        .catch((err) =>{
          setLoading(false)
          console.log(err)});
    }
  }
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          {lesswidth ? <HStack justify={{ base: 'center', md: 'start' }}>
              <a href='https://oauth-wedledger.onrender.com/auth/google'><Button fontSize="0.5em" colorScheme="red" leftIcon={<FaGoogle size="1em" />}>
                Google
              </Button>
              </a>
              <a href='#'>
              <Button fontSize="0.5em" colorScheme="facebook" leftIcon={<FaFacebook   />}>
                Facebook
              </Button>
              </a>
            </HStack> :

          <Center>
            <HStack justify={{ base: 'center', md: 'start' }}>
              <a href='https://oauth-wedledger.onrender.com/auth/google'>
              <Button fontSize="0.7em" colorScheme="red" leftIcon={<FaGoogle size="1em" />}>
                Google
              </Button>
              </a>
              <a href='#'>
              <Button fontSize="0.7em" colorScheme="facebook" leftIcon={<FaFacebook   />}>
                Facebook
              </Button>
              </a>
            </HStack>
            </Center>
             }
              {loading &&
               (
               <div
                style={{
                  position: 'absolute',
                  zIndex: 9999, // Set a high z-index to make it appear above other content
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                <FillCircleLoader {...loaderProps} />
              </div>
              )}
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={handleChange} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button id="submit" colorScheme={'blue'} variant={'solid'} onClick={handleChange}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}