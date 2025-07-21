# 🤖 Automated Social Media Integration Setup

## **Overview**

Your app now automatically fetches real social media posts from multiple sources:

- ✅ **Twitter** - Via Nitter RSS feeds (no API key needed)
- ✅ **LinkedIn** - Via company page RSS (if available)
- ✅ **Instagram** - Via RapidAPI (optional, requires free API key)
- ✅ **Auto-refresh** - Updates every 30 minutes
- ✅ **Caching** - Stores posts locally for performance

## **Setup Options**

### **Option 1: RSS Feeds Only (Recommended)**

**No API keys needed!** Uses public RSS feeds:

1. **Update Twitter RSS URL** in `src/hooks/useSocialMedia.ts`:
   ```javascript
   const nitterRSS = 'https://nitter.net/YOUR_TWITTER_USERNAME/rss';
   ```

2. **Update LinkedIn RSS URL** (if you have a company page):
   ```javascript
   const linkedinRSS = 'https://www.linkedin.com/company/YOUR_COMPANY/feed/';
   ```

3. **Deploy and test** - Posts will auto-fetch!

### **Option 2: Add Instagram API (Optional)**

For Instagram automation, get a free RapidAPI key:

1. **Sign up at [RapidAPI](https://rapidapi.com)**
2. **Subscribe to Instagram API** (free tier available)
3. **Get your API key**
4. **Add to Vercel environment variables**:
   ```
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

## **How It Works**

### **Automatic Features:**
- 🔄 **Auto-refresh** every 30 minutes
- 💾 **Local caching** for fast loading
- 🎯 **Real engagement metrics** (with fallback)
- 📱 **Cross-platform support**
- ⚡ **Performance optimized**

### **Fallback System:**
- If RSS feeds fail → Uses cached posts
- If no cached posts → Shows default content
- If API errors → Graceful degradation

## **Customization**

### **Update Social Media URLs:**
Edit `src/hooks/useSocialMedia.ts`:

```javascript
// Your Twitter username
const nitterRSS = 'https://nitter.net/YOUR_USERNAME/rss';

// Your LinkedIn company
const linkedinRSS = 'https://www.linkedin.com/company/YOUR_COMPANY/feed/';

// Your Instagram username (for RapidAPI)
const instagramUsername = 'your_instagram_username';
```

### **Update Stats:**
Edit the mock stats in the same file:

```javascript
const mockStats: SocialStats = {
  twitter: { followers: 'YOUR_COUNT', posts: 'YOUR_COUNT', engagement: 'YOUR_RATE' },
  linkedin: { followers: 'YOUR_COUNT', posts: 'YOUR_COUNT', engagement: 'YOUR_RATE' },
  instagram: { followers: 'YOUR_COUNT', posts: 'YOUR_COUNT', engagement: 'YOUR_RATE' }
};
```

## **Testing**

### **1. Check RSS Feeds:**
Visit these URLs in your browser:
- `https://nitter.net/YOUR_USERNAME/rss`
- `https://www.linkedin.com/company/YOUR_COMPANY/feed/`

### **2. Test on Your Site:**
- Visit your Vercel app
- Check the social media section
- Click "Refresh" button
- Check browser console for any errors

### **3. Monitor Performance:**
- Posts load automatically
- Refresh every 30 minutes
- Cached for fast loading

## **Troubleshooting**

### **No Posts Loading:**
1. Check RSS feed URLs are correct
2. Verify feeds are publicly accessible
3. Check browser console for CORS errors
4. Try the refresh button

### **CORS Errors:**
- RSS feeds use CORS proxy automatically
- If issues persist, try different proxy services

### **API Rate Limits:**
- RSS feeds have no rate limits
- RapidAPI has free tier limits
- System gracefully handles failures

## **Benefits**

✅ **Fully Automated** - No manual updates needed  
✅ **Real Content** - Shows your actual social media posts  
✅ **Professional** - Builds trust with customers  
✅ **SEO Friendly** - Fresh content for search engines  
✅ **Performance** - Fast loading with caching  
✅ **Reliable** - Multiple fallback systems  

## **Next Steps**

1. **Update the RSS URLs** with your actual social media accounts
2. **Deploy to Vercel** with the changes
3. **Test the automation** on your live site
4. **Monitor performance** and engagement

**Your social media section will now automatically show real posts from your accounts!** 🚀 