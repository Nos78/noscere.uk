// src/data/quotesData.ts

export interface Quote {
    text: string;
    author: string;
    context?: string;
}

export const quotesList: Quote[] = [
    {
        text: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman",
        context: "Systems Design"
    },
    {
        text: "Bugs are the silent landmines, but frontend execution establishes user trust.",
        author: "Noscere",
        context: "Overcoming the Backend Bias"
    },
    {
        text: "The function of good software is to make the complex appear to be simple.",
        author: "Grady Booch",
        context: "Object-Oriented Design"
    },
    {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay",
        context: "Computing Pioneers"
    },
    {
        text: "Talk is cheap. Show me the code.",
        author: "Linus Torvalds",
        context: "Linux Core Development"
    }
];