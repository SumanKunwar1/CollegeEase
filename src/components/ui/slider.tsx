"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import { colleges } from "../../data/colleges";
import type { College } from "../../types/college";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % colleges.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + colleges.length) % colleges.length
    );
  };

  const currentCollege: College = colleges[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">College Showcase</h1>
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="relative aspect-video">
            <img
              src={currentCollege.imageUrl || "/placeholder.svg"}
              alt={currentCollege.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white p-6">
            <h2 className="text-2xl font-semibold mb-2">
              {currentCollege.name}
            </h2>
            <p className="text-gray-600 mb-4">{currentCollege.location}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-medium">Tuition Range:</p>
                <p>{currentCollege.tuitionRange}</p>
              </div>
              <div>
                <p className="font-medium">Acceptance Rate:</p>
                <p>{currentCollege.acceptanceRate}</p>
              </div>
              <div>
                <p className="font-medium">Student Population:</p>
                <p>{currentCollege.studentPopulation}</p>
              </div>
              <div>
                <p className="font-medium">Rating:</p>
                <p className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  {currentCollege.rating.toFixed(1)}
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Available Courses:</p>
              <div className="flex flex-wrap gap-2">
                {currentCollege.courses.map((course) => (
                  <span
                    key={course}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Slide {currentIndex + 1} of {colleges.length}
        </p>
      </div>
    </div>
  );
};

export default Slider;
