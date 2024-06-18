import { useState, useEffect } from 'react';
import axios from 'axios';

interface ImageComponentProps {
  blobName: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ blobName }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        console.log('Fetching image from blob:', blobName);
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiKey = import.meta.env.VITE_API_KEY;

        if (!apiUrl || !apiKey) {
          throw new Error('API URL or API Key is missing in environment variables');
        }

        console.log('API URL:', apiUrl);
        console.log('API Key:', apiKey);

        const response = await axios.get(`${apiUrl}/api/GetImage`, {
          params: {
            blobName: `images/${blobName}`,
            code: apiKey
          },
          responseType: 'blob',
        });

        console.log('Image fetch response:', response);

        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
        setError('Error fetching image');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [blobName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {imageSrc ? <img src={imageSrc} alt="Fetched from Azure Blob Storage" /> : 'No image found'}
    </div>
  );
};

export default ImageComponent;
