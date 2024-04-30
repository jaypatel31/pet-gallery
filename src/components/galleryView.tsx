import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

interface ImageData {
  url: string;
  title: string;
  description: string;
  created: string;
}

interface GalleryViewProps {
  images: ImageData[];
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageCard = styled.div`
  position: relative;
  width: 200px;
  margin: 10px;
  border-radius: 8px;
  padding: 10px;
  cursor:pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  position: absolute;
  top: 12px;
  right: 12px;
  transform: scale(1.2);
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
`;

const CreatedAt = styled.p`
  font-size: 12px;
  color: #999;
`;

const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom:1rem;
  gap:1rem;
`;

const SelectAllLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
`;

const SelectAllCheckbox = styled.input`
  margin-right: 5px;
`;


const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const GalleryView: React.FC<GalleryViewProps> = ({ images }) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  
    const toggleImageSelection = (url: string) => {
      const isSelected = selectedImages.includes(url);
      if (isSelected) {
        setSelectedImages(selectedImages.filter(imageUrl => imageUrl !== url));
      } else {
        setSelectedImages([...selectedImages, url]);
      }
    };
  
    const handleSelectAllChange = () => {
      const allUrls = images.map(image => image.url);
      if (!selectAllChecked) {
        setSelectedImages(allUrls);
      } else {
        setSelectedImages([]);
      }
      setSelectAllChecked(!selectAllChecked);
    };
  
    const downloadSelectedImages = async () => {
        try {
          const promises = selectedImages.map(async imageUrl => {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `image_${Date.now()}.png`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
    
          await Promise.all(promises);
        } catch (error) {
          console.error('Error downloading images:', error);
        }
      };


      const handleCardClick = (url: string) => {
        toggleImageSelection(url); // Toggle checkbox selection on card click
      };
  
    return (
      <Container>
        <SelectAllContainer>
            <div>
                <SelectAllCheckbox
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
                id='select_all'
                />
                <SelectAllLabel htmlFor='select_all'>Select All</SelectAllLabel>
            </div>
            <DownloadButton onClick={downloadSelectedImages}>
                <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg"/>
            </DownloadButton>
        </SelectAllContainer>
        {/* <div>
          <button onClick={downloadSelectedImages}>Download Selected</button>
        </div> */}
        <GalleryContainer>
          {images.map((image, index) => (
            <ImageCard key={index} onClick={() => handleCardClick(image.url)}>
              <Checkbox
                type="checkbox"
                checked={selectedImages.includes(image.url)}
                onChange={() => toggleImageSelection(image.url)}
              />
              <Image src={image.url} alt={image.title} />
              <Title>{image.title}</Title>
              <Description>{image.description}</Description>
              <CreatedAt>Created at: {new Date(image.created).toDateString()}</CreatedAt>
            </ImageCard>
          ))}
        </GalleryContainer>
      </Container>
    );
  };

export default GalleryView;
