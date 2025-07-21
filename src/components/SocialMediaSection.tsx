import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Instagram, MessageCircle, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { useSocialMedia } from '@/hooks/useSocialMedia';

export default function SocialMediaSection() {
  const { posts, stats, loading, error, refreshPosts } = useSocialMedia();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      default: return Twitter;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-500';
      case 'linkedin': return 'text-blue-600';
      case 'instagram': return 'text-pink-500';
      default: return 'text-blue-500';
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'Twitter';
      case 'linkedin': return 'LinkedIn';
      case 'instagram': return 'Instagram';
      default: return 'Social Media';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow us on social media for the latest updates, AI insights, and behind-the-scenes 
            content. Join thousands of professionals who trust Smart Booking Pro.
          </p>
        </div>

        {/* Social Media Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <Twitter className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Twitter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">{stats.twitter.followers}</p>
                <p className="text-sm text-gray-600">Followers</p>
                <p className="text-sm text-green-600 font-medium">{stats.twitter.engagement} engagement</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <Linkedin className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">LinkedIn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">{stats.linkedin.followers}</p>
                <p className="text-sm text-gray-600">Followers</p>
                <p className="text-sm text-green-600 font-medium">{stats.linkedin.engagement} engagement</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <Instagram className="h-8 w-8 text-pink-500" />
              </div>
              <CardTitle className="text-lg">Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">{stats.instagram.followers}</p>
                <p className="text-sm text-gray-600">Followers</p>
                <p className="text-sm text-green-600 font-medium">{stats.instagram.engagement} engagement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Latest from Our Social Media
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshPosts}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}
          
          {posts.map((post, index) => {
            const IconComponent = getPlatformIcon(post.platform);
            return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-gray-100 ${post.color}`}>
                    <post.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{post.platform}</h4>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{post.engagement}</span>
                      <Button variant="outline" size="sm">
                        View Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience AI-Powered Booking?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of businesses already using Smart Booking Pro to streamline their scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Booking Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Users className="mr-2 h-5 w-5" />
                Follow Us
              </Button>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="font-medium">80% faster booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="font-medium">500+ businesses</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              <span className="font-medium">AI-powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 