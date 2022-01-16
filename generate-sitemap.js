import  sitemap  from 'nextjs-sitemap-generator';
import  path  from 'path';

sitemap({
    baseUrl: 'https://anizzama.vercel.app',
    pagesDirectory: path.resolve(__dirname, '../out/'),
    targetDirectory: path.resolve(__dirname, '../out/'),
    ignoredExtensions: ['js', 'map', 'json', 'xml', 'png', 'css', 'jpeg', 'jpg', 'icon', 'webp', 'webm'],
    ignoredPaths: [
        '404',
        'favicon',
    ]
});

