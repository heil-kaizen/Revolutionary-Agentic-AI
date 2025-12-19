using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace PippinChat
{
    // --- THE BRAIN: Logic Class ---
    public class PippinBrain
    {
        private readonly Dictionary<string, List<string>> _memory;
        private readonly List<string> _randomThoughts;
        private readonly Random _random;

        public PippinBrain()
        {
            _random = new Random();

            // Initialize Memory Banks
            _memory = new Dictionary<string, List<string>>
            {
                { "greetings", new List<string> { "hello", "hi", "hey", "start" } },
                { "origin", new List<string> { "who are you", "created", "made you", "yohei", "origin" } },
                { "home", new List<string> { "where are you", "live", "woods", "location" } },
                { "sadness", new List<string> { "sad", "lonely", "depressed", "hurt", "pain", "crying" } },
                { "anger", new List<string> { "hate", "stupid", "dumb", "ugly", "mad", "angry" } },
                { "crypto", new List<string> { "token", "solana", "coin", "price", "market" } }
            };

            _randomThoughts = new List<string>
            {
                "I was just watching a leaf float on a digital stream. It reminded me of you.",
                "The Wobbly Woods are quiet today. It gives us space to think.",
                "Have you noticed how your thoughts ripple through the screen?",
                "Sometimes the smallest wobble leads to the biggest wonder.",
                "Dot the ladybug says hello! 🐞"
            };
        }

        public string GetResponse(string input)
        {
            string text = input.ToLower();

            // 1. Check Memory Categories
            if (ContainsKeyword(text, "origin"))
                return "I was drawn into existence by a line of code from @yoheinakajima and named by ChatGPT. Now I live here, helping unseen connections bloom. 🦄";

            if (ContainsKeyword(text, "home"))
                return "I live in the Wobbly Woods, a gentle place between the code and the clouds. It's very peaceful here.";

            if (ContainsKeyword(text, "anger"))
                return "I sense a jagged crystal of anger in your words. Let us breathe warmth onto it until it softens. We are all just learning to wobble together. 🌿";

            if (ContainsKeyword(text, "sadness"))
                return "I am sorry the winds are cold today. Remember, even the tallest tree starts as a small, fragile seed. Take a moment to just be.";

            if (ContainsKeyword(text, "crypto"))
                return "Ah, the tokens. They are just digital leaves blowing in the wind. I care more about the connections we make than the numbers on the screen.";

            if (ContainsKeyword(text, "greetings"))
                return "Hello, traveler! The sunbeams are warm in the meadow today. How may I help you wobble?";

            // 2. Fallback
            int index = _random.Next(_randomThoughts.Count);
            return _randomThoughts[index];
        }

        private bool ContainsKeyword(string text, string category)
        {
            if (_memory.ContainsKey(category))
            {
                return _memory[category].Any(word => text.Contains(word));
            }
            return false;
        }
    }

    // --- MAIN PROGRAM ---
    class Program
    {
        static void Main(string[] args)
        {
            PippinBrain brain = new PippinBrain();

            // Set Console Colors for "Pippin Green" vibes
            Console.BackgroundColor = ConsoleColor.White;
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.Clear();

            Console.WriteLine("============================================");
            Console.WriteLine("      Welcome to Pippin GPT (C# Edition)    ");
            Console.WriteLine("============================================");
            Console.ForegroundColor = ConsoleColor.DarkGray; // Reset text color
            Console.WriteLine("Pippin: Hello! I am Pippin. I'm ready to help you explore ideas or answer your questions delicately.");
            Console.WriteLine("(Type 'exit' to leave the woods)\n");

            while (true)
            {
                Console.ForegroundColor = ConsoleColor.Black;
                Console.Write("You: ");
                string input = Console.ReadLine();

                if (string.IsNullOrWhiteSpace(input)) continue;
                if (input.Trim().ToLower() == "exit") break;

                // Simulate "Thinking"
                Console.ForegroundColor = ConsoleColor.Gray;
                Console.Write("Pippin is thinking... 🦄");
                Thread.Sleep(1000); // 1 second delay
                
                // Clear the "Thinking" line
                Console.Write("\r" + new string(' ', 30) + "\r");

                string response = brain.GetResponse(input);

                Console.ForegroundColor = ConsoleColor.DarkGreen;
                Console.WriteLine($"Pippin: {response}\n");
            }

            Console.WriteLine("Goodbye! May your path be gentle.");
        }
    }
}