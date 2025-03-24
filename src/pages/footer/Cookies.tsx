import React from "react";

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
            <h1 className="text-3xl font-bold ml-2">Cookie Policy</h1>
          </div>
          <p className="text-xl max-w-2xl">
            How CollegeEase uses cookies and similar technologies
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <a
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Home
        </a>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              This Cookie Policy explains how CollegeEase ("we", "us", or "our")
              uses cookies and similar technologies when you visit our website
              at collegeease.com ("Website"). This policy should be read
              alongside our Privacy Policy and Terms of Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when
              you visit a website. They are widely used to make websites work
              more efficiently and provide information to the website owners.
              Cookies enhance user experience by remembering your preferences
              and enabling certain functionality.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Cookies</h2>
            <p>We use cookies for various purposes, including:</p>
            <ul className="list-disc pl-6 mt-4 mb-6">
              <li className="mb-2">
                <strong>Essential Cookies:</strong> These cookies are necessary
                for the Website to function properly. They enable core
                functionality such as security, network management, and account
                access. You cannot opt out of these cookies.
              </li>
              <li className="mb-2">
                <strong>Analytical/Performance Cookies:</strong> These cookies
                allow us to recognize and count the number of visitors and see
                how visitors move around our Website. This helps us improve the
                way our Website works, for example, by ensuring that users find
                what they are looking for easily.
              </li>
              <li className="mb-2">
                <strong>Functionality Cookies:</strong> These cookies are used
                to recognize you when you return to our Website. They enable us
                to personalize our content for you, greet you by name, and
                remember your preferences (for example, your choice of language
                or region).
              </li>
              <li className="mb-2">
                <strong>Targeting Cookies:</strong> These cookies record your
                visit to our Website, the pages you have visited, and the links
                you have followed. We use this information to make our Website
                and the advertising displayed on it more relevant to your
                interests.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Third-Party Cookies
            </h2>
            <p>
              In addition to our own cookies, we may also use various
              third-party cookies to report usage statistics of the Website and
              deliver advertisements on and through the Website. These third
              parties may include:
            </p>
            <ul className="list-disc pl-6 mt-4 mb-6">
              <li className="mb-2">Google Analytics (for website analytics)</li>
              <li className="mb-2">
                Facebook (for social media integration and advertising)
              </li>
              <li className="mb-2">
                LinkedIn (for social media integration and advertising)
              </li>
              <li className="mb-2">Twitter (for social media integration)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Managing Cookies</h2>
            <p>
              Most web browsers allow you to manage your cookie preferences. You
              can set your browser to refuse cookies, or to alert you when
              cookies are being sent. The methods for doing so vary from browser
              to browser, and from version to version. However, you can usually
              find this information in the menu under 'options', 'settings', or
              'preferences'.
            </p>
            <p className="mt-4">
              Please note that if you choose to disable cookies, some features
              of our Website may not function properly.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Changes to This Cookie Policy
            </h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify
              you of any changes by posting the new Cookie Policy on this page
              and updating the "Last Updated" date.
            </p>
            <p className="mt-4">
              You are advised to review this Cookie Policy periodically for any
              changes. Changes to this Cookie Policy are effective when they are
              posted on this page.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact
              us:
            </p>
            <ul className="list-disc pl-6 mt-4 mb-6">
              <li className="mb-2">By email: support@collegeease.com</li>
              <li className="mb-2">By phone: +977 9850894347</li>
              <li className="mb-2">By mail: Kathmandu, Nepal</li>
            </ul>

            <p className="mt-8 text-sm text-gray-500">
              Last Updated: March 23, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
