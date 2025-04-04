"use client"

import { useState, useEffect } from "react"
import { Search, Filter, DollarSign, Heart, Users, TrendingUp, Trash2 } from "lucide-react"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

interface DonationProfile {
  _id: string
  studentName: string
  financialNeeds: string
  academicHistory: string
  goals: string
  raised: number
  goal: number
  image: string
  story?: string
}

interface ApiError {
  message?: string
  status?: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const AdminStudentProfiles = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [majorFilter, setMajorFilter] = useState("")
  const [countryFilter, setCountryFilter] = useState("")
  const [editingStudent, setEditingStudent] = useState<DonationProfile | null>(null)
  const [newStudent, setNewStudent] = useState<Omit<DonationProfile, '_id'>>({
    studentName: "",
    financialNeeds: "",
    academicHistory: "",
    goals: "",
    raised: 0,
    goal: 0,
    image: "",
  })
  const [students, setStudents] = useState<DonationProfile[]>([])
  const [loading, setLoading] = useState(false)

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/student-profiles`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setStudents(data.data || data)
    } catch (error) {
      console.error("Error fetching students:", error)
      toast.error("Failed to load student profiles")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleEdit = (student: DonationProfile) => {
    setEditingStudent(student)
  }

  const handleSave = async () => {
    if (!editingStudent) return

    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/student-profiles/${editingStudent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingStudent),
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.message || "Failed to update student")
      }

      toast.success("Student updated successfully")
      fetchStudents()
      setEditingStudent(null)
    } catch (err) {
      const error = err as Error
      console.error("Error updating student:", error)
      toast.error(error.message || "Failed to update student")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/student-profiles/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.message || "Failed to delete student")
      }

      toast.success("Student deleted successfully")
      fetchStudents()
    } catch (err) {
      const error = err as Error
      console.error("Error deleting student:", error)
      toast.error(error.message || "Failed to delete student")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/student-profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.message || "Failed to add student")
      }

      toast.success("Student added successfully")
      fetchStudents()
      setNewStudent({
        studentName: "",
        financialNeeds: "",
        academicHistory: "",
        goals: "",
        raised: 0,
        goal: 0,
        image: "",
      })
    } catch (err) {
      const error = err as Error
      console.error("Error adding student:", error)
      toast.error(error.message || "Failed to add student")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>, setImage: (image: string) => void) => {
    setImage(event.target.value)
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMajor = majorFilter ? student.academicHistory === majorFilter : true
    const matchesCountry = countryFilter ? student.financialNeeds === countryFilter : true
    return matchesSearch && matchesMajor && matchesCountry
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Support Student Dreams</h1>
          <p className="mt-4 text-lg text-gray-600">
            Help students achieve their educational goals through direct support
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Heart, value: students.length.toString(), label: "Students Supported" },
            { icon: DollarSign, value: `$${students.reduce((acc, curr) => acc + curr.raised, 0).toLocaleString()}`, label: "Total Donations" },
            { icon: Users, value: "5,678", label: "Active Donors" },
            { icon: TrendingUp, value: "89%", label: "Success Rate" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search students..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={majorFilter} onValueChange={setMajorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Field of Study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => navigate(`/admin/donate/donation-form`)} className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p>Loading...</p>
          </div>
        )}

        {/* Student Profiles Section */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((profile) => (
            <div
              key={profile._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={profile.image || "/placeholder.svg"}
                alt={profile.studentName}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg"
                }}
              />
              <div className="p-6">
                {editingStudent?._id === profile._id ? (
                  <div className="space-y-3">
                    <Input
                      type="text"
                      value={editingStudent.studentName}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          studentName: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="text"
                      value={editingStudent.financialNeeds}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          financialNeeds: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="text"
                      value={editingStudent.academicHistory}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          academicHistory: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="text"
                      value={editingStudent.goals}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          goals: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="number"
                      value={editingStudent.raised}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          raised: Number.parseFloat(e.target.value),
                        })
                      }
                    />
                    <Input
                      type="number"
                      value={editingStudent.goal}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          goal: Number.parseFloat(e.target.value),
                        })
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Image URL"
                      value={editingStudent.image}
                      onChange={(e) =>
                        handleImageUrlChange(e, (image) => setEditingStudent({ ...editingStudent, image }))
                      }
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} disabled={loading}>
                        Save Update
                      </Button>
                      <Button variant="outline" onClick={() => setEditingStudent(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{profile.studentName}</h3>
                    <p className="mt-2 text-gray-600">{profile.financialNeeds}</p>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Academic History: {profile.academicHistory}</p>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Goal: {profile.goals}</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Raised: ${profile.raised.toLocaleString()}</span>
                        <span>Goal: ${profile.goal.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min((profile.raised / profile.goal) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                        onClick={() => navigate(`/admin/donate/donation-form/${profile._id}`)}
                      >
                        <Heart className="h-4 w-4 mr-2" /> Support {profile.studentName}
                      </button>

                      <div className="flex gap-2">
                        <button
                          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                          onClick={() => handleEdit(profile)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                          onClick={() => handleDelete(profile._id)}
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Student Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Student</h2>
          <div className="grid grid-cols-1 gap-4">
            <Input
              type="text"
              placeholder="Student Name"
              value={newStudent.studentName}
              onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Financial Needs"
              value={newStudent.financialNeeds}
              onChange={(e) => setNewStudent({ ...newStudent, financialNeeds: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Academic History"
              value={newStudent.academicHistory}
              onChange={(e) => setNewStudent({ ...newStudent, academicHistory: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Goals"
              value={newStudent.goals}
              onChange={(e) => setNewStudent({ ...newStudent, goals: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Raised"
              value={newStudent.raised}
              onChange={(e) => setNewStudent({ ...newStudent, raised: Number.parseFloat(e.target.value) || 0 })}
            />
            <Input
              type="number"
              placeholder="Goal"
              value={newStudent.goal}
              onChange={(e) => setNewStudent({ ...newStudent, goal: Number.parseFloat(e.target.value) || 0 })}
            />
            <Input
              type="text"
              placeholder="Image URL"
              value={newStudent.image}
              onChange={(e) => setNewStudent({ ...newStudent, image: e.target.value })}
            />
            <Button onClick={handleAdd} disabled={loading}>
              {loading ? 'Adding...' : 'Add Student'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStudentProfiles