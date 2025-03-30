import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Heart, DollarSign, CreditCard } from "lucide-react";
import { donation } from "../../../data/donations";
import emailjs from "@emailjs/browser";
import { jsPDF } from "jspdf";

const predefinedAmounts = [10, 25, 50, 100, 250, 500];

type PaymentMethod = "visa" | "paypal" | null;

const DonationForm = () => {
  const { id } = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Find the student profile based on the ID
  const studentProfile = donation.find((profile) => profile.id === id);

  // Calculate tax benefit (50% of donation amount)
  const taxBenefit = (selectedAmount || Number(customAmount) || 0) * 0.5;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(Number(value) || null);
    }
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Add a header with a larger font
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 80);
    doc.text("Donation Receipt", 105, 20, { align: "center" });

    // Add a horizontal line
    doc.setDrawColor(52, 73, 94);
    doc.line(20, 25, 190, 25);

    // Reset text color to black
    doc.setTextColor(0, 0, 0);

    // Add receipt details with better formatting
    doc.setFontSize(12);
    const startY = 40;
    const lineHeight = 10;

    // Receipt Details
    doc.setFont("bold");
    doc.text("Receipt Details:", 20, startY);
    doc.setFont("normal");

    doc.text(`Date: ${date}`, 20, startY + lineHeight);
    doc.text(
      `Donor: ${isAnonymous ? "Anonymous" : `${firstName} ${lastName}`}`,
      20,
      startY + lineHeight * 2
    );
    doc.text(`Email: ${email}`, 20, startY + lineHeight * 3);

    // Financial Details
    doc.setFont("bold");
    doc.text("Financial Information:", 20, startY + lineHeight * 5);
    doc.setFont("normal");

    doc.text(
      `Donation Amount: $${(selectedAmount || Number(customAmount)).toFixed(
        2
      )}`,
      20,
      startY + lineHeight * 6
    );
    doc.text(
      `Tax Benefit (50%): $${taxBenefit.toFixed(2)}`,
      20,
      startY + lineHeight * 7
    );

    // Recipient Details
    doc.setFont("bold");
    doc.text("Recipient Information:", 20, startY + lineHeight * 9);
    doc.setFont("normal");

    doc.text(
      `Student: ${studentProfile?.studentName}`,
      20,
      startY + lineHeight * 10
    );

    // Thank you message
    doc.setFont("italic");
    doc.text(
      "Thank you for your generous contribution to support education!",
      20,
      startY + lineHeight * 12
    );

    // Footer with additional information
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text("This receipt is valid for tax purposes.", 105, 250, {
      align: "center",
    });

    return doc.output("datauristring");
  };

  const sendConfirmationEmail = async () => {
    if (!email) return;

    try {
      const receipt = generateReceipt();

      await emailjs.send(
        "service_recg1uu", // Replace with your EmailJS service ID
        "template_5lx1kua", // Replace with your EmailJS template ID
        {
          email: email,
          donor_name: isAnonymous
            ? "Anonymous Donor"
            : `${firstName} ${lastName}`,
          amount: selectedAmount || customAmount,
          tax_benefit: taxBenefit.toFixed(2),
          student_name: studentProfile?.studentName,
          receipt_pdf: receipt,
        },
        "cbtW2UZLaGDkiRscO" // Replace with your EmailJS public key
      );
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send confirmation email. Please contact support.");
    }
  };

  const handlePayPalRedirect = () => {
    // Replace with your PayPal integration
    window.open("https://www.paypal.com", "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = selectedAmount || Number(customAmount);

    if (!studentProfile || !donationAmount) return;

    setIsProcessing(true);

    try {
      if (paymentMethod === "paypal") {
        handlePayPalRedirect();
        return;
      }

      // Process card payment (mock)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update the student's raised amount
      studentProfile.raised += donationAmount;

      // Send confirmation email
      await sendConfirmationEmail();

      // Show success message
      alert(
        `Thank you for your donation of $${donationAmount} to support ${studentProfile.studentName}!`
      );

      // Reset form
      setCustomAmount("");
      setSelectedAmount(null);
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setIsAnonymous(false);
      setPaymentMethod(null);
      setCardNumber("");
      setCvv("");
      setExpiryDate("");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!studentProfile) {
    return <div className="text-center p-8">Student profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Support {studentProfile.studentName}
                </h1>
                <p className="mt-2 text-gray-600">
                  Your donation will help achieve their educational goals
                </p>
              </div>
              <img
                src={studentProfile.image}
                alt={studentProfile.studentName}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Raised: ${studentProfile.raised.toLocaleString()}</span>
                <span>Goal: ${studentProfile.goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (studentProfile.raised / studentProfile.goal) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select donation amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`${
                        selectedAmount === amount
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300"
                      } px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="mt-2 bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Tax Benefit (50%):
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      ${taxBenefit.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select payment method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`${
                      paymentMethod === "visa"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300"
                    } px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center`}
                    onClick={() => setPaymentMethod("visa")}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Credit Card
                  </button>
                  <button
                    type="button"
                    className={`${
                      paymentMethod === "paypal"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300"
                    } px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    PayPal
                  </button>
                </div>
              </div>

              {paymentMethod === "visa" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required={!isAnonymous}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required={!isAnonymous}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (for receipt)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave a message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="anonymous"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Donate anonymously
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  (!selectedAmount && !customAmount) ||
                  isProcessing ||
                  !paymentMethod
                }
              >
                {isProcessing ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Donate ${selectedAmount || customAmount || 0}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
