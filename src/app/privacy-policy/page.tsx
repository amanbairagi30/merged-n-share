import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">1. Introduction</h2>
        <p>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use Merged&Share.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          2. Information We Collect
        </h2>
        <ul className="list-disc pl-5">
          <li>
            Personal Information: Name, email, and payment details for account
            setup and billing.
          </li>
          <li>
            Usage Data: Information about how you interact with the platform.
          </li>
          <li>Cookies: Used for analytics and improving user experience.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc pl-5">
          <li>To provide and maintain our services.</li>
          <li>To process payments and manage subscriptions.</li>
          <li>To improve the platform and user experience.</li>
          <li>To communicate with you regarding updates and offers.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">4. Third-Party Sharing</h2>
        <p>We may share your information with:</p>
        <ul className="list-disc pl-5">
          <li>Payment processors (e.g., Dodo Payments).</li>
          <li>Analytics providers (e.g., Google Analytics).</li>
          <li>AI tools used for PR summarization.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">5. Data Security</h2>
        <p>
          We implement measures to protect your data, but no system is
          completely secure. By using Merged&Share, you acknowledge and accept
          this risk.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">6. User Rights</h2>
        <ul className="list-disc pl-5">
          <li>Access and update your personal information.</li>
          <li>Request data deletion.</li>
          <li>Opt out of marketing communications.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">7. Cookies Policy</h2>
        <p>
          Our website uses cookies to track user activity and improve services.
          You can disable cookies through your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">8. Contact Information</h2>
        <p>
          If you have privacy concerns, contact us at{' '}
          <a href="mailto:amanbairagi1089@gmail.com" className="text-blue-500">
            amanbairagi1089@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
