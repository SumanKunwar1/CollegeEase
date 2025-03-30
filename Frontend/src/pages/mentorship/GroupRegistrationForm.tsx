import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditCard, Palette as Paypal, ArrowLeft } from "lucide-react";
import { sessions } from "../../data/groupsession";

const RegistrationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "",
    // Credit Card Fields
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    // PayPal Fields
    paypalEmail: "",
  });

  const session = sessions.find((s) => s.id === Number(id));

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Session not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Credit card number formatting (add spaces every 4 digits)
    if (name === "cardNumber") {
      const formatted =
        value
          .replace(/\s/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || "";
      setFormData({
        ...formData,
        [name]: formatted.slice(0, 19), // Limit to 16 digits + 3 spaces
      });
      return;
    }

    // CVV formatting (limit to 3-4 digits)
    if (name === "cvv") {
      const formatted = value.replace(/\D/g, "").slice(0, 4);
      setFormData({
        ...formData,
        [name]: formatted,
      });
      return;
    }

    // Expiry date formatting (MM/YY)
    if (name === "expiryDate") {
      const formatted = value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/(\d{2})(\d{2})/, "$1/$2")
        .slice(0, 5);
      setFormData({
        ...formData,
        [name]: formatted,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodSelect = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    });
  };

  const handlePayPalCheckout = () => {
    // Simulate PayPal redirect
    window.alert("Redirecting to PayPal...");
    // In a real application, this would redirect to PayPal's checkout
    setTimeout(() => {
      navigate("/registration-success");
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      if (formData.paymentMethod === "paypal") {
        handlePayPalCheckout();
        return;
      }
      // Handle credit card submission
      console.log("Form submitted:", formData);
      navigate("/registration-success");
    }
  };

  const renderCreditCardFields = () => (
    <div className="space-y-4 mt-4">
      <div>
        <label
          htmlFor="cardName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name on Card
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          required
          value={formData.cardName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          required
          value={formData.cardNumber}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="1234 5678 9012 3456"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            required
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            required
            value={formData.cvv}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="123"
          />
        </div>
      </div>
    </div>
  );

  const renderPayPalFields = () => (
    <div className="space-y-4 mt-4">
      <div>
        <label
          htmlFor="paypalEmail"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          PayPal Email
        </label>
        <input
          type="email"
          id="paypalEmail"
          name="paypalEmail"
          required
          value={formData.paypalEmail}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        You will be redirected to PayPal to complete your payment securely.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to session
        </button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Register for {session.title}
            </h2>
            <p className="text-gray-600 mb-6">Led by {session.mentor}</p>

            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <div>
                <p className="text-sm text-gray-600">Session Date</p>
                <p className="font-medium">{session.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium">{session.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium">{session.price}</p>
              </div>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
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
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select Payment Method
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: "card", name: "Credit Card", icon: CreditCard },
                      { id: "paypal", name: "PayPal", icon: Paypal },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                          formData.paymentMethod === method.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={() => handlePaymentMethodSelect(method.id)}
                          className="sr-only"
                        />
                        <method.icon className="h-6 w-6 text-gray-600 mr-3" />
                        <span className="text-gray-900 font-medium">
                          {method.name}
                        </span>
                      </label>
                    ))}
                  </div>

                  {formData.paymentMethod === "card" &&
                    renderCreditCardFields()}
                  {formData.paymentMethod === "paypal" && renderPayPalFields()}
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600">Session Price:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {session.price}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.paymentMethod}
                      className="w-2/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                      {formData.paymentMethod === "paypal"
                        ? "Continue to PayPal"
                        : "Complete Payment"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
