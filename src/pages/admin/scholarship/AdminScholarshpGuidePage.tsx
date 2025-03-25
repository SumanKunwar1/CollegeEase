"use client";

import type React from "react";

import { useState } from "react";
import {
  CheckCircle,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";

// Define types
type GuideItem = {
  id: string;
  title: string;
  items: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const AdminScholarshipApplicationGuides: React.FC = () => {
  // State for expanded sections
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // State for guides and FAQs
  const [guides, setGuides] = useState<GuideItem[]>([
    {
      id: "preparation",
      title: "Preparation Checklist",
      items: [
        "Gather academic transcripts",
        "Prepare standardized test scores",
        "Update resume/CV",
        "Draft personal statement",
        "Identify potential references",
      ],
    },
    {
      id: "writing",
      title: "Writing Tips",
      items: [
        "Start early and give yourself time to revise",
        "Be specific and use concrete examples",
        "Address the prompt directly",
        "Show, don't tell",
        "Proofread carefully",
      ],
    },
    {
      id: "documents",
      title: "Required Documents",
      items: [
        "Application form",
        "Academic transcripts",
        "Letters of recommendation",
        "Personal statement/Essay",
        "Financial documentation",
      ],
    },
  ]);

  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      question: "When should I start applying for scholarships?",
      answer:
        "Start applying for scholarships as early as possible, ideally 6-8 months before the academic year begins. Many scholarships have early deadlines, and starting early gives you time to prepare strong applications.",
    },
    {
      question: "How many scholarships should I apply for?",
      answer:
        "Apply for as many scholarships as you can reasonably handle while maintaining quality applications. A good target is 3-4 applications per week. Remember, it's a numbers game - the more you apply, the better your chances.",
    },
    {
      question: "What makes a strong scholarship essay?",
      answer:
        "A strong scholarship essay is personal, specific, and well-written. It should tell your unique story, demonstrate your achievements and aspirations, and clearly show why you deserve the scholarship.",
    },
  ]);

  // State for PDF guide link
  const [, setPdfGuideLink] = useState<string>("");

  // State for editing
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);
  const [editingGuideTitle, setEditingGuideTitle] = useState<string>("");
  const [editingGuideItemIndex, setEditingGuideItemIndex] = useState<
    number | null
  >(null);
  const [editingGuideItemText, setEditingGuideItemText] = useState<string>("");

  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [editingFaqQuestion, setEditingFaqQuestion] = useState<string>("");
  const [editingFaqAnswer, setEditingFaqAnswer] = useState<string>("");

  // State for adding new items
  const [isAddingGuide, setIsAddingGuide] = useState<boolean>(false);
  const [newGuideTitle, setNewGuideTitle] = useState<string>("");
  const [newGuideId, setNewGuideId] = useState<string>("");

  const [isAddingGuideItem, setIsAddingGuideItem] = useState<boolean>(false);
  const [addingGuideItemToId, setAddingGuideItemToId] = useState<string | null>(
    null
  );
  const [newGuideItem, setNewGuideItem] = useState<string>("");

  const [isAddingFaq, setIsAddingFaq] = useState<boolean>(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState<string>("");
  const [newFaqAnswer, setNewFaqAnswer] = useState<string>("");

  // State for PDF guide dialog
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState<boolean>(false);
  const [pdfLink, setPdfLink] = useState<string>("");

  // State for tracking changes
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Handler functions
  const handleEditGuideTitle = (id: string, title: string) => {
    setEditingGuideId(id);
    setEditingGuideTitle(title);
  };

  const saveGuideTitle = () => {
    if (editingGuideId && editingGuideTitle.trim()) {
      setGuides(
        guides.map((guide) =>
          guide.id === editingGuideId
            ? { ...guide, title: editingGuideTitle }
            : guide
        )
      );
      setEditingGuideId(null);
      setEditingGuideTitle("");
      setHasChanges(true);
    }
  };

  const handleEditGuideItem = (
    guideId: string,
    index: number,
    text: string
  ) => {
    setEditingGuideId(guideId);
    setEditingGuideItemIndex(index);
    setEditingGuideItemText(text);
  };

  const saveGuideItem = () => {
    if (
      editingGuideId &&
      editingGuideItemIndex !== null &&
      editingGuideItemText.trim()
    ) {
      setGuides(
        guides.map((guide) =>
          guide.id === editingGuideId
            ? {
                ...guide,
                items: guide.items.map((item, i) =>
                  i === editingGuideItemIndex ? editingGuideItemText : item
                ),
              }
            : guide
        )
      );
      setEditingGuideId(null);
      setEditingGuideItemIndex(null);
      setEditingGuideItemText("");
      setHasChanges(true);
    }
  };

  const handleDeleteGuideItem = (guideId: string, index: number) => {
    setGuides(
      guides.map((guide) =>
        guide.id === guideId
          ? {
              ...guide,
              items: guide.items.filter((_, i) => i !== index),
            }
          : guide
      )
    );
    setHasChanges(true);
  };

  const handleAddGuideItem = () => {
    if (addingGuideItemToId && newGuideItem.trim()) {
      setGuides(
        guides.map((guide) =>
          guide.id === addingGuideItemToId
            ? { ...guide, items: [...guide.items, newGuideItem] }
            : guide
        )
      );
      setIsAddingGuideItem(false);
      setAddingGuideItemToId(null);
      setNewGuideItem("");
      setHasChanges(true);
    }
  };

  const handleAddGuide = () => {
    if (newGuideTitle.trim() && newGuideId.trim()) {
      setGuides([
        ...guides,
        { id: newGuideId, title: newGuideTitle, items: [] },
      ]);
      setIsAddingGuide(false);
      setNewGuideTitle("");
      setNewGuideId("");
      setHasChanges(true);
    }
  };

  const handleDeleteGuide = (id: string) => {
    setGuides(guides.filter((guide) => guide.id !== id));
    setHasChanges(true);
  };

  const handleEditFaq = (index: number, question: string, answer: string) => {
    setEditingFaqIndex(index);
    setEditingFaqQuestion(question);
    setEditingFaqAnswer(answer);
  };

  const saveFaq = () => {
    if (
      editingFaqIndex !== null &&
      editingFaqQuestion.trim() &&
      editingFaqAnswer.trim()
    ) {
      setFaqs(
        faqs.map((faq, i) =>
          i === editingFaqIndex
            ? { question: editingFaqQuestion, answer: editingFaqAnswer }
            : faq
        )
      );
      setEditingFaqIndex(null);
      setEditingFaqQuestion("");
      setEditingFaqAnswer("");
      setHasChanges(true);
    }
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleAddFaq = () => {
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      setFaqs([...faqs, { question: newFaqQuestion, answer: newFaqAnswer }]);
      setIsAddingFaq(false);
      setNewFaqQuestion("");
      setNewFaqAnswer("");
      setHasChanges(true);
    }
  };

  const handleSavePdfLink = () => {
    setPdfGuideLink(pdfLink);
    setIsPdfDialogOpen(false);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // In a real application, this would save to a database
    alert("Changes saved successfully!");
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Scholarship Application Guide
          </h1>
          <p className="mt-2 text-gray-600">
            Edit and manage the scholarship application guide content
          </p>
        </div>

        <div className="mb-6 flex justify-end">
          <Button
            onClick={() => setIsAddingGuide(true)}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Section
          </Button>
        </div>

        <div className="space-y-8">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 flex items-center justify-between bg-gray-50">
                <div className="flex-1 flex items-center">
                  {editingGuideId === guide.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        value={editingGuideTitle}
                        onChange={(e) => setEditingGuideTitle(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={saveGuideTitle}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingGuideId(null);
                          setEditingGuideTitle("");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <h2 className="text-lg font-semibold text-gray-900">
                      {guide.title}
                    </h2>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditGuideTitle(guide.id, guide.title)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteGuide(guide.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === guide.id ? null : guide.id
                      )
                    }
                    className="h-8 w-8 p-0"
                  >
                    {expandedSection === guide.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedSection === guide.id && (
                <div className="px-6 py-4">
                  <div className="flex justify-end mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsAddingGuideItem(true);
                        setAddingGuideItemToId(guide.id);
                      }}
                      className="flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>

                  {isAddingGuideItem && addingGuideItemToId === guide.id && (
                    <div className="mb-4 flex items-center gap-2">
                      <Input
                        value={newGuideItem}
                        onChange={(e) => setNewGuideItem(e.target.value)}
                        placeholder="Enter new item"
                        className="flex-1"
                      />
                      <Button size="sm" onClick={handleAddGuideItem}>
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsAddingGuideItem(false);
                          setAddingGuideItemToId(null);
                          setNewGuideItem("");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <ul className="space-y-4">
                    {guide.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 group"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />

                        {editingGuideId === guide.id &&
                        editingGuideItemIndex === index ? (
                          <div className="flex-1 flex items-center gap-2">
                            <Input
                              value={editingGuideItemText}
                              onChange={(e) =>
                                setEditingGuideItemText(e.target.value)
                              }
                              className="flex-1"
                            />
                            <Button size="sm" onClick={saveGuideItem}>
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingGuideId(null);
                                setEditingGuideItemIndex(null);
                                setEditingGuideItemText("");
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <span className="text-gray-600 flex-1">{item}</span>
                            <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleEditGuideItem(guide.id, index, item)
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteGuideItem(guide.id, index)
                                }
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Frequently Asked Questions
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingFaq(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </div>

            {isAddingFaq && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Add New FAQ</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="newQuestion">Question</Label>
                    <Input
                      id="newQuestion"
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      placeholder="Enter question"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newAnswer">Answer</Label>
                    <Textarea
                      id="newAnswer"
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                      placeholder="Enter answer"
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingFaq(false);
                        setNewFaqQuestion("");
                        setNewFaqAnswer("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddFaq}>Add FAQ</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 group"
                >
                  {editingFaqIndex === index ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`question-${index}`}>Question</Label>
                        <Input
                          id={`question-${index}`}
                          value={editingFaqQuestion}
                          onChange={(e) =>
                            setEditingFaqQuestion(e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`answer-${index}`}>Answer</Label>
                        <Textarea
                          id={`answer-${index}`}
                          value={editingFaqAnswer}
                          onChange={(e) => setEditingFaqAnswer(e.target.value)}
                          className="mt-1 min-h-[100px]"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingFaqIndex(null);
                            setEditingFaqQuestion("");
                            setEditingFaqAnswer("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={saveFaq}>Save Changes</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3">
                      <HelpCircle className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">
                            {faq.question}
                          </h3>
                          <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleEditFaq(index, faq.question, faq.answer)
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteFaq(index)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  Download Complete Guide
                </h3>
                <p className="mt-1 text-gray-600">
                  Get our comprehensive PDF guide with detailed tips, templates,
                  and examples
                </p>
                <div className="mt-4 flex gap-2">
                  <Button>Download PDF Guide</Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsPdfDialogOpen(true)}
                  >
                    Change PDF Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-lg"
          >
            <Save className="h-5 w-5 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Add Guide Dialog */}
      <Dialog open={isAddingGuide} onOpenChange={setIsAddingGuide}>
        <DialogContent className="sm:max-w-[500px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="guideId">Section ID (no spaces)</Label>
              <Input
                id="guideId"
                value={newGuideId}
                onChange={(e) =>
                  setNewGuideId(
                    e.target.value.replace(/\s+/g, "-").toLowerCase()
                  )
                }
                placeholder="e.g. interview-tips"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="guideTitle">Section Title</Label>
              <Input
                id="guideTitle"
                value={newGuideTitle}
                onChange={(e) => setNewGuideTitle(e.target.value)}
                placeholder="e.g. Interview Tips"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingGuide(false);
                setNewGuideId("");
                setNewGuideTitle("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddGuide}>Add Section</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Link Dialog */}
      <Dialog open={isPdfDialogOpen} onOpenChange={setIsPdfDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Update PDF Guide Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="pdfLink">PDF URL</Label>
              <Input
                id="pdfLink"
                value={pdfLink}
                onChange={(e) => setPdfLink(e.target.value)}
                placeholder="Enter PDF URL"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsPdfDialogOpen(false);
                setPdfLink("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePdfLink}>Save Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminScholarshipApplicationGuides;
