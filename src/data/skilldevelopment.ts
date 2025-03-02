export const skillCategories = [
  {
    title: "Technical Skills",
    description: "Master the technical skills most in demand by employers",
    courses: [
      {
        title: "Data Analysis Fundamentals",
        duration: "6 weeks",
        level: "Beginner",
        rating: 4.8,
        students: 1234,
        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
        details: {
          overview:
            "This course covers the fundamentals of data analysis, including data cleaning, visualization, and basic statistical analysis.",
          syllabus: [
            {
              title: "Introduction to Data Analysis",
              description: [
                "Data analysis is the process of inspecting, cleaning, transforming, and modeling data with the goal of discovering useful information, informing conclusions, and supporting decision-making.",
                "In this section, we will explore the basics of data analysis, including the types of data, data sources, and the tools used in the industry.",
              ],
              imageUrl:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
            },
            {
              title: "Data Cleaning Techniques",
              description: [
                "Data cleaning is the process of detecting and correcting (or removing) corrupt or inaccurate records from a dataset.",
                "We will cover various techniques such as handling missing data, removing duplicates, and correcting inconsistencies.",
              ],
            },
            {
              title: "Data Visualization",
              description: [
                "Data visualization is the graphical representation of information and data.",
                "We will learn how to use tools like Matplotlib and Seaborn to create visualizations that help in understanding the data better.",
              ],
              imageUrl:
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
            },
            {
              title: "Basic Statistical Analysis",
              description: [
                "Statistical analysis involves collecting and scrutinizing every data sample in a set of items from which samples can be drawn.",
                "We will cover basic statistical concepts such as mean, median, mode, standard deviation, and more.",
              ],
            },
          ],
          instructor: {
            name: "John Doe",
            bio: "John is a data scientist with over 10 years of experience in the field.",
            imageUrl:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
          },
        },
      },
      // Add other courses similarly
    ],
  },
  // Add other categories and courses similarly
];
