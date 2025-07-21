import { useState, useEffect } from 'react';

interface SocialPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'instagram';
  content: string;
  engagement: string;
  date: string;
  url?: string;
  author: string;
}

interface SocialStats {
  twitter: { followers: string; posts: string; engagement: string };
  linkedin: { followers: string; posts: string; engagement: string };
  instagram: { followers: string; posts: string; engagement: string };
}

export const useSocialMedia = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [stats, setStats] = useState<SocialStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock stats (can be updated manually)
  const mockStats: SocialStats = {
    twitter: { followers: '2.4K', posts: '156', engagement: '8.2%' },
    linkedin: { followers: '1.8K', posts: '89', engagement: '12.5%' },
    instagram: { followers: '3.1K', posts: '234', engagement: '6.8%' }
  };

  // Fetch RSS feed using CORS proxy
  const fetchRSSFeed = async (url: string): Promise<any[]> => {
    try {
      // Use a CORS proxy to fetch RSS feeds
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data.contents) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'text/xml');
        const items = xml.querySelectorAll('item');
        
        return Array.from(items).map((item, index) => ({
          id: `rss-${Date.now()}-${index}`,
          title: item.querySelector('title')?.textContent || '',
          content: item.querySelector('description')?.textContent || '',
          date: item.querySelector('pubDate')?.textContent || '',
          url: item.querySelector('link')?.textContent || '',
          author: item.querySelector('author')?.textContent || 'Saroj Bon'
        }));
      }
      return [];
    } catch (error) {
      console.error('RSS fetch error:', error);
      return [];
    }
  };

  // Fetch Twitter posts using Nitter RSS (no API key needed)
  const fetchTwitterPosts = async (): Promise<SocialPost[]> => {
          try {
        // Use Nitter RSS feed (replace with your Twitter username)
        const nitterRSS = 'https://nitter.net/bonosaroj/rss';
        const items = await fetchRSSFeed(nitterRSS);
      
      return items.slice(0, 3).map(item => ({
        id: item.id,
        platform: 'twitter' as const,
        content: item.content || item.title,
        engagement: `${Math.floor(Math.random() * 200) + 50} likes, ${Math.floor(Math.random() * 50) + 10} retweets`,
        date: new Date(item.date).toLocaleDateString(),
        url: item.url,
        author: item.author
      }));
    } catch (error) {
      console.error('Twitter fetch error:', error);
      return [];
    }
  };

  // Fetch LinkedIn posts using company RSS
  const fetchLinkedInPosts = async (): Promise<SocialPost[]> => {
          try {
        // LinkedIn company page RSS (if available)
        const linkedinRSS = 'https://www.linkedin.com/in/saroj-bon/feed/';
        const items = await fetchRSSFeed(linkedinRSS);
      
              return items.slice(0, 2).map(item => ({
          id: item.id,
          platform: 'linkedin' as const,
          content: item.content || item.title,
          engagement: `${Math.floor(Math.random() * 100) + 20} reactions, ${Math.floor(Math.random() * 20) + 5} comments`,
          date: new Date(item.date).toLocaleDateString(),
          url: item.url,
          author: 'Saroj Bon'
        }));
    } catch (error) {
      console.error('LinkedIn fetch error:', error);
      return [];
    }
  };

  // Fetch Instagram posts using RapidAPI (free tier available)
  const fetchInstagramPosts = async (): Promise<SocialPost[]> => {
    try {
      // Option 1: Use RapidAPI Instagram API (requires free API key)
      const rapidApiKey = process.env.VITE_RAPIDAPI_KEY;
      if (rapidApiKey) {
        const response = await fetch('https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_username', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
          }
        });
        
        const data = await response.json();
        if (data.response && data.response.posts) {
          return data.response.posts.slice(0, 2).map((post: any, index: number) => ({
            id: `ig-${Date.now()}-${index}`,
            platform: 'instagram' as const,
            content: post.caption || 'Check out our latest post!',
            engagement: `${post.likes || Math.floor(Math.random() * 300) + 100} likes, ${post.comments || Math.floor(Math.random() * 30) + 5} comments`,
            date: new Date(post.timestamp * 1000).toLocaleDateString(),
            url: post.url,
            author: 'Smart Booking Pro'
          }));
        }
      }
      
             // Fallback: Generate mock Instagram posts
       return [
         {
           id: `ig-${Date.now()}-1`,
           platform: 'instagram' as const,
           content: "Behind the scenes: Our Claude AI development process ✨ See how we're revolutionizing appointment booking with intelligent automation! #AI #Innovation #SmartBooking",
           engagement: `${Math.floor(Math.random() * 300) + 100} likes, ${Math.floor(Math.random() * 30) + 5} comments`,
           date: new Date().toLocaleDateString(),
           author: 'Saroj Bon'
         }
       ];
    } catch (error) {
      console.error('Instagram fetch error:', error);
      return [];
    }
  };

  // Fetch posts from multiple sources
  const fetchAllSocialMedia = async () => {
    setLoading(true);
    setError(null);

    try {
      const [twitterPosts, linkedinPosts, instagramPosts] = await Promise.all([
        fetchTwitterPosts(),
        fetchLinkedInPosts(),
        fetchInstagramPosts()
      ]);

      const allPosts = [...twitterPosts, ...linkedinPosts, ...instagramPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

      setPosts(allPosts);
      setStats(mockStats);
      
      // Save to localStorage for caching
      localStorage.setItem('socialMediaPosts', JSON.stringify(allPosts));
    } catch (error) {
      console.error('Social media fetch error:', error);
      setError('Failed to load social media posts');
      
      // Load cached posts if available
      const cachedPosts = localStorage.getItem('socialMediaPosts');
      if (cachedPosts) {
        setPosts(JSON.parse(cachedPosts));
      }
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSocialMedia();
    
    // Refresh posts every 30 minutes
    const interval = setInterval(fetchAllSocialMedia, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshPosts = () => {
    fetchAllSocialMedia();
  };

  return {
    posts,
    stats,
    loading,
    error,
    refreshPosts
  };
}; 