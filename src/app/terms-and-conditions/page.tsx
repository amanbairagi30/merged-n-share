import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Terms and Conditions</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">1. Introduction</h2>
        <p>
          Welcome to Merged&Share, a platform designed to help users showcase
          their open-source contributions, share embeds, and utilize advanced
          tools like AI PR summarization. By accessing or using our service, you
          agree to comply with these Terms and Conditions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">2. Eligibility</h2>
        <p>
          You must be at least 18 years old or have parental/guardian consent to
          use this platform. By using Merged&Share, you represent and warrant
          that you meet this eligibility requirement.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">3. Account Terms</h2>
        <ul className="list-disc pl-5">
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            You must provide accurate and complete information during
            registration.
          </li>
          <li>
            Any activity conducted through your account is your responsibility.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">4. Free vs Paid Plan</h2>
        <p>
          Free Plan: Includes basic profile sharing with Merged&Share branding.
        </p>
        <p>Paid Plan: Offers premium features such as:</p>
        <ul className="list-disc pl-5">
          <li>Watermark-free embeds.</li>
          <li>AI PR summarization.</li>
          <li>Advanced analytics.</li>
          <li>Additional customization options.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">5. Payment Terms</h2>
        <ul className="list-disc pl-5">
          <li>
            Paid plans are subscription-based and will auto-renew unless
            canceled.
          </li>
          <li>
            Payments are processed securely through third-party providers.
          </li>
          <li>
            You agree to provide current, complete, and accurate payment
            information.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          6. Prohibited Activities
        </h2>
        <p>You may not:</p>
        <ul className="list-disc pl-5">
          <li>Use the service for illegal purposes.</li>
          <li>Attempt to hack, overload, or disrupt the platform.</li>
          <li>Upload malicious content, such as viruses.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account if you
          violate these Terms and Conditions or misuse the platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">8. Changes to Terms</h2>
        <p>
          We may update these Terms and Conditions periodically. Continued use
          of the platform after updates constitutes acceptance of the revised
          terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">9. Contact Information</h2>
        <p>
          For any questions about these Terms and Conditions, please contact us
          at{' '}
          <a href="mailto:amanbairagi1089@gmail.com" className="text-blue-500">
            amanbairagi1089@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
