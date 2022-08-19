import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = () => {
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      { categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-3 last:pb-0 mb-3 last:mb-0 hover:text-pink-600">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;