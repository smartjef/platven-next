import { MetadataRoute } from 'next';


export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://platven.ke/',
            lastModified: new Date(),
        },
        {
            url: 'https://platven.ke/about',
            lastModified: new Date(),
        },
        {
            url: 'https://platven.ke/contact',
            lastModified: new Date(),
        },
    ];
}
