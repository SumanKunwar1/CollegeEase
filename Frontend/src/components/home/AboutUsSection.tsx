"use client"

import type { FC } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useRef } from "react"

const AboutUsPreview: FC = () => {
  // Sample images - replace these with your actual images
  const collegeImages = [
    "https://ideogram.ai/assets/progressive-image/balanced/response/82HYZav7RUyrnEvEtw0nAw",
    "https://ideogram.ai/assets/progressive-image/balanced/response/JpKfeL-pSIKrNQGq9H8AVw",
    "https://ideogram.ai/assets/image/lossless/response/qOv1KspWTqGW6sW44ajLlw",
    "https://ideogram.ai/assets/progressive-image/balanced/response/PM6cFxxoSKKd-SORwSkEog",
    "https://ideogram.ai/assets/image/lossless/response/A7FMDb7iQYeozfh-lcWJQg",
    "https://ideogram.ai/assets/progressive-image/balanced/response/-zaTf3_RQ82NIhDQx7RHoQ",
    "https://ideogram.ai/assets/progressive-image/balanced/response/iaQ4hym-RneVVLaGX0nCjQ",
    "https://ideogram.ai/assets/progressive-image/balanced/response/AR46udBwTZem5U_3lL4zwg",
    "https://img.freepik.com/premium-photo/technology-diversity-friends-restaurant-together-social-gathering-with-phone-tablet-networking-coffee-shop-brunch-people-relax-sidewalk-cafe-with-text-email-digital-app_590464-297022.jpg?w=996"

  ]

  // Create a ref to measure the container
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  // Smaller image height
  const imageHeight = 350 // Reduced from 500px

  useEffect(() => {
    // Start the animation once the component is mounted
    if (containerRef.current) {
      const totalHeight = collegeImages.length * imageHeight

      // Set up the animation
      controls.start({
        y: -totalHeight,
        transition: {
          duration: 40, // Slow animation (40 seconds for one cycle)
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      })
    }
  }, [controls, collegeImages.length])

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About CollegeEase</h2>
          <p className="text-xl text-gray-600">Empowering Your Educational Journey</p>
        </motion.div>

        {/* Reduced gap from gap-12 to gap-6 */}
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Increased column width from md:grid-cols-2 (6 columns) to md:col-span-5 (5 columns) */}
          <div
            className="relative h-[450px] overflow-hidden rounded-lg shadow-lg md:col-span-6 w-full"
            ref={containerRef}
          >
            {/* Main container that holds both sets of images */}
            <div className="absolute w-full">
              {/* First set of images */}
              <motion.div className="absolute w-full" animate={controls} style={{ y: 0 }}>
                {collegeImages.map((image, index) => (
                  <div
                    key={`original-${index}`}
                    className="w-full"
                    style={{
                      height: `${imageHeight}px`,
                    }}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`College Image ${index + 1}`}
                      className="rounded-lg shadow-md w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* We add the first image again at the end to create a perfect loop */}
                <div
                  className="w-full"
                  style={{
                    height: `${imageHeight}px`,
                  }}
                >
                  <img
                    src={collegeImages[0] || "/placeholder.svg"}
                    alt="College Image 1 (repeated)"
                    className="rounded-lg shadow-md w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Clone of the first set that appears when the first set is scrolling out */}
              <motion.div
                className="absolute w-full"
                animate={controls}
                style={{
                  y: 0,
                  translateY: `${collegeImages.length * imageHeight}px`, // Position this set right after the first set
                }}
              >
                {collegeImages.map((image, index) => (
                  <div
                    key={`clone-${index}`}
                    className="w-full"
                    style={{
                      height: `${imageHeight}px`,
                    }}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`College Image ${index + 1} (clone)`}
                      className="rounded-lg shadow-md w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* We add the first image again at the end to create a perfect loop */}
                <div
                  className="w-full"
                  style={{
                    height: `${imageHeight}px`,
                  }}
                >
                  <img
                    src={collegeImages[0] || "/placeholder.svg"}
                    alt="College Image 1 (repeated clone)"
                    className="rounded-lg shadow-md w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Increased column width from md:grid-cols-2 (6 columns) to md:col-span-7 (7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center md:col-span-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to CollegeEase</h3>
            <p className="text-lg text-gray-600 mb-6 text-justify">
              CollegeEase is your trusted companion in navigating the world of higher education. We simplify the often
              overwhelming process of choosing the right college, applying for admission, and finding scholarships—all
              in one place. Our platform offers clear guidance, expert insights, and updated resources to help students
              make informed decisions about their academic future.
            </p>
            <p className="text-lg text-gray-600 mb-6 text-justify">
              Whether you're a high school senior or planning to continue your education, CollegeEase ensures you have
              the support you need to move forward with confidence. We also connect students with real success stories,
              financial aid, and personalized support to turn dreams into achievable goals...
              
            <a href="/about-us" className="text-blue-600 hover:text-blue-800 italic underline">
              Learn More
            </a>
            </p>
            
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPreview
