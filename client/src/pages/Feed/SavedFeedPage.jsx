// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSavedPosts } from '../../redux/slices/feedSlice';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import FeedItem from '../../components/feed/FeedItem';
// import Spinner from '../../components/common/Spinner';
// import ErrorAlert from '../../components/common/ErrorAlert';
// import { ScrollArea } from '@/components/ui/scroll-area';

// const SavedFeedPage = () => {
//   const dispatch = useDispatch();
//   const { savedPosts, loading, error } = useSelector((state) => state.feed);
//   const [activeTab, setActiveTab] = useState('all');


//   const isSavedPostsLoading = loading && !savedPosts.length;

//   // Fetch posts on mount, if not already fetched
//   useEffect(() => {
//     if (!savedPosts.length) dispatch(fetchSavedPosts());
//   }, [dispatch, savedPosts.length]);

//   // Filter posts based on the selected tab
//   const filteredPosts = savedPosts.filter((post) => {
//     switch (activeTab) {
//       case 'shared':
//         return post.shared;
//       case 'reported':
//         return post.reported;
//       case 'reddit':
//         return post.source === 'Reddit';
//       case 'devto':
//         return post.source === 'Dev.to';
//       default:
//         return true; // 'all' tab
//     }
//   });

//   // Debugging: log savedPosts to verify if Dev.to posts exist
//   console.log('Saved Posts:', savedPosts);

//   // Render the component
//   return (
//     <div className="container mx-auto px-2 h-full flex flex-col">
//       <Card className="h-full flex-grow flex flex-col">
//         <CardHeader>
//           <CardTitle className="flex items-center">Your Saved Posts</CardTitle>
//         </CardHeader>
//         <CardContent className="flex-grow flex flex-col">
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <div className="mb-4">
//               <ScrollArea className="overflow-x-auto">
//                 <TabsList className="flex space-x-4">
//                   <TabsTrigger value="all">All ({savedPosts.length})</TabsTrigger>
//                   <TabsTrigger value="shared">Shared ({savedPosts.filter((p) => p.shared).length})</TabsTrigger>
//                   <TabsTrigger value="reported">Reported ({savedPosts.filter((p) => p.reported).length})</TabsTrigger>
//                   <TabsTrigger value="reddit">
//                     Reddit ({savedPosts.filter((p) => p.source === 'Reddit').length})
//                   </TabsTrigger>
//                   <TabsTrigger value="devto">
//                     Dev.to ({savedPosts.filter((p) => p.source === 'Dev.to').length})
//                   </TabsTrigger>
//                 </TabsList>
//               </ScrollArea>
//             </div>

//             {error && <ErrorAlert message={error} />}

//             {isSavedPostsLoading ? (
//               <div className="flex justify-center py-8 flex-grow items-center">
//                 <Spinner />
//               </div>
//             ) : (
//               <TabsContent value={activeTab} className="m-0 flex-grow overflow-y-auto">
//                 {filteredPosts.length > 0 ? (
//                   filteredPosts.map((post) => <FeedItem key={post._id || post.postId} post={post} />)
//                 ) : (
//                   <p className="text-center py-8 text-gray-500">No saved posts found</p>
//                 )}
//               </TabsContent>
//             )}
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SavedFeedPage;




// Updated SavedFeedPage component
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedPosts } from '../../redux/slices/feedSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedItem from '../../components/feed/FeedItem';
import Spinner from '../../components/common/Spinner';
import ErrorAlert from '../../components/common/ErrorAlert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';

const SavedFeedPage = () => {
  const dispatch = useDispatch();
  const { savedPosts, loading, error } = useSelector((state) => state.feed);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    dispatch(fetchSavedPosts()); // Always fetch posts on mount
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

  console.log("Filtered Posts:", filteredPosts); // Debugging

  return (
    <div className="container mx-auto px-2 h-full flex flex-col">
      <Card className="h-full flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>Your Saved Posts</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <ScrollArea className="overflow-x-auto">
              <TabsList className="flex space-x-4">
                <TabsTrigger value="all">All ({savedPosts.length})</TabsTrigger>
                <TabsTrigger value="shared">Shared ({filteredPosts.filter((p) => p.shared).length})</TabsTrigger>
                <TabsTrigger value="reported">Reported ({filteredPosts.filter((p) => p.reported).length})</TabsTrigger>
                <TabsTrigger value="reddit">Reddit ({filteredPosts.filter((p) => p.source === 'Reddit').length})</TabsTrigger>
                <TabsTrigger value="devto">Dev.to ({filteredPosts.filter((p) => p.source === 'Dev.to').length})</TabsTrigger>
              </TabsList>
            </ScrollArea>

            {error && <ErrorAlert message={error} />}

            {loading ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : (
              <TabsContent value={activeTab} className="m-0 flex-grow">
                {filteredPosts.length ? (
                  filteredPosts.map((post) => <FeedItem key={post._id || post.postId} post={post} />)
                ) : (
                  <p className="text-center py-8 text-gray-500">No saved posts found</p>
                )}
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedFeedPage;
