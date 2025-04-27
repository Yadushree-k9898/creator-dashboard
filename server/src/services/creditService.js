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
    const credits = await Credits.findOne({ userId });
    if (!credits) return;

    // Update credits schema
    credits.interactionPoints += 5; // +5 credits
    credits.action = 'POST_SAVE';
    credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
    await credits.save();
    
    // Update user schema with total credits
    await User.findByIdAndUpdate(userId, { 
      credits: credits.totalCredits
    });
    
    return credits;
  } catch (error) {
    console.error('Error in awardSavePostCredits:', error);
    throw error;
  }
};

// Award credits for sharing a post
const awardSharePostCredits = async (userId) => {
  try {
    const credits = await Credits.findOne({ userId });
    if (!credits) return;

    // Update credits schema
    credits.interactionPoints += 10; // +10 credits
    credits.action = 'POST_SHARE';
    credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
    await credits.save();
    
    // Update user schema with total credits
    await User.findByIdAndUpdate(userId, { 
      credits: credits.totalCredits
    });
    
    return credits;
  } catch (error) {
    console.error('Error in awardSharePostCredits:', error);
    throw error;
  }
};

// Award credits for reporting a post
const awardReportPostCredits = async (userId) => {
  try {
    const credits = await Credits.findOne({ userId });
    if (!credits) return;

    // Update credits schema
    credits.interactionPoints += 2; // +2 credits
    credits.action = 'POST_REPORT';
    credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
    await credits.save();
    
    // Update user schema with total credits
    await User.findByIdAndUpdate(userId, { 
      credits: credits.totalCredits
    });
    
    return credits;
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
