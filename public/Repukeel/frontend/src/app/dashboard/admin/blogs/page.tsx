export default function AdminBlogsPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Manage Blog Posts</h1>
          <p className="text-slate-500">Create and manage all blog articles.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
          + New Post
        </button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400">
          <p className="text-lg font-medium">No blog posts yet.</p>
          <p className="text-sm mt-2">Click &quot;New Post&quot; to create your first article.</p>
        </div>
      </div>
    </div>
  );
}
