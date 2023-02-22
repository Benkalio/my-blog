import { Avatar, Box, Button, Flex, HStack, IconButton, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ChatIcon,
  CopyIcon,
  LockIcon,
  MoonIcon,
  PlusSquareIcon,
  SunIcon,
  UnlockIcon,
} from '@chakra-ui/icons';


const Header = () => { 
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  
  //CHAKRA UI COLOR SETTINGS
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('gray.200', 'gray.900');
  
  if (isLoading) {
    return (<div>Loading page...</div>);
  }  

  return (
    <>
      <Box bg={color} px={8}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link passHref href="/">
              <Button
                size={'sm'}
                isActive={isActive('/')}
                leftIcon={<ChatIcon />}
                colorScheme="whatsapp"
                variant="solid"
              >
                Posts
              </Button>
            </Link>
            {session ? (
              <>
                <Link passHref href="/drafts">
                  <Button
                    size={'sm'}
                    isActive={isActive('/drafts')}
                    leftIcon={<CopyIcon />}
                    colorScheme="whatsapp"
                    variant="solid"
                  >
                    Drafts
                  </Button>
                </Link>
                <Link passHref href="/create">
                  <Button
                    size={'sm'}
                    isActive={isActive('/create')}
                    leftIcon={<PlusSquareIcon />}
                    colorScheme="whatsapp"
                    variant="outline"
                  >
                    New post
                  </Button>
                </Link>
              </>
            ) : null}
          </HStack>
          {session ? (
            <Flex alignItems={'center'}>
              <Button
                onClick={() => signOut()}
                leftIcon={<LockIcon />}
                display={{ base: 'none', md: 'inline-flex' }}
                size={'sm'}
                colorScheme="whatsapp"
                fontWeight={600}
                mr={4}
              >
                Logout
              </Button>
              <Avatar src={session.user?.image} size="sm" name="Tennyson Ben-kalio" />
              <IconButton
                ml={5}
                aria-label="toggle theme"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                variant="ghost"
                size="md"
                onClick={toggleColorMode}
              />
            </Flex>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}
            >
              <Link passHref href="/api/auth/signin">
                <Button
                  leftIcon={<UnlockIcon />}
                  display={{ base: 'none', md: 'inline-flex' }}
                  size={'sm'}
                  colorScheme="whatsapp"
                  fontWeight={600}
                >
                  Sign In
                </Button>
              </Link>
            </Stack>
          )}
        </Flex>
      </Box>
    </>
  );
}

export default Header;
