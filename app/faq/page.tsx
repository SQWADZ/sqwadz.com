import Container from '@/components/container';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQWADZ | FAQ',
  description: 'Frequently asked questions about Sqwadz.',
  openGraph: {
    title: 'SQWADZ | FAQ',
    description: 'Frequently asked questions about Sqwadz.',
  },
  alternates: {
    canonical: '/faq',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const FAQPage: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold">1. What is OAuth and is it safe to use?</h2>
        <p className="text-sm text-muted-foreground">
          OAuth is a secure protocol that allows you to sign into our platform using your accounts from other services
          like Discord, Twitch, Battle.net, and Epic Games without sharing your password with us. It uses token-based
          authentication, making it a safe way to grant access.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold">2. What information do you receive when I sign in using OAuth?</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The information we receive depends on the OAuth provider you use:
        </p>
        <ul className="mb-4 list-inside list-disc text-muted-foreground">
          <li>
            <strong>Battle.net:</strong> BattleTag (username)
          </li>
          <li>
            <strong>Discord:</strong> Username, email, avatar
          </li>
          <li>
            <strong>Epic Games:</strong> Username
          </li>
          <li>
            <strong>Twitch:</strong> Username, email
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">We do not have access to your passwords.</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">3. Can I revoke access if I no longer want to use your platform?</h2>
        <p className="text-sm text-muted-foreground">
          Yes, you can revoke access at any time through the settings page of the respective OAuth provider.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">4. How do you protect my data?</h2>
        <p className="text-sm text-muted-foreground">
          We implement reasonable security measures to protect your personal information from unauthorized access,
          disclosure, or misuse. However, no method of transmission or storage is completely secure.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">5. Is this platform a competitor to services like Discord?</h2>
        <p className="text-sm text-muted-foreground">
          No, this platform is not meant to be a competitor or replacement for services like Discord, Teamspeak, or any
          other community platform. We aim to complement these services by providing additional tools for managing and
          coordinating &quot;squads&quot; and group activities.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">6. Where can I find more information?</h2>
        <p className="text-sm text-muted-foreground">
          For more information about our data practices, please refer to our Privacy Policy and Terms of Service.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">7. What exactly is SQWADZ?</h2>
        <p className="text-sm text-muted-foreground">
          Sqwadz is a platform designed to help gamers find other players to form squads/groups/etc... Whether
          you&apos;re looking for a team to play competitive games or a casual group to enjoy multiplayer games, Sqwadz
          makes it easy to browse games, select a room, and join a squad. Our platform leverages OAuth to connect with
          your existing gaming accounts, making it seamless to find and join gaming groups.
        </p>
      </div>
    </Container>
  );
};

export default FAQPage;
