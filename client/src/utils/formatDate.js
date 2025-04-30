// formatDate.js
export const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date)) {
      throw new Error('Invalid date format');
    }
    
    return date.toLocaleDateString('en-US', options); 
  };
  