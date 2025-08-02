// app/admin/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart, FileText, MessageSquare } from "lucide-react";
import { countPosts } from "@/lib/server-actions/posts";

export default async function AdminPage() {
  const { totalPosts, publishedPosts, draftPosts } = await countPosts();
  const pendingComments = 5;
  // const viewsThisWeek = await getThisWeekViews();

  return (
    <div className="container mx-auto p-8">
      <p className="text-xl text-gray-600 mb-8">Welcome back, Arad!</p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {publishedPosts} published, {draftPosts} drafts
            </p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Views</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{viewsThisWeek}</div>
            <p className="text-xs text-muted-foreground">This Week</p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Comments
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingComments}</div>
            <p className="text-xs text-muted-foreground">Awaiting moderation</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions / Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/admin/posts" className="flex items-center gap-2">
                <FileText size={18} /> View All Posts
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href="/admin/posts/create"
                className="flex items-center gap-2"
              >
                <PlusCircle size={18} /> Create New Post
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/admin/analytics" className="flex items-center gap-2">
                <BarChart size={18} /> View Detailed Analytics
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/reports">Generate Reports</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moderation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/admin/comments" className="flex items-center gap-2">
                <MessageSquare size={18} /> Manage Comments
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* You could add a "Recent Activity Feed" section here if desired */}
      {/* <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-4">
            <ul>
              <li>Post "New Next.js Features" published by John Doe</li>
              <li>Comment approved on "My First Post"</li>
            </ul>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
