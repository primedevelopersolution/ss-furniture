import { Suspense } from 'react';
import FurnitureClient from './FurnitureClient';
import JsonLd from '../../components/JsonLd';

export const metadata = {
  title: 'Furniture Catalogue | Beds, Sofas, Mandirs & Dining Sets',
  description:
    'Explore the S.S. Furniture catalogue featuring solid wood beds, sectional sofas, storage cabinets, traditional home mandirs, and dining tables in Vasai-Virar, Maharashtra.',
  alternates: {
    canonical: '/furniture',
  },
};

export default function FurniturePage() {
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Furniture Catalogue', path: '/furniture' },
        ]}
      />
      <Suspense fallback={<div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Loading furniture catalogue...</div>}>
        <FurnitureClient />
      </Suspense>
    </>
  );
}
