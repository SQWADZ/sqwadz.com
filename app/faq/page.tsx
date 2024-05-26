import Container from '@/components/container';
import React from 'react';

const FAQPage: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold">1. What is OAuth?</h2>
        <p>
          OAuth (Open Authorization) is a secure authorization protocol that allows you to grant limited access to your resources on one website to another website without exposing your credentials. For example, you can use your Discord, Twitch, Battle.net, or Epic Games account to sign into our platform without sharing your password with us.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">2. Is OAuth safe to use?</h2>
        <p>
          Yes, OAuth is designed to be a secure way to grant access to your account without sharing your password. It uses token-based authentication, which means that a temporary token is used instead of your actual credentials. This token is specific to our platform and can be revoked at any time without affecting your original account.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">3. What information do you receive when I sign in using OAuth?</h2>
        <p>
          The information we receive depends on the OAuth provider you use:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Battle.net:</strong> BattleTag (username)</li>
          <li><strong>Discord:</strong> Username, email, avatar</li>
          <li><strong>Epic Games:</strong> Username</li>
          <li><strong>Twitch:</strong> Username, email</li>
        </ul>
        <p>
          This information is used to create and manage your account on our platform.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">4. Will you have access to my passwords?</h2>
        <p>
          No, we do not have access to your passwords. OAuth allows you to sign in without sharing your password with us. You only authorize our platform to access specific information needed to create and manage your account.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">5. Can I revoke access if I no longer want to use your platform?</h2>
        <p>
          Yes, you can revoke access at any time by visiting the settings page of the respective OAuth provider. For example, you can manage your connected apps on Discord, Twitch, Battle.net, or Epic Games to revoke access to our platform.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">6. How do you protect my data?</h2>
        <p>
          We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse. Although no method of transmission or storage is completely secure, we continuously strive to enhance our security practices.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">7. Where can I find more information?</h2>
        <p>
          For more information about our data practices, please refer to our Privacy Policy and Terms of Service. If you have any additional questions or concerns, feel free to contact us at [your contact email].
        </p>
      </div>
    </Container>
  );
};

export default FAQPage;
