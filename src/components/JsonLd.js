import { siteConfig } from '../data/site';

export default function JsonLd({ breadcrumbs = [] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ssfurniture.in';

  const schemaGraph = [
    {
      '@type': ['FurnitureStore', 'LocalBusiness'],
      '@id': `${siteUrl}/#organization`,
      name: siteConfig.name,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/ss-furniture-logo.svg`,
        caption: siteConfig.name,
      },
      image: `${siteUrl}/images/sections/hero-living-room.jpg`,
      description: siteConfig.description,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.streetAddress,
        addressLocality: siteConfig.locality,
        addressRegion: siteConfig.region,
        postalCode: siteConfig.postalCode,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.3631019,
        longitude: 72.8841798,
      },
      hasMap: siteConfig.googleMapsEmbedUrl,
      sameAs: [siteConfig.googleMapsShareUrl],
      knowsAbout: [
        'Solid Wood Beds & Bedroom Furniture',
        'Fabric & Leatherette Sofa Sets',
        'Storage Cabinets & Wardrobes',
        'Wooden Home Mandirs & Pooja Units',
        'Dining Tables & Dining Chairs',
        'Living Room Centre Tables & Coffee Tables',
      ],
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Maharashtra',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'en-IN',
    },
  ];

  if (breadcrumbs.length > 0) {
    schemaGraph.push({
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: `${siteUrl}${crumb.path}`,
      })),
    });
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
