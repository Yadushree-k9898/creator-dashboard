const Credits = require('../models/Credits');
const User = require('../models/User');

// Award credits for daily login
const awardLoginCredits = async (userId) => {
  const credits = await Credits.findOne({ user: userId });
  if (!credits) return;

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const lastLoginDate = credits.lastLoginDate ? credits.lastLoginDate.toISOString().split('T')[0] : null;

  if (today !== lastLoginDate) {
    credits.loginPoints += 10; // +10 credits for daily login
    credits.lastLoginDate = new Date();
    credits.totalCredits = credits.loginPoints + credits.profileCompletionPoints + credits.interactionPoints;
    await credits.save();
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
