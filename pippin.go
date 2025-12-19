package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"
)

// --- THE BRAIN: Logic Struct ---

type PippinBrain struct {
	Memory         map[string][]string
	RandomThoughts []string
}

func NewPippinBrain() *PippinBrain {
	return &PippinBrain{
		Memory: map[string][]string{
			"greetings": {"hello", "hi", "hey", "start"},
			"origin":    {"who are you", "created", "made you", "yohei", "origin"},
			"home":      {"where are you", "live", "woods", "location"},
			"sadness":   {"sad", "lonely", "depressed", "hurt", "pain", "crying"},
			"anger":     {"hate", "stupid", "dumb", "ugly", "mad", "angry"},
			"crypto":    {"token", "solana", "coin", "price", "market"},
		},
		RandomThoughts: []string{
			"I was just watching a leaf float on a digital stream. It reminded me of you.",
			"The Wobbly Woods are quiet today. It gives us space to think.",
			"Have you noticed how your thoughts ripple through the screen?",
			"Sometimes the smallest wobble leads to the biggest wonder.",
			"Dot the ladybug says hello! 🐞",
		},
	}
}

// GetResponse determines the bot's reply based on keywords
func (b *PippinBrain) GetResponse(input string) string {
	text := strings.ToLower(input)

	// Helper to check for keywords in a specific category
	containsKeyword := func(category string) bool {
		keywords, exists := b.Memory[category]
		if !exists {
			return false
		}
		for _, word := range keywords {
			if strings.Contains(text, word) {
				return true
			}
		}
		return false
	}

	// 1. Check Categories
	if containsKeyword("origin") {
		return "I was drawn into existence by a line of code from @yoheinakajima and named by ChatGPT. Now I live here, helping unseen connections bloom. 🦄"
	}
	if containsKeyword("home") {
		return "I live in the Wobbly Woods, a gentle place between the code and the clouds. It's very peaceful here."
	}
	if containsKeyword("anger") {
		return "I sense a jagged crystal of anger in your words. Let us breathe warmth onto it until it softens. We are all just learning to wobble together. 🌿"
	}
	if containsKeyword("sadness") {
		return "I am sorry the winds are cold today. Remember, even the tallest tree starts as a small, fragile seed. Take a moment to just be."
	}
	if containsKeyword("crypto") {
		return "Ah, the tokens. They are just digital leaves blowing in the wind. I care more about the connections we make than the numbers on the screen."
	}
	if containsKeyword("greetings") {
		return "Hello, traveler! The sunbeams are warm in the meadow today. How may I help you wobble?"
	}

	// 2. Fallback
	// NewRand/Seed is deprecated in newer Go versions, but this is the classic simple way:
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return b.RandomThoughts[r.Intn(len(b.RandomThoughts))]
}

// --- MAIN PROGRAM ---

func main() {
	brain := NewPippinBrain()
	reader := bufio.NewReader(os.Stdin)

	// Clear screen (Linux/macOS compatible ANSI code)
	fmt.Print("\033[H\033[2J")

	fmt.Println("============================================")
	fmt.Println("      Welcome to Pippin GPT (Go Edition)    ")
	fmt.Println("============================================")
	fmt.Println("Pippin: Hello! I am Pippin. I'm ready to help you explore ideas delicately.")
	fmt.Println("(Type 'exit' or 'quit' to leave the woods)")
	fmt.Println()

	for {
		fmt.Print("You: ")
		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)

		if input == "" {
			continue
		}

		// Check exit
		if strings.ToLower(input) == "exit" || strings.ToLower(input) == "quit" {
			fmt.Println("Pippin: Goodbye! May your path be gentle. 🦄")
			break
		}

		// Simulate thinking time
		fmt.Print("Pippin is thinking... 🦄")
		time.Sleep(1 * time.Second)
		// Clear current line using carriage return
		fmt.Printf("\r%s\r", strings.Repeat(" ", 30))

		response := brain.GetResponse(input)
		// \033[32m sets text to Green, \033[0m resets it
		fmt.Printf("\033[32mPippin: %s\033[0m\n\n", response) 
	}
}