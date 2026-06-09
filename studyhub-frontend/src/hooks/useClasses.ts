import { useState, useEffect, useMemo } from 'react';
import { MOCK_CLASSES } from '../constants/mockData';
import { ClassFilterParams } from '../types/filter';
import { ClassDto } from '../types/class';

export const useClasses = (filters: ClassFilterParams) => {
  const [data, setData] = useState<ClassDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Tạm thời mô phỏng việc gọi API
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = [...MOCK_CLASSES];

      // 1. Filter by keyword
      if (filters.keyword) {
        const lowerKeyword = filters.keyword.toLowerCase();
        filtered = filtered.filter(cls => 
          cls.title.toLowerCase().includes(lowerKeyword) || 
          cls.tutorName.toLowerCase().includes(lowerKeyword) ||
          (cls.description || '').toLowerCase().includes(lowerKeyword)
        );
      }

      // 2. Filter by maxPrice
      filtered = filtered.filter(cls => {
        // Chuyển đổi "350.000đ" -> 350000
        const priceNumber = parseInt(cls.price.replace(/\D/g, ''), 10);
        return priceNumber <= filters.maxPrice;
      });

      // 2.5 Filter by location
      if (filters.location) {
        // In real backend, these will be matched with City/District/Commune IDs. Here we simulate for mock data.
        const locMap: Record<string, string> = { 
          thach_hoa: 'thạch hòa', 
          tan_xa: 'tân xã', 
          binh_yen: 'bình yên',
          ha_bang: 'hạ bằng',
          dong_truc: 'đồng trúc',
          tien_xuan: 'tiến xuân'
        };
        const matchString = locMap[filters.location] || filters.location;
        filtered = filtered.filter(cls => 
          cls.location.toLowerCase().includes(matchString.toLowerCase()) || 
          cls.locationType === 'computer' || cls.locationType === 'videocam' // Online classes fit any location
        );
      }

      // 3. Filter by learningMode ('Online', 'Offline', 'All')
      if (filters.learningMode !== 'All') {
        filtered = filtered.filter(cls => {
          const isOnline = cls.locationType === 'computer' || cls.locationType === 'videocam';
          if (filters.learningMode === 'Online') return isOnline;
          if (filters.learningMode === 'Offline') return !isOnline;
          return true;
        });
      }

      // 4. Filter by subjects
      if (filters.subjects.length > 0) {
        filtered = filtered.filter(cls => {
          // Kiểm tra xem title hoặc description có chứa môn học nào không
          return filters.subjects.some(subject => 
            cls.title.toLowerCase().includes(subject.toLowerCase()) ||
            (cls.description || '').toLowerCase().includes(subject.toLowerCase())
          );
        });
      }

      // 5. Sort
      if (filters.sortBy === 'price_asc') {
        filtered.sort((a, b) => parseInt(a.price.replace(/\D/g, ''), 10) - parseInt(b.price.replace(/\D/g, ''), 10));
      } else if (filters.sortBy === 'price_desc') {
        filtered.sort((a, b) => parseInt(b.price.replace(/\D/g, ''), 10) - parseInt(a.price.replace(/\D/g, ''), 10));
      } else if (filters.sortBy === 'rating') {
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      }

      setData(filtered);
      setIsLoading(false);
    }, 300); // Giả lập độ trễ mạng 300ms

    return () => clearTimeout(timer);
  }, [filters]);

  return { data, isLoading };
};
