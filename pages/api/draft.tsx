/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Router from "next/router";
import prisma from "../../prisma/client";
import Layout from '@/components /Layout';

type Props = {
  drafts: PostProps[];
}

export type PostProps = {
  id: number;
  title: string;
  author: { name: string, email: string } | null;
  content: string;
  published: boolean;
  createdAt: Date;
  src: string | null | undefined;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session?.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

interface BlogAuthorProps {
  date: Date;
  name: string | null | undefined;
  src: string | null | undefined;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Avatar
        src={session?.user?.image}
        size="sm"
        name="Tennyson Ben-kalio"
        ml={-1}
        mr={2}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) {
    return <div>Loading ...</div>;
  }

  // SETTING COLOR
  const color = useColorModeValue("gray.50", "gray.800");
  const color2 = useColorModeValue("blue.50", "blue.900");
  const color3 = useColorModeValue("gray.700", "gray.200");

  if (!session) {
    return (
      <Layout>
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={color}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to see drafts <Link color={"blue.400"}></Link> ✌️
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={color2}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              {props.drafts.length !== 0 ? "My Drafts" : "No Drafts"}
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      {props.drafts.map((post) => (
        <Container
          key={post.id}
          maxW="container.xl"
          onClick={() => Router.push("/post/[id]", `/p/${post.id}`)}
        >
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <Heading marginTop="1">
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {post.title}
                </Link>
              </Heading>
              <Text as="p" marginTop="2" color={color3} fontSize="lg">
                {post.content}
              </Text>
              <BlogAuthor name={post?.author?.name} date={post.createdAt} src={undefined} />
            </Box>
          </Box>
          <Divider marginTop="5" />
        </Container>
      ))}
    </Layout>
  );
}