const fallbackQuotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "The secret of getting ahead is getting started.",
  "Momentum is fragile. Protect it.",
  "Don’t wish it were easier; wish you were better.",
  "Your talent determines what you can do. Your motivation determines how much you are willing to do.",
  "Discipline is doing what needs to be done, even if you don't want to do it."
];


export const fetchMotivation = async () => {
    try {
        // add a controller to 'give up' if the API takes more than 3 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);


        const response = await fetch ('https://api.adviceslip.com/advice', { signal: controller.signal});
        clearTimeout(timeoutId);


        const data = await response.json();
        return data.slip.advice;
    } catch (error) {
        // If API is slow or fails, return a random local quote
        return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }
};

// NEW helper to get a fast local quote for the initial state
export const getLocalQuote = () => {
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
};
