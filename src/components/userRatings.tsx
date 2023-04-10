import Link from 'next/link';
import React from 'react';
import ReactStars from 'react-stars';

export function Rating({ onChange }: any) {
  return (
    <>
      <div>
        <ReactStars count={5} size={48} color2={'#ffd700'} onChange={
          (new_rating) => {
            onChange(new_rating)
          }
        } />
      </div>
    </>
  );
}
