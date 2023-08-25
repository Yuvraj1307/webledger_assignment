import {
    Input,
    Stack,
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    SpaceProps,
    useColorModeValue,
    Container,
    VStack,
    Popover,
    ButtonGroup,
    Button,
    Flex,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import SaveData from "../Functions/SaveData";
  import { useNavigate } from "react-router-dom";
  //   import Popovercoment from './Popupcomment'
  
  // interface IBlogTags {
  //   tags: Array<string>
  //   marginTop?: SpaceProps['marginTop']
  // }
  
  // interface Props {
  //   marginTop?: number
  //   tags: any[]
  // }
  
  const ArticlePreview = ({ width }) => {
    return (
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                src={
                  "https://th.bing.com/th/id/R.38ff37bd6c783b05aa6a63c8292d5388?rik=ClDdNqJ9KDUQZQ&riu=http%3a%2f%2fwww.taste.com.au%2fimages%2frecipes%2fdel%2f2007%2f05%2f16684.jpg&ehk=LynapizSPIyVrYHxAL5PUeViOjApswXwFPV7d%2b%2fK3Jg%3d&risl=1&pid=ImgRaw&r=0"
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(orange.600 1px, transparent 1px)",
                "radial(orange.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <BlogTags tags={["italian", "cuisine"]} />
          <Heading marginTop="1">
            <Text
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              fontSize={width <= 300 ? "70%" : "lg"}
            >
              One-pot Calabrian prawn risoni
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize={width <= 300 ? "70%" : "lg"}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} />
        </Box>
      </Box>
    );
  };
  
  const BlogTags = (props) => {
    const { marginTop = 0, tags } = props;
  
    return (
      <HStack spacing={2} marginTop={marginTop}>
        {tags.map((tag) => {
          return (
            <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
              {tag}
            </Tag>
          );
        })}
      </HStack>
    );
  };
  
  // interface BlogAuthorProps {
  //   date: Date
  //   name: string
  // }
  
  const BlogAuthor = (props) => {
    return (
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Image
          borderRadius="full"
          boxSize="40px"
          src="https://100k-faces.glitch.me/random-image"
          alt={`Avatar of ${props.name}`}
        />
        <Text fontWeight="medium">{props.name}</Text>
        <Text>—</Text>
        <Text>{props.date.toLocaleDateString()}</Text>
      </HStack>
    );
  };
  
  const Myrecipie = () => {
   let navigate=useNavigate()
    let [width, setWinWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => {
        setWinWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    let lesswidth = width < 270;
  
    // let [{name,data},setData]=useState({name:"",data:null})
    let [allrecipie, setAllRecipie] = useState(null);
    let [page, setPage] = useState(0);
  
    let [load, setLoad] = useState(false);
    useEffect(() => {
      var urlParams = new URLSearchParams(window.location.search);
      let token = urlParams.get("token");
      let userID = urlParams.get("userID");
      let name = urlParams.get("name");
      if (token && userID && name) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userID", userID);
        sessionStorage.setItem("name", name);
      }
      

      fetch(`https://webledgerassignment.onrender.com/recipie/my`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${sessionStorage.getItem("token")}`
        }
      })
      .then(res=>res.json())
      .then(data=>setAllRecipie(data.data))
      .catch(err=>console.log(err))
    //   axios
    //   .get(`http://localhost:4500/recipie/my`)
    //   .then((res) => {
    //     console.log(res.data)
    //     // setAllRecipie(res.data.results);
    //   })
    //   .catch((err) => console.log(err,"hgfjhfbhjchchcjfhcjcjcgc"));
    }, []);
   
    // async function handelPage(e) {
    //   if (e.target.id === "inc") {
    //     setPage((page) => page + 1);
    //   } else {
    //     if (page > 0) {
    //       setPage((page) => page - 1);
    //     }
    //   }
    //   axios
    //     .get(`http://localhost:4500/recipie/myrecipie`,{
    //         headers:{
    //             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //         }
    //     })
    //     .then((res) => {
    //       // console.log(res.data)
    //       setAllRecipie(res.data.results);
    //     })
    //     .catch((err) => console.log(err));
    // }
  function Unsave(el){
    fetch(`https://webledgerassignment.onrender.com/recipie/my/${el.id}`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res=>{res.ok && window.location.reload()})
     .catch(err=>console.log(err))
  }
    function Details(el) {
      console.log(el);
      navigate(`/details?id=${el}`);
  
    }
    return (
      <Container maxW={"7xl"} p="12">
        <Heading as="h1" fontSize={"100%"}>
          Taste the magic with our recipes{" "}
        </Heading>
        
  
        {lesswidth ? (
          <Stack
            marginTop={"6%"}
            marginLeft={"-30%"}
            spacing={3}
            h={"2em"}
            w={"160%"}
          >
            <Flex
              alignSelf={"center"}
              h="100%"
              w={"97%"}
              justifyContent={"space-evenly"}
            >
              <Input
                fontSize={"70%"}
                variant="flushed"
                placeholder="Looking for your taste?"
                h="100%"
                w={"80%"}
                alignSelf={"center"}
              />
              <Button
                fontSize={"70%"}
                isLoading={load}
                colorScheme="teal"
                variant="solid"
                w={"15%"}
                h="100%"
               >
                Email
              </Button>
            </Flex>
          </Stack>
        ) : (
          <Stack marginTop={"6%"} spacing={3}>
            <Flex alignSelf={"center"} w={"50%"} justifyContent={"space-evenly"}>
              <Input
                variant="flushed"
                placeholder="Looking for your taste?"
                w={"80%"}
                alignSelf={"center"}
              />
              <Button
                isLoading={load}
                colorScheme="teal"
                variant="solid"
                w={"15%"}
               >
                Email
              </Button>
            </Flex>
          </Stack>
        )}
         
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          {allrecipie &&
            allrecipie.map((el, i) => {
              return (
                <WrapItem
                  width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}
                >
                  <Box w="100%">
                    <Box borderRadius="lg" overflow="hidden">
                      <Box
                        textDecoration="none"
                        _hover={{ textDecoration: "none" }}
                      >
                        <Image
                          transform="scale(1.0)"
                          src={el.image}
                          alt="some text"
                          objectFit="contain"
                          width="100%"
                          transition="0.3s ease-in-out"
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                        />
                      </Box>
                    </Box>
                    <Heading fontSize="xl" marginTop="2">
                      <Text
                        textDecoration="none"
                        _hover={{ textDecoration: "none" }}
                      >
                        {el.title}
                      </Text>
                    </Heading>
                    <Text as="p" fontSize="md" marginTop="2">
                      {el.content}
                    </Text>
                    {sessionStorage.getItem("token") ? (
                      <ButtonGroup variant="outline" spacing="6">
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            Unsave(el);
                          }}
                        >
                          Unsave
                        </Button>
                        <Button
                          onClick={() => {
                            Details(el.recipi_id);
                          }}
                        >
                          Details
                        </Button>
                      </ButtonGroup>
                    ) : null}
                  </Box>
                </WrapItem>
              );
            })}
        </Wrap>
        
      </Container>
    );
  };
  
  export default Myrecipie;
  