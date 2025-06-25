'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

type PaginationProps = {
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    return `?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    router.push(createPageLink(page));
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          style={{
            fontWeight: page === currentPage ? 'bold' : 'normal',
            backgroundColor: page === currentPage ? '#ddd' : '#fff',
          }}
        >
          {page}
        </button>
      ))}
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </nav>
  );
};

export default Pagination;
