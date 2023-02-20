'use client';

import Banner from '../components/Banner';
import Header from '../components/Header';
import React from 'react';
import '../styles/globals.css';
import QueryWrapper from './QueryWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="max-w-7xl mx-auto">
        <QueryWrapper>
          <Header />
          <Banner />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
