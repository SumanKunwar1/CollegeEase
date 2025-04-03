"use client"

import { useState } from "react"
import { Quote, Award, ArrowRight, Pencil, Trash, Plus, X, Save } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Card, CardContent, CardHeader } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog"

// Define the Story type
interface Story {
  id: number
  name: string
  scholarship: string
  amount: string
  university: string
  image: string
  quote: string
  tips: string[]
}

export default function AdminSuccessStories() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      name: "Sarah Chen",
      scholarship: "Global Merit Scholarship",
      amount: "$25,000",
      university: "Stanford University",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      quote:
        "The scholarship application process seemed daunting at first, but with persistence and the right guidance, I was able to secure funding for my dream university.",
      tips: ["Start applications early", "Personalize each application", "Get multiple people to review your essays"],
    },
    {
      id: 2,
      name: "James Rodriguez",
      scholarship: "STEM Excellence Award",
      amount: "$15,000",
      university: "MIT",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      quote:
        "I almost didn't apply thinking my chances were low. But I took the chance, and it changed my entire academic journey.",
      tips: ["Don't self-reject", "Highlight unique experiences", "Follow up with recommenders"],
    },
  ])

  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [newStory, setNewStory] = useState<Omit<Story, "id">>({
    name: "",
    scholarship: "",
    amount: "",
    university: "",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "",
    tips: ["", "", ""],
  })
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleAddStory = () => {
    const id = stories.length > 0 ? Math.max(...stories.map((story) => story.id)) + 1 : 1
    setStories([...stories, { ...newStory, id }])
    setNewStory({
      name: "",
      scholarship: "",
      amount: "",
      university: "",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      quote: "",
      tips: ["", "", ""],
    })
    setIsAddDialogOpen(false)
  }

  const handleEditStory = (story: Story) => {
    setEditingStory({ ...story })
  }

  const handleSaveEdit = () => {
    if (editingStory) {
      setStories(stories.map((story) => (story.id === editingStory.id ? editingStory : story)))
      setEditingStory(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingStory(null)
  }

  const handleDeleteStory = (story: Story) => {
    setStoryToDelete(story)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (storyToDelete) {
      setStories(stories.filter((story) => story.id !== storyToDelete.id))
      setIsDeleteDialogOpen(false)
      setStoryToDelete(null)
    }
  }

  const handleTipChange = (index: number, value: string, isEditing: boolean) => {
    if (isEditing && editingStory) {
      const updatedTips = [...editingStory.tips]
      updatedTips[index] = value
      setEditingStory({ ...editingStory, tips: updatedTips })
    } else {
      const updatedTips = [...newStory.tips]
      updatedTips[index] = value
      setNewStory({ ...newStory, tips: updatedTips })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Success Stories</h1>
            <p className="mt-2 text-gray-600">Add, edit, or remove success stories</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Success Story</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Student Name</Label>
                    <Input
                      id="name"
                      value={newStory.name}
                      onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={newStory.university}
                      onChange={(e) => setNewStory({ ...newStory, university: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scholarship">Scholarship Name</Label>
                    <Input
                      id="scholarship"
                      value={newStory.scholarship}
                      onChange={(e) => setNewStory({ ...newStory, scholarship: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      value={newStory.amount}
                      onChange={(e) => setNewStory({ ...newStory, amount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Profile Image URL</Label>
                  <Input
                    id="image"
                    value={newStory.image}
                    onChange={(e) => setNewStory({ ...newStory, image: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote">Quote</Label>
                  <Textarea
                    id="quote"
                    value={newStory.quote}
                    onChange={(e) => setNewStory({ ...newStory, quote: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tips (3)</Label>
                  {newStory.tips.map((tip, index) => (
                    <Input
                      key={index}
                      value={tip}
                      placeholder={`Tip ${index + 1}`}
                      onChange={(e) => handleTipChange(index, e.target.value, false)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStory}>Add Story</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8 lg:grid-cols-1 mb-12">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              {editingStory && editingStory.id === story.id ? (
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Story</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Student Name</Label>
                        <Input
                          id="edit-name"
                          value={editingStory.name}
                          onChange={(e) => setEditingStory({ ...editingStory, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-university">University</Label>
                        <Input
                          id="edit-university"
                          value={editingStory.university}
                          onChange={(e) => setEditingStory({ ...editingStory, university: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-scholarship">Scholarship Name</Label>
                        <Input
                          id="edit-scholarship"
                          value={editingStory.scholarship}
                          onChange={(e) => setEditingStory({ ...editingStory, scholarship: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-amount">Amount</Label>
                        <Input
                          id="edit-amount"
                          value={editingStory.amount}
                          onChange={(e) => setEditingStory({ ...editingStory, amount: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-image">Profile Image URL</Label>
                      <Input
                        id="edit-image"
                        value={editingStory.image}
                        onChange={(e) => setEditingStory({ ...editingStory, image: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-quote">Quote</Label>
                      <Textarea
                        id="edit-quote"
                        value={editingStory.quote}
                        onChange={(e) => setEditingStory({ ...editingStory, quote: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tips (3)</Label>
                      {editingStory.tips.map((tip, index) => (
                        <Input
                          key={index}
                          value={tip}
                          placeholder={`Tip ${index + 1}`}
                          onChange={(e) => handleTipChange(index, e.target.value, true)}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardHeader className="bg-gray-50 p-4 flex flex-row justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">{story.name}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditStory(story)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteStory(story)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-gray-600">{story.university}</p>
                        <div className="flex items-start space-x-3 mt-2">
                          <Award className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900">{story.scholarship}</p>
                            <p className="text-indigo-600 font-semibold">{story.amount}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex space-x-3">
                        <Quote className="h-8 w-8 text-indigo-500 flex-shrink-0" />
                        <p className="text-gray-600 italic">{story.quote}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Top Tips from {story.name.split(" ")[0]}</h3>
                      <ul className="space-y-2">
                        {story.tips.map((tip, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-600">
                            <ArrowRight className="h-4 w-4 text-indigo-500" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the success story from {storyToDelete?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

