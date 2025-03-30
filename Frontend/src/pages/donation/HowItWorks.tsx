import {
  Search,
  Heart,
  DollarSign,
  Bell,
  Mail,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse Student Profiles",
      description:
        "Explore profiles of students seeking support for their education. Each profile includes their story, goals, and funding needs.",
    },
    {
      icon: Heart,
      title: "Choose Who to Support",
      description:
        "Select students whose stories resonate with you. You can support multiple students with any amount you choose.",
    },
    {
      icon: DollarSign,
      title: "Make Your Donation",
      description:
        "Contribute securely through our platform. Choose one-time or recurring donations to provide sustained support.",
    },
    {
      icon: Bell,
      title: "Track Your Impact",
      description:
        "Receive updates on your supported students' progress and see how your donation is making a difference.",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description:
        "All donations are processed securely, and we maintain full transparency about fund allocation.",
    },
    {
      icon: Mail,
      title: "Direct Communication",
      description:
        "Receive updates directly from students you support, including their progress and achievements.",
    },
    {
      icon: Users,
      title: "Community Impact",
      description:
        "Join a community of donors making a real difference in students' lives through education.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">How It Works</h1>
          <p className="mt-2 text-gray-600">
            Learn how you can make a difference in students' lives through our
            platform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <step.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h2>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Why Choose Our Platform?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "How are students verified?",
                  answer:
                    "We thoroughly verify each student's academic credentials, financial need, and personal story before they can create a profile on our platform.",
                },
                {
                  question: "Where does my donation go?",
                  answer:
                    "Your donation goes directly to the student's educational expenses, including tuition, books, and necessary supplies. We provide full transparency of fund allocation.",
                },
                {
                  question: "Can I get tax benefits?",
                  answer:
                    "Yes, all donations are tax-deductible. You'll receive a tax receipt for your contributions at the end of the year.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 mb-8">
            Start supporting students and be part of their educational journey
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">
              <Heart className="h-5 w-5 mr-2" />
              Start Donating
            </Button>
            <Button variant="outline" size="lg">
              <ArrowRight className="h-5 w-5 mr-2" />
              Browse Students
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
