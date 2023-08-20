 









import {AtomLoader} from "react-loaders-kit"
import { useNavigate  } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Signup() {
  const navigate  = useNavigate ();
  const [loading, setLoading] = useState(false);

  const loaderProps = {
      loading,
      size: 100,
      duration: 1,
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
  // console.log(lesswidth)
  let [{ name, email, password }, setDetails] = useState({
    name: '',
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
      setLoading(true);
      let obj = { name, email, password };
      axios
        .post('http://localhost:4500/user/register', obj)
        .then((res) =>{
          console.log(res)
          setLoading(false);
          if(res.data==="user registered successfully"){
            alert("Signup successful")
            navigate("/login")
          }else if(res.data.msg==='user already registered please login'){
            alert(res.data.msg)
            navigate("/login")
          }else{
            alert("Something went wrong Plase try again later")
          }
        })
        .catch((err) =>{
          setLoading(false);
          console.log(err)});
    }
  }

  return (
    
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} w={{ base: 'full', md: 'lg' }} py={12} px={6} >
        <Stack align={'center'}>
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>Sign in to your account</Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box

          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={6}
          w={{ base: 'full', md: 'md' }}>
          <Stack spacing={4}  >


        {lesswidth ? <HStack justify={{ base: 'center', md: 'start' }}   >
              <a href='https://oauth-wedledger.onrender.com/auth/google'>
                <Button size={"xs"} fontSize="0.5em" colorScheme="red" leftIcon={<FaGoogle size="1em" />}>
                   Google
                </Button>
              </a>
              <a href='#'>
                <Button size={"xs"} fontSize="0.5em" colorScheme="facebook" leftIcon={<FaFacebook   />}>
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
                <AtomLoader {...loaderProps} />
              </div>
              )}

            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={handleChange} />
            </FormControl>
            <Checkbox>Remember me</Checkbox>
            <Text textAlign={{ base: 'center', md: 'end' }} color={'blue.400'}>
              Forgot password?
            </Text>
            <Button
              id="submit"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleChange}>
              Sign up
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
