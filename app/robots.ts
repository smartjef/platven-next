import { MetadataRoute } from 'next'


export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'facebookexternalhit',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: 'Twitterbot',
                allow: '/',
            },
            {
                userAgent: 'LinkedInBot',
                allow: '/',
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            }
        ],
        sitemap: 'https://platven.ke',
    }
}
