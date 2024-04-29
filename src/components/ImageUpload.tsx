import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) onUpload(file);
  };

  return (
    <Box>
      <Input type="file" onChange={handleFileChange} />
      <Button mt={2} colorScheme="blue" onClick={handleSubmit} disabled={!file}>
        Upload
      </Button>
    </Box>
  );
};

export default ImageUpload;
