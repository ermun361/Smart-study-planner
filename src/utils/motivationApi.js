export const fetchMotivation = async () => {
    try {
        const response = await fetch ('https://api.adviceslip.com/advice');
        const data = await response.json();
        return data.slip.advice;
    } catch (error) {
        console.error("Motivation fetch failed:", error);
        return "Success is the sum of small efforts, repeated day in and day out.";
    }
}