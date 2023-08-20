import {
    Box,
    Flex,
    Avatar,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    IconButton,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import {
    MoonIcon,
    SunIcon,
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from "@chakra-ui/icons";
  import { Link, useLocation } from "react-router-dom";
  
   
  
  
  const NavLink = (props) => {
    const { children } = props;
  
    return (
      <Box
        as="a"
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={"#"}
      >
        {children}
      </Box>
    );
  };
  
    function Nav({setToken}) {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    let location=useLocation()
    function handleLogin(){
           sessionStorage.removeItem("token")
           sessionStorage.removeItem("userID")
           sessionStorage.removeItem("name")

           setToken(false)
           const { from } = location.state || { from: { pathname: '/' } };
           window.location.replace(from.pathname)
    }
    return (
      <>
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box><Link to="/">Logo</Link></Box>
  
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
  
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"} zIndex={"10"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={"https://avatars.dicebear.com/api/male/username.svg"}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{sessionStorage.getItem("name")}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem ><Link to="/myrecipie">My Recipes</Link></MenuItem>
                    <MenuItem><Link to="/findrecipies">Make Post</Link></MenuItem>
                    <MenuItem onClick={handleLogin}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
   function WithSubnavigation() {
      const { isOpen, onToggle } = useDisclosure()
    
      return (
        <Box>
          <Flex
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}>
            <Flex
              flex={{ base: 1, md: 'auto' }}
              ml={{ base: -2 }}
              display={{ base: 'flex', md: 'none' }}>
              <IconButton
                onClick={onToggle}
                icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
              />
            </Flex>
            <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}>
                  <Link to="/">Logo</Link>
                
              </Text>
    
              <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                <DesktopNav />
              </Flex>
            </Flex>
    
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}>
              <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                 _hover={{
                  bg: 'pink.300',
                }}>
  
              <Link to="/signup">Sign Up</Link>
                
              </Button>
            </Stack>
          </Flex>
    
          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Box>
      )
    }
    
    const DesktopNav = () => {
      const linkColor = useColorModeValue('gray.600', 'gray.200')
      const linkHoverColor = useColorModeValue('gray.800', 'white')
      const popoverContentBgColor = useColorModeValue('white', 'gray.800')
    
      return (
        <Stack direction={'row'} spacing={4}>
          {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
              <Popover trigger={'hover'} placement={'bottom-start'}>
                <PopoverTrigger>
                  <Box
                    as="a"
                    p={2}
                    href={navItem.href ?? '#'}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}>
                    {navItem.label}
                  </Box>
                </PopoverTrigger>
    
                {navItem.children && (
                  <PopoverContent
                    border={0}
                    boxShadow={'xl'}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={'xl'}
                    minW={'sm'}>
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </PopoverContent>
                )}
              </Popover>
            </Box>
          ))}
        </Stack>
      )
    }
    
    const DesktopSubNav = ({ label, href, subLabel }) => {
      return (
        <Box
          as="a"
          href={href}
          role={'group'}
          display={'block'}
          p={2}
          rounded={'md'}
          _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
          <Stack direction={'row'} align={'center'}>
            <Box>
              <Text
                transition={'all .3s ease'}
                _groupHover={{ color: 'pink.400' }}
                fontWeight={500}>
                {label}
              </Text>
              <Text fontSize={'sm'}>{subLabel}</Text>
            </Box>
            <Flex
              transition={'all .3s ease'}
              transform={'translateX(-10px)'}
              opacity={0}
              _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
              justify={'flex-end'}
              align={'center'}
              flex={1}>
              <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
            </Flex>
          </Stack>
        </Box>
      )
    }
    
    const MobileNav = () => {
      return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
          {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
          ))}
        </Stack>
      )
    }
    
    const MobileNavItem = ({ label, children, href }) => {
      const { isOpen, onToggle } = useDisclosure()
    
      return (
        <Stack spacing={4} onClick={children && onToggle}>
          <Box
            py={2}
            as="a"
            href={href ?? '#'}
            justifyContent="space-between"
            alignItems="center"
            _hover={{
              textDecoration: 'none',
            }}>
            <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
              {label}
            </Text>
            {children && (
              <Icon
                as={ChevronDownIcon}
                transition={'all .25s ease-in-out'}
                transform={isOpen ? 'rotate(180deg)' : ''}
                w={6}
                h={6}
              />
            )}
          </Box>
    
          <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
            <Stack
              mt={2}
              pl={4}
              borderLeft={1}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              align={'start'}>
              {children &&
                children.map((child) => (
                  <Box as="a" key={child.label} py={2} href={child.href}>
                    {child.label}
                  </Box>
                ))}
            </Stack>
          </Collapse>
        </Stack>
      )
    }
  
  
  
  
  
  
  
    
 
    
    const NAV_ITEMS= [
      {
        label: 'Inspiration',
        children: [
          {
            label: 'Explore Design Work',
            subLabel: 'Trending Design to inspire you',
            href: '#',
          },
          {
            label: 'New & Noteworthy',
            subLabel: 'Up-and-coming Designers',
            href: '#',
          },
        ],
      },
      {
        label: 'Find Work',
        children: [
          {
            label: 'Job Board',
            subLabel: 'Find your dream design job',
            href: '#',
          },
          {
            label: 'Freelance Projects',
            subLabel: 'An exclusive list for contract work',
            href: '#',
          },
        ],
      },
      {
        label: 'Learn Design',
        href: '#',
      },
      {
        label: 'Hire Designers',
        href: '#',
      },
    ]
      export {Nav,WithSubnavigation}