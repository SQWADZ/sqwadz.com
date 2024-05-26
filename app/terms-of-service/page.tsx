import React from 'react';
import Container from '@/components/container';

const TermsOfServicePage: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-4 text-3xl font-bold">Sqwadz Terms of Service</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold">1. Introduction</h2>
        <p>
          Welcome to Sqwadz, a platform for managing and coordinating teams and group activities. By accessing or using
          https://sqwadz.com/ (the &quot;Website&quot;), you agree to be bound by these Terms of Service and our Privacy
          Policy.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">2. Use of Services</h2>
        <p>
          You agree to use the Website and its services only for lawful purposes and in accordance with these Terms of
          Service. You are responsible for your use of the Website and any consequences arising from such use.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">3. Intellectual Property</h2>
        <p>
          The Website and its content are protected by intellectual property laws. You may not use or reproduce our
          content without our prior written consent.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">4. User Accounts</h2>
        <p>
          You may be required to create an account to access certain features of the Website. We use OAuth providers for account creation and sign-in, including Battle.net, Discord, Epic Games, and Twitch. By using these OAuth providers, you agree to share your username and, where applicable, your email and avatar with us. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">5. Analytics and Data Collection</h2>
        <p>
          We collect non-personal information for analytics purposes, such as location, devices, and operating systems. This data is anonymized and not tied to specific users. By using our Website, you agree to this data collection for the purpose of improving our services.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">6. Disclaimer of Warranties</h2>
        <p>
          We provide the Website and its services &quot;as is&quot; without any warranties or representations, express
          or implied. We do not guarantee the accuracy, reliability, or completeness of the Website or its content.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">7. Limitation of Liability</h2>
        <p>
          In no event shall we be liable for any indirect, incidental, special, or consequential damages arising from
          your use of the Website or its services.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">8. Modifications</h2>
        <p>We reserve the right to modify or terminate these Terms of Service at any time without prior notice.</p>
      </div>
    </Container>
  );
};

export default TermsOfServicePage;
