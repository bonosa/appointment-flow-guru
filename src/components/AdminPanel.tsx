import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Twitter, Linkedin, Instagram, Plus, Edit, Trash2, Save } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'instagram';
  content: string;
  engagement: string;
  date: string;
  url?: string;
  author: string;
}

export default function AdminPanel() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [newPost, setNewPost] = useState({
    platform: 'twitter' as const,
    content: '',
    engagement: '',
    author: 'Smart Booking Pro'
  });

  // Load posts from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('socialMediaPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Default posts
      const defaultPosts: SocialPost[] = [
        {
          id: '1',
          platform: 'twitter',
          content: "🚀 Just launched our AI booking system! Reduced booking time by 80% for our clients. #SmartBooking #AI #Productivity",
          engagement: '156 likes, 23 retweets',
          date: new Date().toLocaleDateString(),
          author: 'Smart Booking Pro'
        },
        {
          id: '2',
          platform: 'linkedin',
          content: "Case Study: How AI transformed appointment scheduling for 500+ businesses. Our Claude AI integration reduced manual booking time from 15 minutes to 3 minutes per appointment.",
          engagement: '89 reactions, 12 comments',
          date: new Date(Date.now() - 86400000).toLocaleDateString(),
          author: 'Smart Booking Pro'
        },
        {
          id: '3',
          platform: 'instagram',
          content: "Behind the scenes: Our Claude AI development process ✨ See how we're revolutionizing appointment booking with intelligent automation! #AI #Innovation #SmartBooking",
          engagement: '234 likes, 18 comments',
          date: new Date(Date.now() - 172800000).toLocaleDateString(),
          author: 'Smart Booking Pro'
        }
      ];
      setPosts(defaultPosts);
      localStorage.setItem('socialMediaPosts', JSON.stringify(defaultPosts));
    }
  }, []);

  const savePosts = (updatedPosts: SocialPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('socialMediaPosts', JSON.stringify(updatedPosts));
  };

  const addPost = () => {
    if (!newPost.content.trim()) return;

    const post: SocialPost = {
      id: Date.now().toString(),
      platform: newPost.platform,
      content: newPost.content,
      engagement: newPost.engagement || '0 likes, 0 comments',
      date: new Date().toLocaleDateString(),
      author: newPost.author
    };

    const updatedPosts = [post, ...posts];
    savePosts(updatedPosts);
    
    setNewPost({
      platform: 'twitter',
      content: '',
      engagement: '',
      author: 'Smart Booking Pro'
    });
  };

  const updatePost = () => {
    if (!editingPost) return;

    const updatedPosts = posts.map(post => 
      post.id === editingPost.id ? editingPost : post
    );
    savePosts(updatedPosts);
    setEditingPost(null);
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    savePosts(updatedPosts);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      default: return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-500';
      case 'linkedin': return 'text-blue-600';
      case 'instagram': return 'text-pink-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Social Media Admin Panel</h1>
        <Button onClick={() => window.location.href = '/'}>
          Back to Site
        </Button>
      </div>

      {/* Add New Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select value={newPost.platform} onValueChange={(value: any) => setNewPost({...newPost, platform: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="engagement">Engagement (optional)</Label>
              <Input
                id="engagement"
                placeholder="e.g., 156 likes, 23 retweets"
                value={newPost.engagement}
                onChange={(e) => setNewPost({...newPost, engagement: e.target.value})}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              placeholder="Enter your post content..."
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              rows={3}
            />
          </div>
          <Button onClick={addPost} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Post
          </Button>
        </CardContent>
      </Card>

      {/* Edit Post Modal */}
      {editingPost && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Platform</Label>
                <Select value={editingPost.platform} onValueChange={(value: any) => setEditingPost({...editingPost, platform: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Engagement</Label>
                <Input
                  value={editingPost.engagement}
                  onChange={(e) => setEditingPost({...editingPost, engagement: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={updatePost}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditingPost(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={getPlatformColor(post.platform)}>
                        {getPlatformIcon(post.platform)}
                      </div>
                      <span className="font-semibold capitalize">{post.platform}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{post.content}</p>
                    <p className="text-sm text-gray-600">{post.engagement}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPost(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 