"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentManager } from "@/components/admin/content-manager";
import { ChapterManager } from "@/components/admin/chapter-manager";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Content Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage notes and practice PDFs for MathStack</p>
      </div>

      <Tabs defaultValue="chapters" className="space-y-6">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="flex w-max md:grid md:w-full md:max-w-sm md:grid-cols-3">
            <TabsTrigger value="chapters" className="px-6 md:px-3">Chapters</TabsTrigger>
            <TabsTrigger value="notes" className="px-6 md:px-3">Notes</TabsTrigger>
            <TabsTrigger value="practice" className="px-6 md:px-3">Practice</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chapters">
          <Card>
            <CardHeader>
              <CardTitle>Syllabus Chapters</CardTitle>
              <p className="text-sm text-muted-foreground">
                Add, edit, or remove chapters from the syllabus. Changes appear immediately in Notes and Practice navigation.
              </p>
            </CardHeader>
            <CardContent>
              <ChapterManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notes Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentManager type="notes" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Practice Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentManager type="practice" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
