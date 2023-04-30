import Link from 'next/link';
import React, { useState } from 'react';
import ReactStars from 'react-stars';

export function Rating({ onChange, initialValue }: any) {

  const [ratingValue, setRatingValue] = useState(initialValue)


  return (
    <>
      <div>
        <ReactStars half={false} count={5} size={48} color2={'#ffd700'} value={ratingValue} onChange={
          (new_rating) => {
            setRatingValue(new_rating)
            onChange(new_rating)
          }
        } />
      </div>
    </>
  );
}
