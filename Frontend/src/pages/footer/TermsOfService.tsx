import React from "react";
import { FileText } from "lucide-react";

function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">Last updated: March 15, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 mb-6">
              By accessing or using CollegeEase's website and services, you
              agree to be bound by these Terms of Service. If you disagree with
              any part of the terms, you may not access our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Description of Services
            </h2>
            <p className="text-gray-700 mb-6">
              CollegeEase provides college application assistance, including but
              not limited to:
              <ul className="list-disc pl-6 mb-6">
                <li>Application tracking and management</li>
                <li>Essay writing assistance</li>
                <li>College matching services</li>
                <li>Deadline reminders</li>
                <li>Expert guidance and resources</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts
            </h2>
            <p className="text-gray-700 mb-6">
              <ul className="list-disc pl-6 mb-6">
                <li>
                  You must provide accurate and complete information when
                  creating an account
                </li>
                <li>
                  You are responsible for maintaining the security of your
                  account
                </li>
                <li>
                  You must notify us immediately of any unauthorized access
                </li>
                <li>
                  We reserve the right to terminate accounts that violate our
                  terms
                </li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Payment Terms
            </h2>
            <p className="text-gray-700 mb-6">
              <ul className="list-disc pl-6 mb-6">
                <li>All fees are charged in advance for our services</li>
                <li>
                  Refunds are available within 30 days of purchase if services
                  are unused
                </li>
                <li>Subscription plans automatically renew unless cancelled</li>
                <li>Price changes will be notified 30 days in advance</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-gray-700 mb-6">
              All content, features, and functionality of our services are owned
              by CollegeEase and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. User Content
            </h2>
            <p className="text-gray-700 mb-6">
              <ul className="list-disc pl-6 mb-6">
                <li>You retain ownership of content you submit</li>
                <li>
                  You grant us license to use your content for providing
                  services
                </li>
                <li>You are responsible for the content you submit</li>
                <li>We may remove content that violates our terms</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-6">
              CollegeEase shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use or inability to use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes via email or through our
              website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Contact Information
            </h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@collegeease.com
              <br />
              Phone: 1-800-COLLEGE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfServicePage;
