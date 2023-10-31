import React from 'react';
import Link from 'next/link';

export default function Page(): React.JSX.Element {
  return (
    <div>
      <h1>Blog Bulunamadı.</h1>
      <Link href='/blog'>Tüm Bloglar</Link>
    </div>
  );
}
