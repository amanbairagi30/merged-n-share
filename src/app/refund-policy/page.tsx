import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Refund Policy</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">1. Refund Eligibility</h2>
        <p>Refunds are available for:</p>
        <ul className="list-disc pl-5">
          <li>
            Subscription cancellations requested within 14 days of purchase.
          </li>
          <li>Accidental charges, provided the service was not used.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          2. No Refunds for Used Services
        </h2>
        <p>
          Refunds are not available for digital services that have been fully
          delivered or consumed, such as completed AI PR summaries.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          3. How to Request a Refund
        </h2>
        <p>
          To request a refund, email{' '}
          <a href="mailto:refunds@mergednshare.com" className="text-blue-500">
            refunds@mergednshare.com
          </a>{' '}
          with the following details:
        </p>
        <ul className="list-disc pl-5">
          <li>Account email.</li>
          <li>Reason for the refund request.</li>
          <li>Proof of payment (e.g., transaction ID).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">4. Refund Processing</h2>
        <p>
          Refunds will be processed within 7-10 business days. The amount will
          be credited back to the original payment method.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          5. Subscription Cancellation
        </h2>
        <p>
          Canceling a subscription will prevent further billing, but your
          account will retain access to paid features until the end of the
          current billing cycle.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">6. Contact Information</h2>
        <p>
          For refund-related inquiries, contact us at{' '}
          <a href="mailto:refunds@mergednshare.com" className="text-blue-500">
            amanbairagi1089@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default RefundPolicy;
