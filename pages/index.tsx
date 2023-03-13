/* eslint-disable react/jsx-key */
import Layout from '../components /Layout';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Key, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Card, CardBody, CardHeader, Container, Heading } from '@chakra-ui/react'

type Post = {
  title: string;
  content: string;
}

const BlogHome = () => {
  const [post, setPost] = useState<Post[]>([])
  const {
    isLoading, data
  } = useQuery({
    queryKey: 'blog-posts',
    queryFn: () => axios.get('/api/post'),
    onSuccess: (data) => { console.log(data); }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Container>
        <div>
          <Heading mt={3} textAlign={'center'}>Blog Post</Heading>
        </div>
        <div>
          <div>
            {data?.data.map((post: any) => {
              return (
                <Card p={3} mt={4}>
                  <CardHeader>
                    <strong>{post.title}</strong>
                  </CardHeader>
                  <hr />
                  <CardBody noOfLines={2}>{post.content}</CardBody>
                  <Button mt={3} float={'right'} w={'30%'} bg={'none'}>
                    Read More
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default BlogHome;
