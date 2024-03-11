import React from 'react';
import Container from '@/components/container';

const TermsOfServicePage: React.FC = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-4">Sqwadz Terms of Service</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold">1. Introduction</h2>
        <p>
          Welcome to Sqwadz, a platform for managing and coordinating teams and
          group activities. By accessing or using https://sqwadz.com/ (the
          "Website"), you agree to be bound by these Terms of Service and our
          Privacy Policy.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">2. Use of Services</h2>
        <p>
          You agree to use the Website and its services only for lawful purposes
          and in accordance with these Terms of Service. You are responsible for
          your use of the Website and any consequences arising from such use.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">3. Intellectual Property</h2>
        <p>
          The Website and its content are protected by intellectual property
          laws. You may not use or reproduce our content without our prior
          written consent.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">4. User Accounts</h2>
        <p>
          You may be required to create an account to access certain features of
          the Website. You are responsible for maintaining the confidentiality
          of your account credentials and for any activities that occur under
          your account.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">5. Disclaimer of Warranties</h2>
        <p>
          We provide the Website and its services "as is" without any
          warranties or representations, express or implied. We do not guarantee
          the accuracy, reliability, or completeness of the Website or its
          content.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">6. Limitation of Liability</h2>
        <p>
          In no event shall we be liable for any indirect, incidental, special,
          or consequential damages arising from your use of the Website or its
          services.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">7. Modifications</h2>
        <p>
          We reserve the right to modify or terminate these Terms of Service at
          any time without prior notice.
        </p>
      </div>
    </Container>
  );
};

export default TermsOfServicePage;