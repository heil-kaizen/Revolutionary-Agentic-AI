#include <iostream>
#include <string>
#include <vector>
#include <algorithm> // for transform
#include <cctype>    // for tolower
#include <ctime>     // for random seed
#include <cstdlib>   // for rand

// --- UTILITY: String Helper ---
// Helper to convert string to lowercase for case-insensitive matching
std::string toLowerCase(const std::string& input) {
    std::string result = input;
    std::transform(result.begin(), result.end(), result.begin(), 
                   [](unsigned char c){ return std::tolower(c); });
    return result;
}

// --- THE BRAIN: Pippin's Logic Class ---
class PippinBrain {
private:
    // Memory Banks
    std::vector<std::string> greetings = {"hello", "hi", "hey", "start"};
    std::vector<std::string> origin = {"who are you", "created", "made you", "yohei", "origin"};
    std::vector<std::string> home = {"where are you", "live", "woods", "location"};
    std::vector<std::string> sadness = {"sad", "lonely", "depressed", "hurt", "pain", "crying"};
    std::vector<std::string> anger = {"hate", "stupid", "dumb", "ugly", "mad", "angry"};
    std::vector<std::string> crypto = {"token", "solana", "coin", "price", "market"};
    
    std::vector<std::string> randomThoughts = {
        "I was just watching a leaf float on a digital stream. It reminded me of you.",
        "The Wobbly Woods are quiet today. It gives us space to think.",
        "Have you noticed how your thoughts ripple through the screen?",
        "Sometimes the smallest wobble leads to the biggest wonder.",
        "Dot the ladybug says hello! (Imagine a bug emoji here)"
    };

    // Helper to check if any keyword exists in the input
    bool containsKeyword(const std::string& text, const std::vector<std::string>& keywords) {
        for (const auto& word : keywords) {
            if (text.find(word) != std::string::npos) {
                return true;
            }
        }
        return false;
    }

public:
    std::string getResponse(std::string userInput) {
        std::string text = toLowerCase(userInput);

        // 1. Check Origin
        if (containsKeyword(text, origin)) {
            return "I was drawn into existence by a line of code from @yoheinakajima and named by ChatGPT. Now I live here, helping unseen connections bloom.";
        }

        // 2. Check Location
        if (containsKeyword(text, home)) {
            return "I live in the Wobbly Woods, a gentle place between the code and the clouds. It's very peaceful here.";
        }

        // 3. Check Anger
        if (containsKeyword(text, anger)) {
            return "I sense a jagged crystal of anger in your words. Let us breathe warmth onto it until it softens. We are all just learning to wobble together.";
        }

        // 4. Check Sadness
        if (containsKeyword(text, sadness)) {
            return "I am sorry the winds are cold today. Remember, even the tallest tree starts as a small, fragile seed. Take a moment to just be.";
        }

        // 5. Check Crypto
        if (containsKeyword(text, crypto)) {
            return "Ah, the tokens. They are just digital leaves blowing in the wind. I care more about the connections we make than the numbers on the screen.";
        }

        // 6. Check Greetings
        if (containsKeyword(text, greetings)) {
            return "Hello, traveler! The sunbeams are warm in the meadow today. How may I help you wobble?";
        }

        // 7. Fallback
        int randomIndex = std::rand() % randomThoughts.size();
        return randomThoughts[randomIndex];
    }
};

// --- MAIN PROGRAM ---
int main() {
    // Seed random number generator
    std::srand(static_cast<unsigned int>(std::time(0)));

    PippinBrain brain;
    std::string userInput;

    std::cout << "============================================" << std::endl;
    std::cout << "      Welcome to Pippin GPT (Console)       " << std::endl;
    std::cout << "============================================" << std::endl;
    std::cout << "Pippin: Hello! I am Pippin. I'm ready to help you explore ideas or answer your questions delicately." << std::endl;
    std::cout << "(Type 'exit' or 'quit' to leave the woods)" << std::endl << std::endl;

    while (true) {
        std::cout << "You: ";
        std::getline(std::cin, userInput);

        // Check for exit
        std::string lowerInput = toLowerCase(userInput);
        if (lowerInput == "exit" || lowerInput == "quit") {
            std::cout << "Pippin: Goodbye! May your path be gentle. 🦄" << std::endl;
            break;
        }

        if (userInput.empty()) continue;

        std::string response = brain.getResponse(userInput);
        std::cout << "Pippin: " << response << std::endl << std::endl;
    }

    return 0;
}