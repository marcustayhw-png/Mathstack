"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Loader2, Plus, Edit, Trash2, X, FileText, ExternalLink,
  ChevronRight, ArrowLeft, BookOpen, FlaskConical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LEVEL_LABELS, type Level, type Subject } from "@/app/notes/syllabus-data";

type DbChapter = { id: string; title: string; strand: string };

type ContentType = "notes" | "practice";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  level: string;
  subject: string;
  chapter_id: string;
  chapter_title: string;
  pdf_url: string | null;
  created_at: string;
}

type ViewStep = "level" | "subject" | "chapter" | "list";

const LEVELS: { id: Level; label: string }[] = [
  { id: "sec1", label: "Secondary 1" },
  { id: "sec2", label: "Secondary 2" },
  { id: "sec34", label: "Secondary 3 – 4" },
];

function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ms_admin_token");
}

export function ContentManager({ type }: { type: ContentType }) {
  const apiPath = type === "notes" ? "/api/admin/notes" : "/api/admin/practice";
  const itemLabel = type === "notes" ? "Note" : "Practice Set";
  const Icon = type === "notes" ? BookOpen : FlaskConical;

  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Drill-down state
  const [viewStep, setViewStep] = useState<ViewStep>("level");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | "only" | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<{ id: string; title: string } | null>(null);

  // Dynamic chapters from DB
  const [dbChapters, setDbChapters] = useState<DbChapter[]>([]);
  const [chaptersLoading, setChaptersLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pdf_url: "",
  });

  const fetchItems = useCallback(async () => {
    if (!selectedLevel || !selectedSubject || !selectedChapter) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        level: selectedLevel,
        subject: selectedSubject,
        chapter_id: selectedChapter.id,
      });
      const res = await fetch(`${apiPath}?${params}`, {
        headers: { "x-admin-token": getAdminToken() || "" },
      });
      if (res.ok) {
        setItems(await res.json());
      } else {
        toast.error(`Failed to load ${type}`);
      }
    } catch {
      toast.error(`Error loading ${type}`);
    } finally {
      setIsLoading(false);
    }
  }, [selectedLevel, selectedSubject, selectedChapter, apiPath, type]);

  useEffect(() => {
    if (viewStep === "list") fetchItems();
  }, [viewStep, fetchItems]);

  // Fetch chapters from DB when level+subject is selected
  useEffect(() => {
    if (!selectedLevel || !selectedSubject) { setDbChapters([]); return; }
    setChaptersLoading(true);
    const params = new URLSearchParams({ level: selectedLevel, subject: selectedSubject });
    fetch(`/api/admin/chapters?${params}`, { headers: { "x-admin-token": getAdminToken() || "" } })
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setDbChapters(data))
      .catch(() => setDbChapters([]))
      .finally(() => setChaptersLoading(false));
  }, [selectedLevel, selectedSubject]);

  const resetForm = () => {
    setFormData({ title: "", description: "", pdf_url: "" });
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddNew = () => {
    setFormData({ title: "", description: "", pdf_url: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (item: ContentItem) => {
    setFormData({ title: item.title, description: item.description, pdf_url: item.pdf_url || "" });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Only PDFs allowed"); return; }
    if (file.size > 20 * 1024 * 1024) { toast.error("File must be < 20MB"); return; }

    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-token": getAdminToken() || "" },
        body: fd,
      });
      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, pdf_url: data.fileUrl }));
        toast.success("PDF uploaded");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const err = await res.json();
        toast.error(err.error || "Upload failed");
      }
    } catch {
      toast.error("Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLevel || !selectedSubject || !selectedChapter) return;
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      level: selectedLevel,
      subject: selectedSubject,
      chapter_id: selectedChapter.id,
      chapter_title: selectedChapter.title,
      pdf_url: formData.pdf_url || null,
    };

    try {
      const url = editingId ? `${apiPath}?id=${editingId}` : apiPath;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": getAdminToken() || "" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(`${itemLabel} ${editingId ? "updated" : "created"}`);
        fetchItems();
        resetForm();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save");
      }
    } catch {
      toast.error("Error saving");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${apiPath}?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": getAdminToken() || "" },
      });
      if (res.ok) {
        toast.success(`${itemLabel} deleted`);
        fetchItems();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Delete error");
    }
  };

  // Use DB chapters
  const chaptersForStep = dbChapters;

  // Breadcrumb
  const BreadCrumb = () => (
    <div className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap mb-4">
      <button className="hover:text-foreground font-medium transition-colors" onClick={() => { setViewStep("level"); setSelectedLevel(null); setSelectedSubject(null); setSelectedChapter(null); }}>
        All
      </button>
      {selectedLevel && (
        <>
          <ChevronRight className="w-3.5 h-3.5" />
          <button className="hover:text-foreground font-medium transition-colors" onClick={() => {
            if (selectedLevel === "sec34") { setViewStep("subject"); setSelectedSubject(null); setSelectedChapter(null); }
            else { setViewStep("chapter"); setSelectedSubject(null); setSelectedChapter(null); }
          }}>
            {LEVEL_LABELS[selectedLevel]}
          </button>
        </>
      )}
      {selectedSubject && selectedSubject !== "only" && (
        <>
          <ChevronRight className="w-3.5 h-3.5" />
          <button className="hover:text-foreground font-medium transition-colors" onClick={() => { setViewStep("chapter"); setSelectedChapter(null); }}>
            {selectedSubject}
          </button>
        </>
      )}
      {selectedChapter && (
        <>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-semibold truncate max-w-[180px]">{selectedChapter.title}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {itemLabel}?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone. The {itemLabel.toLowerCase()} will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { if (deleteId) { handleDelete(deleteId); setDeleteId(null); } }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {!showForm && (
        <div>
          <BreadCrumb />

          <AnimatePresence mode="wait">
            {/* Step 1: Level */}
            {viewStep === "level" && (
              <motion.div key="level" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {LEVELS.map((lvl) => (
                  <Card key={lvl.id} className="hover:border-primary cursor-pointer transition-all"
                    onClick={() => {
                      setSelectedLevel(lvl.id);
                      if (lvl.id === "sec34") { setViewStep("subject"); }
                      else { setSelectedSubject("only"); setViewStep("chapter"); }
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-bold">{lvl.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lvl.id === "sec34" ? "E Math / A Math" : "E Math"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Step 2: Subject (Sec 3–4 only) */}
            {viewStep === "subject" && (
              <motion.div key="subject" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {(["E Math", "A Math"] as Subject[]).map((sub) => (
                  <Card key={sub} className="hover:border-primary cursor-pointer transition-all"
                    onClick={() => { setSelectedSubject(sub); setViewStep("chapter"); }}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold">{sub}</h3>
                      <Badge variant="secondary" className="mt-2">{sub === "E Math" ? "4048" : "4049"}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Step 3: Chapter */}
            {viewStep === "chapter" && (
              <motion.div key="chapter" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                {chaptersLoading && (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                )}
                {!chaptersLoading && chaptersForStep.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">No chapters found. Add chapters in the Chapters tab first.</p>
                )}
                {!chaptersLoading && chaptersForStep.map((ch) => (
                  <Button key={ch.id} variant="outline" className="w-full h-auto py-3 px-4 justify-between text-left hover:border-primary group"
                    onClick={() => { setSelectedChapter({ id: ch.id, title: ch.title }); setViewStep("list"); }}
                  >
                    <div>
                      <span className="font-semibold">{ch.title}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{ch.strand}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                ))}
              </motion.div>
            )}

            {/* Step 4: List */}
            {viewStep === "list" && (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border border-border">
                  <div>
                    <h3 className="font-bold">{selectedChapter?.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {selectedLevel && LEVEL_LABELS[selectedLevel]}
                      {selectedSubject && selectedSubject !== "only" && ` · ${selectedSubject}`}
                    </p>
                  </div>
                  <Button onClick={handleAddNew} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add {itemLabel}
                  </Button>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : items.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                    <Icon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No {type} yet for this chapter.</p>
                    <Button variant="link" onClick={handleAddNew} className="mt-1">Add the first one</Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <Card key={item.id} className="hover:border-primary/50 transition-colors">
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <p className="font-bold">{item.title}</p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                            )}
                            <div className="flex gap-2 flex-wrap">
                              {item.pdf_url ? (
                                <a href={item.pdf_url} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                                >
                                  <FileText className="w-3 h-3" />
                                  View PDF
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <Badge variant="outline" className="text-xs text-muted-foreground">No PDF</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" onClick={() => handleEdit(item)} className="hover:text-primary">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => setDeleteId(item.id)} className="hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}

                <Button variant="ghost" className="w-full" onClick={() => { setViewStep("chapter"); setSelectedChapter(null); }}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Chapters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{editingId ? `Edit ${itemLabel}` : `Add New ${itemLabel}`}</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {selectedChapter?.title} · {selectedLevel && LEVEL_LABELS[selectedLevel]}
                  {selectedSubject && selectedSubject !== "only" && ` · ${selectedSubject}`}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={type === "notes" ? "e.g., Pythagoras' Theorem Notes" : "e.g., Pythagoras Practice Paper 1"}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the content"
                  rows={3}
                />
              </div>

              <div>
                <Label>PDF File</Label>
                <div className="space-y-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </div>
                  )}
                  {formData.pdf_url && !isUploading && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-muted-foreground truncate flex-1">PDF uploaded</span>
                      <a href={formData.pdf_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        Preview <ExternalLink className="w-3 h-3" />
                      </a>
                      <button type="button" onClick={() => setFormData({ ...formData, pdf_url: "" })} className="text-destructive hover:underline text-xs">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={isSubmitting || isUploading}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingId ? "Update" : "Create"} {itemLabel}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
