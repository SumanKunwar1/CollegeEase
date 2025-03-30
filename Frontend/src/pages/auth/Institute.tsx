"use client"

import { Link, useLocation, useParams } from "react-router-dom"
import { LayoutDashboard, Star, UserPlus, FileText, Landmark } from "lucide-react"
import { Overview } from "./dashboard/institute/Overview"
import { Reviews } from "./dashboard/institute/Review"
import { Admissions } from "./dashboard/institute/Admission"
import { Applications } from "./dashboard/institute/Application"
import AboutInstitute from "./dashboard/institute/AboutInstitute"

const navigation = [
  { name: "Overview", href: "", icon: LayoutDashboard },
  { name: "About Institute", href: "about-institute", icon: Landmark },
  { name: "Reviews", href: "reviews", icon: Star },
  { name: "Admissions", href: "admissions", icon: UserPlus },
  { name: "Applications", href: "applications", icon: FileText },
]

export function InstituteDashboard() {
  const location = useLocation()
  const { organizationName } = useParams<{ organizationName: string }>()
  const currentPath = location.pathname.split("/").pop()

  // We've removed the unused selectedCollege variable
  // If you need college data for other purposes, you can still keep this:
  // const college = collegesData.find(
  //   (college) => college.name.toLowerCase() === organizationName?.toLowerCase()
  // );

  const renderContent = () => {
    switch (currentPath) {
      case "about-institute":
        return <AboutInstitute />
      case "reviews":
        return <Reviews />
      case "admissions":
        return <Admissions />
      case "applications":
        return <Applications />
      default:
        return <Overview />
    }
  }

  return (
    <div className="min-h-screen">
      {/* Sticky Navigation */}
      <div className="mb-8 border-b">
        <nav className="flex space-x-8">
          {navigation.map((item) => {
            const isActive = currentPath === item.href || (!currentPath && !item.href)

            return (
              <Link
                key={item.name}
                to={`/dashboard/institute/${organizationName}${item.href ? `/${item.href}` : ""}`}
                className={`
                  flex items-center px-1 py-4 text-sm font-medium border-b-2
                   ${
                     isActive
                       ? "border-blue-500 text-blue-600"
                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                   }
                 `}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Content Area */}
      <div className="py-4">{renderContent()}</div>
    </div>
  )
}

export default InstituteDashboard

