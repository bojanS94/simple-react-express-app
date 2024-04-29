import { Box, Text } from '@chakra-ui/react';

interface CommentProps {
  author: string;
  content: string;
}

const Comment = ({ author, content }: CommentProps) => {
  return (
    <Box p={3} bg="gray.100" rounded="md" mb={2}>
      <Text fontWeight="bold">{author}</Text>
      <Text mt={1}>{content}</Text>
    </Box>
  );
};

export default Comment;
