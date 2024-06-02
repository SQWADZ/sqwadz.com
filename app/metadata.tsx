export const metadata = {
  title: 'SQWADZ | Finding Groups Made Easy',
  description: 'Browse games, select a room, and join the group effortlessly. Finding groups has never been easier.',
  openGraph: {
    title: 'SQWADZ | Finding Groups Made Easy',
    description: 'Browse games, select a room, and join the group effortlessly. Finding groups has never been easier.',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Finding Groups Made Easy',
      },
    ],
  },
  canonical: 'https://sqwadz.com/',
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Finding Groups Made Easy',
      description:
        'Browse games, select a room, and join the group effortlessly. Finding groups has never been easier.',
      url: 'https://sqwadz.com/',
    }),
  },
};
