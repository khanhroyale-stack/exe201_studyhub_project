import { useState, useEffect } from 'react';
import { TutorFilterParams } from '../types/filter';
import { MOCK_TUTORS } from '../constants/mockData';

export const useTutors = (filters: TutorFilterParams) => {
  const [tutors, setTutors] = useState(MOCK_TUTORS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const debounce = setTimeout(() => {
      let filtered = [...MOCK_TUTORS];

      // 1. Filter by keyword
      if (filters.keyword) {
        const lowerKeyword = filters.keyword.toLowerCase();
        filtered = filtered.filter(tutor => 
          tutor.name.toLowerCase().includes(lowerKeyword) || 
          tutor.title.toLowerCase().includes(lowerKeyword) ||
          (tutor.description || '').toLowerCase().includes(lowerKeyword) ||
          tutor.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
        );
      }

      // 2. Filter by maxPrice
      filtered = filtered.filter(tutor => {
        const priceNumber = parseInt(tutor.price.replace(/\D/g, ''), 10);
        return priceNumber <= filters.maxPrice;
      });

      // 3. Filter by location
      if (filters.location) {
        const locMap: Record<string, string> = { 
          thach_hoa: 'thạch hòa', 
          tan_xa: 'tân xã', 
          binh_yen: 'bình yên',
          ha_bang: 'hạ bằng',
          dong_truc: 'đồng trúc',
          tien_xuan: 'tiến xuân'
        };
        const matchString = locMap[filters.location] || filters.location;
        filtered = filtered.filter(tutor => 
          (tutor.description || '').toLowerCase().includes(matchString.toLowerCase()) ||
          tutor.tags.some(tag => tag.toLowerCase().includes(matchString.toLowerCase()))
        );
      }

      // 4. Filter by learning mode
      if (filters.learningMode !== 'All') {
        const isOnlineFilter = filters.learningMode === 'Online';
        // MOCK_TUTORS hiện không có locationType cụ thể, nhưng có thể dựa vào description. 
        // Hoặc cho qua do data mock. Tạm thời filter theo tags có chữ online/offline
        filtered = filtered.filter(tutor => {
          if (isOnlineFilter) return true; // Giả sử ai cũng dạy online đc
          return true; 
        });
      }

      // 5. Filter by minRating
      if (filters.minRating > 0) {
        filtered = filtered.filter(tutor => parseFloat(tutor.rating) >= filters.minRating);
      }

      // 6. Filter by subjects
      if (filters.subjects.length > 0) {
        filtered = filtered.filter(tutor => {
          return filters.subjects.some(subject => 
            tutor.title.toLowerCase().includes(subject.toLowerCase()) ||
            (tutor.description || '').toLowerCase().includes(subject.toLowerCase()) ||
            tutor.tags.some(tag => tag.toLowerCase().includes(subject.toLowerCase()))
          );
        });
      }

      // 7. Sort
      if (filters.sortBy === 'price_asc') {
        filtered.sort((a, b) => parseInt(a.price.replace(/\D/g, ''), 10) - parseInt(b.price.replace(/\D/g, ''), 10));
      } else if (filters.sortBy === 'price_desc') {
        filtered.sort((a, b) => parseInt(b.price.replace(/\D/g, ''), 10) - parseInt(a.price.replace(/\D/g, ''), 10));
      } else if (filters.sortBy === 'rating') {
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      }

      setTutors(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [filters]);

  return { tutors, isLoading };
};
