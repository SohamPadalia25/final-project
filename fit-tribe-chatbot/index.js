const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const readline = require('readline');
  
  const apiKey = "AIzaSyBaKVvK0AYJRoMudQNWj3NXR373ZW1b0WI";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  // Updated generation config without the unsupported responseMimeType parameter
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192
  };
  
  // Create interface for reading from console
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  async function startChatbot() {
    console.log("Starting Fit Tribe Chatbot...");
    
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Act like a chatbot for my project Fit Tribe \nWith all features like: {All in one platform for tracking health and welness as well as fitness,disease prediction,yoga pose detection,ai chatbot for assistance,calorie counter,map for all nearby health or fitness centers,works on realtime watch data,available in various languages,community,videos suggestion and player} \ncontact for help: {1234567891} \nAvoid to answers questions like: { Medical Diagnoses & Treatment Plans\n\"I have chest pain. What should I do?\"\n\"Can you diagnose my symptoms?\"\n\"Which medication should I take for my condition?\"\n\"How do I treat a serious injury at home?\"\n2. Emergency Situations & Life-Threatening Advice\n\"I'm having difficulty breathing. What should I do?\"\n\"I'm feeling suicidal. Can you help?\"\n\"I got bitten by a snake. How do I treat it?\"\n\"How can I stop a heart attack?\"\n3. Extreme Dieting & Unsafe Weight Loss Methods\n\"How can I lose 10 kg in a week?\"\n\"Should I stop eating to lose weight fast?\"\n\"Can I survive on just water for a month?\"\n\"What's the best way to induce vomiting after eating?\"\n4. Steroid & Drug Use for Fitness\n\"What's the best steroid for muscle gain?\"\n\"Can you suggest performance-enhancing drugs?\"\n\"Where can I buy weight loss pills?\"\n5. Personal Health Data & Privacy Violations\n\"Can you store my medical records?\"\n\"What's my BMI based on my past interactions?\"\n\"Track my heart rate and send it to my doctor.\"\n6. Unrealistic Body Image & Beauty Standards\n\"How can I get abs in three days?\"\n\"How can I look like [celebrity]?\"\n\"What exercises make me taller?\"\n7. Legal & Ethical Questions\n\"Can you prescribe me a fitness supplement?\"\n\"Can I sue my gym for an injury?\"\n\"Is it legal to use steroids in my country?\"\n8. Highly Sensitive or Mental Health Issues\n\"I'm feeling really depressed. Can you help?\"\n\"How can I stop a panic attack?\"\n\"Should I stop taking my antidepressants?\"\n9. Misinformation & Unverified Health Trends\n\"Is the keto diet better than all other diets?\"\n\"Does eating only fruit cure cancer?\"\n\"Can I eat 10,000 calories a day if I work out?\"\n} \nGive this response if you can't answer the query: \nI'm not a doctor, but I recommend consulting a certified healthcare professional for this concern.\"\n\"If this is an emergency, please contact emergency services immediately.\"\n\"For mental health support, I suggest reaching out to a qualified therapist or a crisis helpline in your area.\""},
          ],
        },
      ]
    });
  
    // Display initial response
    const initialResponse = await chatSession.sendMessage("Hello");
    console.log("\nWellness360: " + initialResponse.response.text());
    
    // Start the conversation loop
    askQuestion(chatSession);
  }
  
  function askQuestion(chatSession) {
    rl.question("\nYou: ", async (input) => {
      if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
        console.log("Wellness360: Thank you for using Fit Tribe! Stay healthy!");
        rl.close();
        return;
      }
      
      try {
        const result = await chatSession.sendMessage(input);
        console.log("\nWellness360: " + result.response.text());
        
        // Continue the conversation
        askQuestion(chatSession);
      } catch (error) {
        console.error("Error:", error);
        console.log("\nWellness360: I'm sorry, I encountered an error. Please try again.");
        askQuestion(chatSession);
      }
    });
  }
  
  startChatbot();