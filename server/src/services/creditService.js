const Credits = require('../models/Credits');
const User = require('../models/User');

// Award credits for daily login
const awardLoginCredits = async (userId) => {
  try {
    let credits = await Credits.findOne({ userId });
    
    // If no credits document exists, create one
    if (!credits) {
      credits = await Credits.create({
        userId,
        totalCredits: 10, // Initial login points
        loginPoints: 10,
        interactionPoints: 0,
        profileCompletionPoints: 0,
        action: 'LOGIN',
        lastLoginDate: new Date()
      });

      // Update user's initial credits
      await User.findByIdAndUpdate(userId, { 
        credits: 10,
        lastLogin: new Date()
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      const lastLoginDate = credits.lastLoginDate ? 
        credits.lastLoginDate.toISOString().split('T')[0] : null;

      // Only award points if it's a different day
      if (today !== lastLoginDate) {
        // Convert all values to numbers and handle null/undefined
        const currentLoginPoints = Number(credits.loginPoints) || 0;
        const currentProfilePoints = Number(credits.profileCompletionPoints) || 0;
        const currentInteractionPoints = Number(credits.interactionPoints) || 0;

        // Add 10 points for new login
        const newLoginPoints = currentLoginPoints + 10;
        
        // Calculate new total (existing points + new login points)
        const newTotal = newLoginPoints + currentProfilePoints + currentInteractionPoints;

        // Update the credits document
        credits = await Credits.findOneAndUpdate(
          { userId },
          {
            $set: {
              loginPoints: newLoginPoints,
              totalCredits: newTotal,
              lastLoginDate: new Date(),
              action: 'LOGIN'
            }
          },
          { new: true } // Return updated document
        );

        // Update user's credits
        await User.findByIdAndUpdate(userId, { 
          credits: newTotal,
          lastLogin: new Date()
        });
      } else {
        // No points awarded, but return the current credits
        // This ensures we always return the credits object even if no new points were awarded
        credits = await Credits.findOne({ userId });
      }
    }

    return credits;
  } catch (error) {
    console.error('Error in awardLoginCredits:', error);
    throw error;
  }
};

// Award credits for completing profile
const awardProfileCompletionCredits = async (userId) => {
  try {
    const credits = await Credits.findOne({ userId });
    const user = await User.findById(userId);
    if (!credits || !user) return;

    if (user.name && user.email && !user.profileCompleted) {
      // Update credits schema
      credits.profileCompletionPoints += 50; // +50 credits
      credits.profileCompleted = true;
      credits.action = 'PROFILE_COMPLETION';
      credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
      await credits.save();
      
      // Update user schema with total credits
      user.profileCompleted = true;
      user.credits = credits.totalCredits;
      await user.save();
      
      return credits;
    }
    return credits;
  } catch (error) {
    console.error('Error in awardProfileCompletionCredits:', error);
    throw error;
  }
};

// Award credits for saving a post
const awardSavePostCredits = async (userId) => {
  try {
    // Get existing credits to calculate totals
    const existingCredits = await Credits.find({ userId });
    
    // Calculate current totals
    let currentLoginPoints = 0;
    let currentProfilePoints = 0;
    let currentInteractionPoints = 0;
    let currentSavedPostsCount = 0;
    
    existingCredits.forEach(credit => {
      currentLoginPoints += credit.loginPoints || 0;
      currentProfilePoints += credit.profileCompletionPoints || 0;
      currentInteractionPoints += credit.interactionPoints || 0;
      currentSavedPostsCount += credit.savedPostsCount || 0;
    });
    
    // Create a new credit record for this transaction
    const newCredit = new Credits({
      userId,
      totalCredits: 5, // Points for this transaction
      loginPoints: 0,
      profileCompletionPoints: 0,
      interactionPoints: 5, // +5 credits for saving a post
      sharedPostsCount: 0,
      savedPostsCount: 1, // This transaction is for 1 saved post
      reportedPostsCount: 0,
      action: 'POST_SAVE',
      lastLoginDate: new Date()
    });
    
    await newCredit.save();
    
    // Update user's total credits
    const totalCredits = currentLoginPoints + currentProfilePoints + currentInteractionPoints + 5;
    await User.findByIdAndUpdate(userId, { credits: totalCredits });
    
    // Return the new credit record along with updated counts
    return {
      ...newCredit.toObject(),
      totalCredits,
      savedPostsCount: currentSavedPostsCount + 1
    };
  } catch (error) {
    console.error('Error in awardSavePostCredits:', error);
    throw error;
  }
};

const awardSharePostCredits = async (userId) => {
  try {
    // Get existing credits to calculate totals
    const existingCredits = await Credits.find({ userId });
    
    // Calculate current totals
    let currentLoginPoints = 0;
    let currentProfilePoints = 0;
    let currentInteractionPoints = 0;
    let currentSharedPostsCount = 0;
    
    existingCredits.forEach(credit => {
      currentLoginPoints += credit.loginPoints || 0;
      currentProfilePoints += credit.profileCompletionPoints || 0;
      currentInteractionPoints += credit.interactionPoints || 0;
      currentSharedPostsCount += credit.sharedPostsCount || 0;
    });
    
    // Create a new credit record for this transaction
    const newCredit = new Credits({
      userId,
      totalCredits: 5, // Points for this transaction
      loginPoints: 0,
      profileCompletionPoints: 0,
      interactionPoints: 5, // +5 credits for sharing a post
      sharedPostsCount: 1, // This transaction is for 1 shared post
      savedPostsCount: 0,
      reportedPostsCount: 0,
      action: 'POST_SHARE',
      lastLoginDate: new Date()
    });
    
    await newCredit.save();
    
    // Update user's total credits
    const totalCredits = currentLoginPoints + currentProfilePoints + currentInteractionPoints + 5;
    await User.findByIdAndUpdate(userId, { credits: totalCredits });
    
    // Return the new credit record along with updated counts
    return {
      ...newCredit.toObject(),
      totalCredits,
      sharedPostsCount: currentSharedPostsCount + 1
    };
  } catch (error) {
    console.error('Error in awardSharePostCredits:', error);
    throw error;
  }
};

// Award credits for reporting a post
const awardReportPostCredits = async (userId) => {
  try {
    // Get existing credits to calculate totals
    const existingCredits = await Credits.find({ userId });
    
    // Calculate current totals
    let currentLoginPoints = 0;
    let currentProfilePoints = 0;
    let currentInteractionPoints = 0;
    let currentReportedPostsCount = 0;
    
    existingCredits.forEach(credit => {
      currentLoginPoints += credit.loginPoints || 0;
      currentProfilePoints += credit.profileCompletionPoints || 0;
      currentInteractionPoints += credit.interactionPoints || 0;
      currentReportedPostsCount += credit.reportedPostsCount || 0;
    });
    
    // Create a new credit record for this transaction
    const newCredit = new Credits({
      userId,
      totalCredits: 10, // Points for this transaction
      loginPoints: 0,
      profileCompletionPoints: 0,
      interactionPoints: 10, // +10 credits for reporting a post
      sharedPostsCount: 0,
      savedPostsCount: 0,
      reportedPostsCount: 1, // This transaction is for 1 reported post
      action: 'POST_REPORT',
      lastLoginDate: new Date()
    });
    
    await newCredit.save();
    
    // Update user's total credits
    const totalCredits = currentLoginPoints + currentProfilePoints + currentInteractionPoints + 10;
    await User.findByIdAndUpdate(userId, { credits: totalCredits });
    
    // Return the new credit record along with updated counts
    return {
      ...newCredit.toObject(),
      totalCredits,
      reportedPostsCount: currentReportedPostsCount + 1
    };
  } catch (error) {
    console.error('Error in awardReportPostCredits:', error);
    throw error;
  }
};

module.exports = {
  awardLoginCredits,
  awardProfileCompletionCredits,
  awardSavePostCredits,
  awardSharePostCredits,
  awardReportPostCredits
};
