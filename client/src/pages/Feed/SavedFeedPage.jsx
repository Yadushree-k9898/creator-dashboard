// Updated SavedFeedPage component
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedPosts } from '../../redux/slices/feedSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedItem from '../../components/feed/FeedItem';
import Spinner from '../../components/common/Spinner';
import ErrorAlert from '../../components/common/ErrorAlert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, Share2, Flag, Code, FileCode } from 'lucide-react';
import { useState, useEffect } from 'react';

const SavedFeedPage = () => {
  const dispatch = useDispatch();
  const { savedPosts, loading, error } = useSelector((state) => state.feed);
  const [activeTab, setActiveTab] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchSavedPosts()); // Always fetch posts on mount
    
    // Animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  const filteredPosts = Array.isArray(savedPosts) ? savedPosts.filter((post) => {
    switch (activeTab) {
      case 'shared':
        return post.shared || false;
      case 'reported':
        return post.reported || false;
      case 'reddit':
        return post.source === 'Reddit';
      case 'devto':
        return post.source === 'Dev.to';
      default:
        return true;
    }
  }) : [];

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'shared':
        return <Share2 className="h-4 w-4 mr-1" />;
      case 'reported':
        return <Flag className="h-4 w-4 mr-1" />;
      case 'reddit':
        return <Code className="h-4 w-4 mr-1" />;
      case 'devto':
        return <FileCode className="h-4 w-4 mr-1" />;
      default:
        return <Save className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className={`h-full flex flex-col transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <Card className="h-full flex flex-col border-0 shadow-none">
        <CardHeader className="pb-2 pt-1 px-1">
          <CardTitle className="text-lg flex items-center text-gray-800 dark:text-gray-200">
            <Save className="mr-2 h-5 w-5 text-primary" />
            Your Saved Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-0 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-1">
              <ScrollArea className="w-full overflow-x-auto pb-2" orientation="horizontal">
                <TabsList className="inline-flex w-auto mb-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger 
                    value="all" 
                    className="flex items-center text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    {getTabIcon('all')}
                    All ({savedPosts.length || 0})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shared" 
                    className="flex items-center text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    {getTabIcon('shared')}
                    Shared ({filteredPosts.filter((p) => p.shared).length || 0})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reported" 
                    className="flex items-center text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    {getTabIcon('reported')}
                    Reported ({filteredPosts.filter((p) => p.reported).length || 0})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reddit" 
                    className="flex items-center text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    {getTabIcon('reddit')}
                    Reddit ({filteredPosts.filter((p) => p.source === 'Reddit').length || 0})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="devto" 
                    className="flex items-center text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    {getTabIcon('devto')}
                    Dev.to ({filteredPosts.filter((p) => p.source === 'Dev.to').length || 0})
                  </TabsTrigger>
                </TabsList>
              </ScrollArea>
            </div>

            {error && <ErrorAlert message={error} className="mx-1 mb-3" />}

            <div className="flex-grow overflow-hidden px-1">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Spinner size="lg" />
                </div>
              ) : (
                <TabsContent value={activeTab} className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
                  <ScrollArea className="h-full pr-2">
                    <div className="space-y-3 pb-4">
                      {filteredPosts.length ? (
                        filteredPosts.map((post) => (
                          <FeedItem 
                            key={post._id || post.postId} 
                            post={post} 
                            className="animate-fadeIn" 
                            style={{ animationDelay: '0.1s' }}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
                          <Save className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                          <p>No saved posts found</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedFeedPage;