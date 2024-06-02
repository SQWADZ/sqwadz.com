/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self'; 
              img-src 'self' data:; 
              media-src 'self'; 
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://umami.bawkbawk.net; 
              style-src 'self' 'unsafe-inline'; 
              frame-src 'self'; 
              font-src 'self'; 
              connect-src 'self' https://umami.bawkbawk.net https://db.sqwadz.com https://us.battle.net/oauth; 
              base-uri 'self'; 
              form-action 'self'; 
              frame-ancestors 'self'; 
              child-src 'self'; 
              manifest-src 'self'; 
              object-src 'none'; 
              block-all-mixed-content; 
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
