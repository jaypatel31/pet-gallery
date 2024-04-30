import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPets, reset } from "../stateSlice/petSlice";
import { AppDispatch, RootState } from "../store";
import SearchBar from "../components/searchBar";
import GalleryView from "../components/galleryView";
import styled from "styled-components";
import SortOptions from "../components/searchOptions";


const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const FliterContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

interface ImageData {
    url: string;
    title: string;
    description: string;
    created: string;
  }

const Home = () => {
    const [petInfo, setPetInfo] = useState<ImageData[]>([])
    const [sortBy, setSortBy] = useState<'asc' | 'desc' | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [searchQuery, setSearchQuery] = useState<string>('');

    const {status, info, error} = useSelector((state: RootState) => state.pet);

    let dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(getPets())
    },[])

    useEffect(() => {
      if(info){
        setPetInfo(info)
        setLoading(false)
        // dispatch(reset())
      }
    }, [info])

    const handleSortChange = (sortBy: 'asc' | 'desc' | null) => {
        setSortBy(sortBy);
      };
    
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Filter images based on search query (e.g., by image name or tag)
        // For demonstration, filtering based on image name contains query
        const filteredImages = info && info.filter(image =>
            image.title.toLowerCase().includes(query.toLowerCase()) ||
            image.description.toLowerCase().includes(query.toLowerCase())
        );
        if(filteredImages) setPetInfo(filteredImages);
      };
    
      useEffect(() => {
        // Filter images based on search query
        // Sort filtered images based on current sort order
        const sorted = sortBy
          ? [...petInfo].sort((a, b) => {
              const nameA = a.title.toUpperCase();
              const nameB = b.title.toUpperCase();
              return sortBy === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            })
          : petInfo;
    
        // Update filteredImages state with sorted and filtered images
        setPetInfo(sorted);
      }, [sortBy]);

  return (
    <div>
      <h1>Pet Gallery</h1>
      <FliterContainer>
        <SearchBar onSearch={handleSearch} />
        <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
      </FliterContainer>
      <GalleryView images={petInfo} />
    </div>
  )
}

export default Home