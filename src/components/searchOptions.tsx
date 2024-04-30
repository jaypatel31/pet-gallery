import React from 'react';
import styled from 'styled-components';

interface SortOptionsProps {
  sortBy: 'asc' | 'desc' | null;
  onSortChange: (sortBy: 'asc' | 'desc' | null) => void;
}

const SortSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
`;

const SortOptions: React.FC<SortOptionsProps> = ({ sortBy, onSortChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = event.target.value as 'asc' | 'desc' | '';
    onSortChange(selectedSortBy || null); // Reset to null if default option is selected
  };

  return (
    <SortSelect value={sortBy || ''} onChange={handleSortChange}>
      <option value="">Sort by Name...</option>
      <option value="asc">Sort by Name A-Z</option>
      <option value="desc">Sort by Name Z-A</option>
    </SortSelect>
  );
};

export default SortOptions;
