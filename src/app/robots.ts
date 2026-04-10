import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth/', '/login/'],
    },
    sitemap: 'https://invoice.philipjohnn8nautomation.online/sitemap.xml',
  }
}
