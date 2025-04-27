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
  const credits = await Credits.findOne({ user: userId });
  const user = await User.findById(userId);
  if (!credits || !user) return;

  if (user.name && user.email && !credits.profileCompleted) {
    credits.profileCompletionPoints += 50; // +50 credits
    credits.profileCompleted = true;
    credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
    await credits.save();
  }
};

// Award credits for saving a post
const awardSavePostCredits = async (userId) => {
  const credits = await Credits.findOne({ user: userId });
  if (!credits) return;

  credits.interactionPoints += 5; // +5 credits
  credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
  await credits.save();
};

// Award credits for sharing a post
const awardSharePostCredits = async (userId) => {
  const credits = await Credits.findOne({ user: userId });
  if (!credits) return;

  credits.interactionPoints += 10; // +10 credits
  credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
  await credits.save();
};

// Award credits for reporting a post
const awardReportPostCredits = async (userId) => {
  const credits = await Credits.findOne({ user: userId });
  if (!credits) return;

  credits.interactionPoints += 2; // +2 credits
  credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
  await credits.save();
};

module.exports = {
  awardLoginCredits,
  awardProfileCompletionCredits,
  awardSavePostCredits,
  awardSharePostCredits,
  awardReportPostCredits
};
