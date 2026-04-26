"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Loader2, Plus, Edit, Trash2, X, ChevronRight, ArrowLeft,
  RefreshCw, GripVertical, Save,
} from "lucide-react";
import { motion, AnimatePresence, Reorder, useDragControls } from "framer-motion";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LEVEL_LABELS, type Level, type Subject } from "@/app/notes/syllabus-data";
import { cn } from "@/lib/utils";

type DbChapter = {
  id: string;
  level: string;
  subject: string;
  code: string;
  strand: string;
  title: string;
  description: string;
  sort_order: number;
};

type ViewStep = "level" | "subject" | "list";

const LEVELS: { id: Level; label: string }[] = [
  { id: "sec1", label: "Secondary 1" },
  { id: "sec2", label: "Secondary 2" },
  { id: "sec34", label: "Secondary 3 – 4" },
];

const STRANDS_BY_SUBJECT: Record<string, string[]> = {
  only: ["Number & Algebra", "Geometry & Measurement", "Statistics & Probability"],
  "E Math": ["Number & Algebra", "Geometry & Measurement", "Statistics & Probability"],
  "A Math": ["Algebra", "Geometry & Trigonometry", "Calculus"],
};


const STRAND_COLORS: Record<string, string> = {
  "Number & Algebra": "text-blue-600",
  "Geometry & Measurement": "text-purple-600",
  "Statistics & Probability": "text-orange-600",
  "Algebra": "text-emerald-600",
  "Geometry & Trigonometry": "text-pink-600",
  "Calculus": "text-red-600",
};

function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ms_admin_token");
}

function ChapterRow({
  ch,
  onEdit,
  onDelete,
}: {
  ch: DbChapter;
  onEdit: (ch: DbChapter) => void;
  onDelete: (id: string) => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={ch}
      dragListener={false}
      dragControls={controls}
      className="list-none"
    >
      <Card className="hover:border-primary/50 transition-colors select-none">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <button
              className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors shrink-0 touch-none"
              onPointerDown={(e) => controls.start(e)}
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3 flex-1">
              <span className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                {ch.code}
              </span>
              <div className="space-y-0.5 flex-1">
                <p className="font-bold leading-snug">{ch.title}</p>
                <p className={cn("text-xs font-medium", STRAND_COLORS[ch.strand] ?? "text-muted-foreground")}>
                  {ch.strand}
                </p>
                {ch.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{ch.description}</p>
                )}
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button size="icon" variant="ghost" onClick={() => onEdit(ch)} className="hover:text-primary">
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(ch.id)} className="hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reorder.Item>
  );
}

export function ChapterManager() {
  const [viewStep, setViewStep] = useState<ViewStep>("level");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const [chapters, setChapters] = useState<DbChapter[]>([]);
  const [savedOrder, setSavedOrder] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    strand: "",
    description: "",
    sort_order: 0,
  });

  const orderChanged = chapters.map((c) => c.id).join(",") !== savedOrder.join(",");

  const fetchChapters = useCallback(async () => {
    if (!selectedLevel || !selectedSubject) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ level: selectedLevel, subject: selectedSubject });
      const res = await fetch(`/api/admin/chapters?${params}`, {
        headers: { "x-admin-token": getAdminToken() || "" },
      });
      if (res.ok) {
        const data: DbChapter[] = await res.json();
        setChapters(data);
        setSavedOrder(data.map((c) => c.id));
      } else {
        toast.error("Failed to load chapters");
      }
    } catch {
      toast.error("Error loading chapters");
    } finally {
      setIsLoading(false);
    }
  }, [selectedLevel, selectedSubject]);

  useEffect(() => {
    if (viewStep === "list") fetchChapters();
  }, [viewStep, fetchChapters]);

  const resetForm = () => {
    setFormData({ title: "", code: "", strand: "", description: "", sort_order: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    const strands = STRANDS_BY_SUBJECT[selectedSubject || "only"] || [];
    setFormData({ title: "", code: "", strand: strands[0] || "", description: "", sort_order: chapters.length });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (ch: DbChapter) => {
    setFormData({ title: ch.title, code: ch.code, strand: ch.strand, description: ch.description, sort_order: ch.sort_order });
    setEditingId(ch.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLevel || !selectedSubject) return;
    setIsSubmitting(true);

    const payload = { level: selectedLevel, subject: selectedSubject, ...formData };

    try {
      const url = editingId ? `/api/admin/chapters?id=${editingId}` : "/api/admin/chapters";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": getAdminToken() || "" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(`Chapter ${editingId ? "updated" : "created"}`);
        fetchChapters();
        resetForm();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save");
      }
    } catch {
      toast.error("Error saving chapter");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/chapters?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": getAdminToken() || "" },
      });
      if (res.ok) {
        toast.success("Chapter deleted");
        fetchChapters();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Delete error");
    }
  };

  const handleSaveOrder = async () => {
    setIsSavingOrder(true);
    try {
      const updates = chapters.map((ch, index) => ({ id: ch.id, sort_order: index }));
      const res = await fetch("/api/admin/chapters", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": getAdminToken() || "" },
        body: JSON.stringify({ updates }),
      });
      if (res.ok) {
        toast.success("Chapter order saved");
        setSavedOrder(chapters.map((c) => c.id));
      } else {
        toast.error("Failed to save order");
      }
    } catch {
      toast.error("Error saving order");
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const res = await fetch("/api/admin/chapters/seed", {
        method: "POST",
        headers: { "x-admin-token": getAdminToken() || "" },
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(`Synced ${data.seeded} chapters from syllabus`);
        fetchChapters();
      } else {
        const err = await res.json();
        toast.error(err.error || "Seed failed");
      }
    } catch {
      toast.error("Seed error");
    } finally {
      setIsSeeding(false);
    }
  };

  const strands = STRANDS_BY_SUBJECT[selectedSubject || "only"] || [];

  const BreadCrumb = () => (
    <div className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap mb-4">
      <button
        className="hover:text-foreground font-medium transition-colors"
        onClick={() => { setViewStep("level"); setSelectedLevel(null); setSelectedSubject(null); }}
      >
        All
      </button>
      {selectedLevel && (
        <>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            className="hover:text-foreground font-medium transition-colors"
            onClick={() => {
              if (selectedLevel === "sec34") { setViewStep("subject"); setSelectedSubject(null); }
              else { setViewStep("list"); }
            }}
          >
            {LEVEL_LABELS[selectedLevel]}
          </button>
        </>
      )}
      {selectedSubject && selectedSubject !== "only" && (
        <>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-semibold">{selectedSubject}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chapter?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the chapter from the syllabus. Notes and practice content linked to this chapter will still exist in the database but won&apos;t be accessible through the UI.
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

          <AnimatePresence>
            {viewStep === "level" && (
              <motion.div key="level" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground font-medium">Select a level to manage its chapters</p>
                  <Button size="sm" variant="outline" onClick={handleSeed} disabled={isSeeding}>
                    {isSeeding ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1.5" />}
                    Sync from syllabus
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {LEVELS.map((lvl) => (
                    <Card key={lvl.id} className="hover:border-primary cursor-pointer transition-all"
                      onClick={() => {
                        setSelectedLevel(lvl.id);
                        if (lvl.id === "sec34") { setViewStep("subject"); }
                        else { setSelectedSubject("only"); setViewStep("list"); }
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
                </div>
              </motion.div>
            )}

            {viewStep === "subject" && (
              <motion.div key="subject" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {(["E Math", "A Math"] as Subject[]).map((sub) => (
                  <Card key={sub} className="hover:border-primary cursor-pointer transition-all"
                    onClick={() => { setSelectedSubject(sub); setViewStep("list"); }}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold">{sub}</h3>
                      <Badge variant="secondary" className="mt-2">{sub === "E Math" ? "4048" : "4049"}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {viewStep === "list" && (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg border border-border">
                  <div>
                    <h3 className="font-bold">
                      {selectedLevel && LEVEL_LABELS[selectedLevel]}
                      {selectedSubject && selectedSubject !== "only" && ` · ${selectedSubject}`}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{chapters.length} chapter{chapters.length !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex gap-2">
                    {orderChanged && (
                      <Button size="sm" variant="outline" onClick={handleSaveOrder} disabled={isSavingOrder}
                        className="border-emerald-500/50 text-emerald-600 hover:bg-emerald-500/10"
                      >
                        {isSavingOrder ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Order
                      </Button>
                    )}
                    <Button onClick={handleAddNew} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Chapter
                    </Button>
                  </div>
                </div>

                {orderChanged && (
                  <p className="text-xs text-muted-foreground text-center py-1">
                    Drag chapters to reorder, then click &quot;Save Order&quot; to apply.
                  </p>
                )}

                {isLoading ? (
                  <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : chapters.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                    <p>No chapters yet for this level.</p>
                    <Button variant="link" onClick={handleSeed} disabled={isSeeding} className="mt-1">
                      {isSeeding ? "Seeding..." : "Seed from syllabus"}
                    </Button>
                  </div>
                ) : (
                  <Reorder.Group
                    axis="y"
                    values={chapters}
                    onReorder={setChapters}
                    className="space-y-2"
                  >
                    {chapters.map((ch) => (
                      <ChapterRow
                        key={ch.id}
                        ch={ch}
                        onEdit={handleEdit}
                        onDelete={(id) => setDeleteId(id)}
                      />
                    ))}
                  </Reorder.Group>
                )}

                <Button variant="ghost" className="w-full" onClick={() => {
                  if (selectedLevel === "sec34") { setViewStep("subject"); setSelectedSubject(null); }
                  else { setViewStep("level"); setSelectedLevel(null); setSelectedSubject(null); }
                }}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {showForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{editingId ? "Edit Chapter" : "Add New Chapter"}</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {selectedLevel && LEVEL_LABELS[selectedLevel]}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Chapter Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Quadratic Functions"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="code">Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g., N1, G2, A1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="strand">Strand *</Label>
                <select
                  id="strand"
                  value={formData.strand}
                  onChange={(e) => setFormData({ ...formData, strand: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="">Select strand…</option>
                  {strands.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of what this chapter covers"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingId ? "Update" : "Create"} Chapter
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
