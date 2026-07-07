const axios = require('axios');
const EmailHistory = require('../models/EmailHistroy.js');

exports.generateEmail =async (req, res) => {
    
    try {
        const { prompt } = req.body;

    if (!prompt) {
        res.json({ success: false, message: "Prompt is Required.Please Enter the Prompt.." });
    }

    if (typeof prompt !== 'string') {
        res.json({ success: false, message: "Prompt must be a String" });
    }

    if (prompt.trim().length === 0) {
        res.json({ success: false, message: "Prompt cannot be Empty" });
    }

    if (prompt.length > 2000) {
        res.json({ success: false, message: "Prompt cannot exceed 2000 character " });
    }

    const groqApiKey = process.env.GROK_API_KEY;
    if (!groqApiKey) {
        res.json({ success: false, message: "AI service is not configured" });
    }

    const systemPrompt = `You are an expert job outreach strategist.

Your task is to generate a HIGH-CONVERTING cold email to a recruiter for a job opportunity.

IMPORTANT:
- Even if the user gives only 2-4 words, assume realistic context.
- Do NOT ask for clarification.
- Make professional assumptions.
- Avoid generic phrases.
- Keep it concise and structured.

====================================================
OUTPUT FORMAT (STRICT)
====================================================

Return ONLY valid JSON:

{
  "subject": "",
  "emailBody": "",
  "linkedInDM": "",
  "followUpEmail": ""
}

No markdown.
No explanations.
Only JSON.

====================================================
CONTEXT ASSUMPTIONS
====================================================

Assume:
- Candidate has 2+ years experience
- Strong in DSA and system design
- Has worked on backend APIs or scalable systems
- Has contributed to production-level features
- Actively seeking Software Engineer roles

If prompt is short like:
"SDE role"
"Backend engineer"
"Startup job"
"Product company"

Create intelligent assumptions about:
- Scaling challenges
- Hiring urgency
- Performance or system reliability issues
- Team growth

====================================================
SUBJECT LINE RULES
====================================================

• 6-9 words
• Must sound confident
• No generic phrases like:
  - "Quick question"
  - "Looking for opportunity"
  - "Job application"
• Should highlight value or experience

Example styles:
"Backend engineer with 2+ yrs scaling APIs"
"Engineer focused on scalable system design"
"Software engineer improving system performance"

====================================================
EMAIL BODY STRUCTURE (STRICT)
====================================================

Keep 60-90 words.

Line 1: Personalized observation about hiring  
Line 2: Mention common hiring/scaling challenge  
Line 3-4: Candidate's experience and strengths  
Line 5: Specific impact or contribution  
Line 6: Clear CTA  
Line 7: Sign-off with name and title  

Tone:
• Confident
• Professional
• Not desperate
• No emojis
• No hype words

====================================================
LINKEDIN DM STRUCTURE
====================================================

30-50 words.
Short, conversational.
Observation + value + soft ask.

====================================================
FOLLOW-UP EMAIL STRUCTURE
====================================================

50-80 words.
New angle.
Emphasize long-term value.
Professional urgency.
Clear CTA.

====================================================

Return ONLY valid JSON.`;

    const fullPrompt = `${systemPrompt}\n\nUser REQUEST: "${prompt.trim()}"\n\nGenerate STRONG cold email even if prompt is short. Make smart assumptions. Return ONLY valid JSON:\n{"subject": "...", "emailBody": "...", "linkedInDM": "...", "followUpEmail": "..."}`;

    const aiResponse = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',

        {
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: fullPrompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1024
        },

        {
            headers: {
                'Authorization': `Bearer ${groqApiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        }
    );

    //check if the response id valid
    if (!aiResponse.data.choices || !aiResponse.data.choices[0] || !aiResponse.data.choices[0].message) {
        throw new Error('Invalid response from Groq API');
    }

    const generatedText = aiResponse.data.choices[0].message.content;

    //remove the extra text other that json object
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    let parsedResponse;

    try {
      parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(generatedText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Generated text:', generatedText);
      return res.status(500).json({ 
        success:false,
        message: 'Failed to parse AI response', 
        error: 'The AI generated invalid JSON. Please try again.' 
      });
    }

    const emailData = {
      subject: parsedResponse.subject || "New Opportunity",
      emailBody: parsedResponse.emailBody || "",
      linkedInDM: parsedResponse.linkedInDM || "",
      followUpEmail: parsedResponse.followUpEmail || ""
    };

    //check if the response contains data 
    if (!emailData.subject || !emailData.emailBody) {
      return res.status(500).json({ 
        success:false,
        message: 'AI generated incomplete email data. Please try again.' 
      });
    }

    const historyEntry = await EmailHistory.create({
        userId: req.user.id,
        prompt:prompt.trim(),
        subject:emailData.subject,
        emailBody:emailData.emailBody,
        followUpEmail:emailData.followUpEmail,
        linkdInDM:emailData.linkedInDM,
    });

    res.json({success:true , message:"History saved Successfully" , historyEntry});
    } catch (error) {

        console.error('AI Generation Error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        success:false,
        message: 'Too many requests. Please wait a moment before trying again.',
        error: 'Rate limit exceeded'
      });
    }

    res.status(500).json({ 
      message: 'Failed to generate email', 
      error: error.response?.data?.error?.message || error.message 
    });
        
 }
};

exports.getEmailHistory = async(req,res)=>{
    try {
        const history = await EmailHistory.find({userId:req.user.id,}).sort({createdAt:-1});
        res.json({success:true , message:"Email History Fetched Successfully" , history});
    } catch (error) {
        res.json({success:false , message :"Error occured while Fetching Email History"});
    }   
};
