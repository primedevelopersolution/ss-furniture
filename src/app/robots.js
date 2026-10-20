export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ssfurniture.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
