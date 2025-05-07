import React from 'react';

const page = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-10">Privacy Policy & Terms and Conditions</h1>

      {/* INTRODUCTION */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p className="mb-2">
          Welcome to [Your Company Name] – a robust event and project management platform built to help you
          seamlessly organize, manage, and execute complex construction and software initiatives. This document outlines
          the terms and policies governing your usage of our platform. Please read it carefully.
        </p>
        <p>
          By using our services, you acknowledge and agree to the practices described below.
        </p>
      </section>

      {/* PRIVACY POLICY */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">2. Privacy Policy</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.1 Information We Collect</h3>
        <p>We collect the following types of information from our users:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Personal Identifiers: Full name, email address, phone number, company name, job title</li>
          <li>Account Credentials: Username, password (encrypted)</li>
          <li>Usage Data: Device information, browser type, pages visited, time spent on pages</li>
          <li>Project Data: Uploaded files, task details, calendar entries, messages between team members</li>
          <li>Payment Data: Billing information, invoice history (processed via secure third-party providers)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.2 How We Use Your Information</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>To register and manage your account</li>
          <li>To provide core services such as project planning, event scheduling, team collaboration, and reporting</li>
          <li>To send service-related announcements, alerts, and administrative messages</li>
          <li>To monitor platform performance and conduct analytics</li>
          <li>To improve user experience and develop new features</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.3 Cookies and Tracking</h3>
        <p className="mb-4">
          We use cookies to personalize content, analyze site traffic, and improve service delivery. You may choose to
          disable cookies in your browser settings, though this may impact functionality.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.4 Third-Party Services</h3>
        <p className="mb-4">
          We may use third-party tools (e.g., Google Analytics, Stripe, SendGrid) that may collect information
          governed by their own privacy practices. We only partner with services that uphold strong data privacy
          standards.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.5 Data Retention</h3>
        <p className="mb-4">
          We retain user data only as long as necessary for the purposes outlined in this policy. You may request
          deletion of your data by contacting us directly.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.6 Your Rights</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Access your data at any time</li>
          <li>Request updates or corrections</li>
          <li>Withdraw consent or request deletion</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">2.7 Security Measures</h3>
        <p>
          We implement best-in-class security protocols, including HTTPS, data encryption, access control,
          and regular vulnerability scanning.
        </p>
      </section>

      {/* TERMS & CONDITIONS */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">3. Terms and Conditions</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.1 User Accounts</h3>
        <p className="mb-4">
          You must be 18 years or older to register. You are responsible for maintaining the confidentiality of your
          login credentials and for all activities that occur under your account.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.2 Acceptable Use</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>No unauthorized access, hacking, or tampering</li>
          <li>No use of the platform for unlawful purposes</li>
          <li>No harassment, abuse, or harmful behavior toward other users</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.3 Subscription and Payment</h3>
        <p className="mb-4">
          Certain services require payment. Fees are billed monthly or annually, and failure to pay may result in
          suspension of your account. All payments are processed through secure third-party providers.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.4 Termination</h3>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account if you violate these terms or misuse the platform.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.5 Intellectual Property</h3>
        <p className="mb-4">
          All trademarks, logos, and software are the property of [Your Company Name]. Users are granted a limited,
          non-exclusive license to use the platform.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.6 Limitation of Liability</h3>
        <p className="mb-4">
          We are not responsible for any indirect, incidental, or consequential damages arising from your use of the
          platform.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">3.7 Governing Law</h3>
        <p>
          These terms are governed by the laws of [Your Country or State]. Any disputes will be resolved in the courts
          of the applicable jurisdiction.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-3">4. Contact Us</h2>
        <p className="mb-2">
          If you have questions, concerns, or feedback regarding our policies or your data, you may reach out to us at:
        </p>
        <p className="font-semibold">Email: contact@yourdomain.com</p>
        <p className="font-semibold">Phone: +1 (123) 456-7890</p>
        <p className="font-semibold">Address: 123 Software Lane, Tech City, TC 12345</p>
      </section>
    </div>
  );
};

export default page;
