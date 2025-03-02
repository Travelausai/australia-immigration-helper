// AI Assistant Service
// This service handles communication with OpenAI API

interface AIResponse {
  message: string;
  status: 'success' | 'error';
}

// Default settings
let temperature = 0.7;
let maxTokens = 1500;
let apiKey = ""; // Default empty string, will be set via updateAISettings

// Function to update AI settings
export const updateAISettings = (settings: { apiKey?: string; temperature?: number; maxTokens?: number }) => {
  if (settings.apiKey) apiKey = settings.apiKey;
  if (settings.temperature) temperature = settings.temperature;
  if (settings.maxTokens) maxTokens = settings.maxTokens;
};

// Function to test the API connection
export const testAPIConnection = async (): Promise<{ success: boolean }> => {
  try {
    // Make a minimal request to OpenAI to test the connection
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 5
      })
    });
    
    if (response.ok) {
      return { success: true };
    } else {
      console.error('API test failed with status:', response.status);
      return { success: false };
    }
  } catch (error) {
    console.error('Error testing API connection:', error);
    return { success: false };
  }
};

// This function communicates with the OpenAI API
export const getAIResponse = async (userMessage: string): Promise<AIResponse> => {
  try {
    // Always use the OpenAI API in production
    const isDevMode = false;
    
    if (isDevMode) {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 1200));
      // Use local response generation as fallback
      const response = generateLocalResponse(userMessage);
      return { message: response, status: 'success' };
    }
    
    // Make the API call to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are an Australian immigration assistant specializing in providing information for UK citizens moving to Australia. Provide helpful, concise advice on visa types, points requirements, skills assessments, occupation lists, and the immigration process. Always be friendly and supportive." 
          },
          { role: "user", content: userMessage }
        ],
        temperature: temperature,
        max_tokens: maxTokens
      })
    });
    
    if (!response.ok) {
      console.error(`API call failed with status: ${response.status}`);
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return { 
      message: data.choices[0].message.content, 
      status: 'success' 
    };
  } catch (error) {
    console.error('Error getting AI response:', error);
    // Fall back to local response if API call fails
    const fallbackResponse = generateLocalResponse(userMessage);
    return { 
      message: fallbackResponse,
      status: 'error'
    };
  }
};

// Local response generation - used as fallback when API is unavailable
const generateLocalResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Enhanced pattern matching for common questions
  if (input.includes('visa') && (input.includes('type') || input.includes('kind'))) {
    return "Australia offers several visa types for skilled migrants, including the Skilled Independent Visa (subclass 189), Skilled Nominated Visa (subclass 190), and Skilled Work Regional Visa (subclass 491). Each has different requirements and benefits. You can check our Visa Types page for more details.";
  }
  
  if (input.includes('point') || input.includes('score')) {
    return "Most skilled migration visas require a minimum of 65 points to be eligible. Points are awarded based on factors like age, English language ability, work experience, education, and other factors. You can use our Points Calculator to see how many points you might score. The highest points are awarded for applicants aged 25-32 (30 points), with superior English (20 points), and relevant work experience.";
  }
  
  if (input.includes('english') || input.includes('language')) {
    return "You'll need to demonstrate your English language proficiency through an approved test like IELTS, PTE, TOEFL, or Cambridge. For IELTS, Competent English requires a score of 6 in each component, Proficient English requires 7 in each, and Superior English requires 8 in each. For PTE, the equivalent scores are 50, 65, and 79 respectively. Higher scores can earn you more points for your visa application.";
  }
  
  if (input.includes('pte') || input.includes('pearson')) {
    return "The Pearson Test of English (PTE) Academic is an approved English language test for Australian immigration. For immigration purposes, a PTE score of 50+ in each component is equivalent to Competent English, 65+ is equivalent to Proficient English, and 79+ is equivalent to Superior English. PTE scores are valid for 3 years for immigration purposes.";
  }
  
  if (input.includes('ielts')) {
    return "The International English Language Testing System (IELTS) is widely accepted for Australian immigration. For skilled migration, you need a minimum score of 6 in each component (Competent English). A score of 7 in each component is considered Proficient English (10 points), and 8 in each component is Superior English (20 points). IELTS scores are valid for 3 years for immigration purposes.";
  }
  
  if (input.includes('skill') && input.includes('assessment')) {
    return "A skills assessment verifies that your skills and qualifications meet Australian standards for your nominated occupation. You'll need to apply to the relevant assessing authority for your profession. For example, ACS for IT professionals, Engineers Australia for engineers, and VETASSESS for many managerial and professional occupations. This is a mandatory step before applying for most skilled visas.";
  }
  
  if (input.includes('occupation') && (input.includes('list') || input.includes('mltssl') || input.includes('stsol'))) {
    return "Australia uses several occupation lists to determine visa eligibility. The Medium and Long-term Strategic Skills List (MLTSSL) includes occupations eligible for Skilled Independent (189), Skilled Nominated (190), and Skilled Work Regional (491) visas. The Short-term Skilled Occupation List (STSOL) includes occupations only eligible for 190 and 491 visas. Each occupation has an ANZSCO code and designated assessing authority. You can find these details in our Resources section.";
  }
  
  if (input.includes('mltssl')) {
    return "The Medium and Long-term Strategic Skills List (MLTSSL) includes occupations that are in high demand in Australia over the long term. Occupations on this list are eligible for Skilled Independent (subclass 189), Skilled Nominated (subclass 190), and Skilled Work Regional (subclass 491) visas. Examples include software engineers, civil engineers, registered nurses, and accountants. You can find the complete list with ANZSCO codes in our Resources section.";
  }
  
  if (input.includes('stsol') || input.includes('short term')) {
    return "The Short-term Skilled Occupation List (STSOL) includes occupations that are in demand but not necessarily for the long term. Occupations on this list are eligible for Skilled Nominated (subclass 190) and Skilled Work Regional (subclass 491) visas, but not for Skilled Independent (subclass 189) visas. You can find the complete list with ANZSCO codes in our Resources section.";
  }
  
  if (input.includes('anzsco')) {
    return "ANZSCO (Australian and New Zealand Standard Classification of Occupations) codes are used to classify all occupations in Australia. Each skilled occupation has a unique 6-digit ANZSCO code. When applying for skilled migration, you must nominate an occupation that matches your skills and qualifications, and provide its ANZSCO code. The code determines which skilled occupation list your occupation is on and which assessing authority will assess your skills.";
  }
  
  if (input.includes('cost') || input.includes('fee') || input.includes('price')) {
    return "Visa application fees vary depending on the visa type. As of 2023, the base application fee for a subclass 189 visa is approximately AUD 4,240 for the main applicant. Additional costs include skills assessments (AUD 500-1,000+), English tests (AUD 300-400), health examinations (AUD 300-400 per person), and police certificates (AUD 50-150 per country). There may also be additional fees for including family members in your application.";
  }
  
  if (input.includes('time') || input.includes('long') || input.includes('process')) {
    return "Processing times vary by visa type and individual circumstances. Generally, skilled visas can take anywhere from 6 to 18 months to process. The Department of Home Affairs provides estimated processing times on their website. The entire immigration process, including skills assessment, English testing, and visa application, can take 1-2 years from start to finish. Regional visas (subclass 491) are often processed more quickly than other skilled visas.";
  }
  
  if (input.includes('family') || input.includes('partner') || input.includes('child')) {
    return "You can include family members in your visa application. This typically includes your partner (spouse or de facto) and dependent children. They'll need to meet health and character requirements, and additional fees apply for each family member. Your partner can contribute to your points score if they also meet certain skills and English language requirements. If your partner is included in your application, they will receive the same visa and rights as you.";
  }
  
  if (input.includes('regional') || input.includes('491')) {
    return "Regional visas, such as the Skilled Work Regional (Provisional) visa (subclass 491), require you to live and work in designated regional areas of Australia for at least 3 years. After that, you may be eligible for permanent residency through the Permanent Residence (Skilled Regional) visa (subclass 191). Regional visas often have lower points thresholds and faster processing times. They also receive an additional 15 points in the points test.";
  }
  
  if (input.includes('thank')) {
    return "You're welcome! Feel free to ask if you have any other questions about Australian immigration. I'm here to help with information about visa types, points calculations, occupation lists, and the application process.";
  }
  
  if (input.includes('facebook') || input.includes('group') || input.includes('community')) {
    return "We've added several helpful Facebook groups to our Resources page! These include 'UK to Australia Migration', 'Moving to Australia from the UK', 'UK to Australia - Skilled Migration Pathway', 'Pets to Australia - UK Migration', and 'UK Families Moving to Australia'. These communities can provide valuable insights and support from people who are going through or have completed the migration process.";
  }
  
  // Default response
  return "I'm not sure I understand your question. Could you try rephrasing it? You can ask about visa types, points requirements, skills assessments, occupation lists, or other aspects of the Australian immigration process.";
}; 