import { useState } from "react";
import { GraduationCap, Gift, Users, BookOpen } from "lucide-react";

const StatsSection = () => {
  const [stats, setStats] = useState([
    {
      icon: <GraduationCap className="h-8 w-8" />,
      stat: "10,000+",
      label: "Students Helped",
    },
    {
      icon: <Gift className="h-8 w-8" />,
      stat: "$5M+",
      label: "Scholarships Awarded",
    },
    {
      icon: <Users className="h-8 w-8" />,
      stat: "500+",
      label: "Partner Colleges",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      stat: "95%",
      label: "Success Rate",
    },
  ]);

  // Function to update stats
  const handleTextChange = (
    index: number,
    key: "stat" | "label",
    value: string
  ) => {
    const updatedStats = [...stats];
    updatedStats[index][key] = value;
    setStats(updatedStats);
  };

  return (
    <section className="py-20 bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={index} className="text-center text-white">
              <div className="flex justify-center">{item.icon}</div>
              <p
                className="mt-2 text-4xl font-bold outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTextChange(index, "stat", e.target.innerText)
                }
              >
                {item.stat}
              </p>
              <p
                className="text-blue-100 outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTextChange(index, "label", e.target.innerText)
                }
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
