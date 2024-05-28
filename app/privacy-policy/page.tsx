import Container from '@/components/container';
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">1. Introduction</h2>
        <p className="text-sm text-muted-foreground">
          At Sqwadz, we value the privacy of our users and are committed to protecting your personal information. This
          Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our website
          (https://sqwadz.com/) and services.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">2. Information We Collect</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          We collect personal information through various OAuth providers when you create an account or sign in to our
          platform:
        </p>
        <ul className="mb-4 list-inside list-disc space-y-2 text-muted-foreground">
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
        <p className="text-sm text-muted-foreground">
          Additionally, we collect non-personal information for analytics purposes, such as location, devices, and
          operating systems. This information is not tied to specific users.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">3. Use of Information</h2>
        <p className="text-sm text-muted-foreground">
          We use the information we collect to provide, maintain, and improve our services, as well as for communication
          purposes, analytics, and personalization of your experience on our website.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">4. Data Sharing and Disclosure</h2>
        <p className="text-sm text-muted-foreground">
          We do not sell or rent your personal information to third parties. We may share your information with trusted
          service providers who assist us in operating our website and delivering our services. We may also disclose
          your information as required by law or to protect our rights and interests.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">5. Data Security</h2>
        <p className="text-sm text-muted-foreground">
          We implement reasonable security measures to protect your personal information from unauthorized access,
          disclosure, or misuse. However, no method of transmission or storage is completely secure, and we cannot
          guarantee absolute security.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">6. Third-Party Links</h2>
        <p className="text-sm text-muted-foreground">
          Our website may contain links to third-party websites or services that are not governed by this Privacy
          Policy. We encourage you to review the privacy policies of those third parties before providing any personal
          information.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">7. Children&apos;s Privacy</h2>
        <p className="text-sm text-muted-foreground">
          Our services are not intended for children under the age of 13. We do not knowingly collect personal
          information from children without parental consent.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">8. Changes to this Privacy Policy</h2>
        <p className="text-sm text-muted-foreground">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
          We encourage you to review this page periodically for the latest information.
        </p>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
