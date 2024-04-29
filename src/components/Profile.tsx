import { Box, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Comment from './Comment';
import ImageUpload from './ImageUpload';

interface ImageData {
  url: string;
  description: string;
}

interface CommentData {
  author: string;
  content: string;
}

interface ProfileProps {
  username: string;
  images: ImageData[];
  comments: CommentData[];
  onImageUpload: (file: File) => void;
}

const Profile = ({
  username,
  images,
  comments,
  onImageUpload,
}: ProfileProps) => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        {username}
      </Text>
      <ImageUpload onUpload={onImageUpload} />
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {images.map((image, index) => (
          <Box key={index} boxShadow="sm" p="5" rounded="md" bg="white">
            <Image src={image.url} alt={image.description} />
            <Text mt={2}>{image.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <VStack spacing={4} align="stretch" mt={5}>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            author={comment.author}
            content={comment.content}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Profile;
