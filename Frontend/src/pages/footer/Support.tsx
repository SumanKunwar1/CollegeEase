import { Mail, Phone, MessageSquare, Clock } from "lucide-react";

function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Center
          </h1>
          <p className="text-lg text-gray-600">
            We're here to help you succeed in your college journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Us
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-gray-600">support@collegeease.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-gray-600">1-800-COLLEGE (265-5343)</p>
                </div>
              </div>
              <div className="flex items-center">
                <MessageSquare className="text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-gray-600">Available in your dashboard</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">Hours of Operation</p>
                  <p className="text-gray-600">
                    Monday - Friday: 9AM - 8PM EST
                  </p>
                  <p className="text-gray-600">Saturday: 10AM - 6PM EST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
