
import { GoogleGenAI, Type } from "@google/genai";
import { DonorProfile, Campaign, PersonalizedJourney, CommunicationChannel, CauseArea } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const journeySchema = {
  type: Type.OBJECT,
  properties: {
    welcomeMessage: {
      type: Type.STRING,
      description: "A warm, personalized welcome message for the donor, mentioning their name and interests."
    },
    recommendedCampaigns: {
      type: Type.ARRAY,
      description: "An array of 3 to 5 recommended campaigns that best match the donor's profile. Diversify the recommendations.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "The unique ID of the campaign." },
          name: { type: Type.STRING, description: "The name of the campaign." },
          ngo: { type: Type.STRING, description: "The NGO running the campaign." },
          causeArea: { type: Type.STRING, enum: Object.values(CauseArea), description: "The primary cause area." },
          description: { type: Type.STRING, description: "A brief description of the campaign." },
          imageUrl: { type: Type.STRING, description: "URL for the campaign image." },
          matchRationale: { 
            type: Type.STRING, 
            description: "A concise, user-friendly explanation (1-2 sentences) of why this campaign is a good match for the donor, referencing their specific interests or location."
          }
        },
        required: ["id", "name", "ngo", "causeArea", "description", "imageUrl", "matchRationale"]
      }
    },
    suggestedDonationTiers: {
      type: Type.ARRAY,
      description: "Four suggested donation tiers (Micro, Small, Medium, Macro) with amounts scaled to the donor's capacity. Each tier must have a concrete impact statement.",
      items: {
        type: Type.OBJECT,
        properties: {
          level: { type: Type.STRING, enum: ["Micro", "Small", "Medium", "Macro"] },
          amount: { type: Type.NUMBER, description: "A suggested donation amount." },
          description: { type: Type.STRING, description: "A brief, encouraging description for this donation level." },
          impact: { type: Type.STRING, description: "A specific, tangible example of what this donation amount can achieve for a recommended campaign (e.g., 'Provides 10 hot meals for a senior')." }
        },
        required: ["level", "amount", "description", "impact"]
      }
    },
    engagementPlan: {
      type: Type.ARRAY,
      description: "A 4-week engagement plan with one step per week. Each step should use one of the donor's preferred communication channels.",
      items: {
        type: Type.OBJECT,
        properties: {
          week: { type: Type.NUMBER },
          channel: { type: Type.STRING, enum: Object.values(CommunicationChannel) },
          topic: { type: Type.STRING, description: "The theme or subject of the communication (e.g., 'Impact Story', 'Volunteer Spotlight')." },
          contentSnippet: { type: Type.STRING, description: "A short, engaging snippet of the message content." }
        },
        required: ["week", "channel", "topic", "contentSnippet"]
      }
    }
  },
  required: ["welcomeMessage", "recommendedCampaigns", "suggestedDonationTiers", "engagementPlan"]
};

export const generatePersonalizedJourney = async (
  donorProfile: DonorProfile,
  campaigns: Campaign[]
): Promise<PersonalizedJourney> => {
  const prompt = `
    **Objective:** Create a personalized donor journey for a user in Singapore, based on their profile and a list of available social service campaigns.

    **Context:** The user is interacting with a platform designed to connect them with causes from organizations like MSF (Ministry of Social and Family Development) and NCSS (National Council of Social Service). The tone should be warm, respectful, and encouraging.

    **Donor Profile:**
    - Name: ${donorProfile.name}
    - Preferred Language: ${donorProfile.language}
    - Location: ${donorProfile.location}
    - Interests (Cause Areas): ${donorProfile.interests.join(', ')}
    - Monthly Donation Capacity: S$${donorProfile.donationCapacity.min} - S$${donorProfile.donationCapacity.max}
    - Preferred Communication Channels: ${donorProfile.preferredChannels.join(', ')}

    **Available Campaigns:**
    ${JSON.stringify(campaigns, null, 2)}

    **Task:**
    Based on the donor's profile and the available campaigns, generate a JSON object that strictly follows the provided schema. The journey should be highly personalized and relevant.
    1.  **Welcome Message:** Craft a welcome message that greets the donor by name and acknowledges their stated interests.
    2.  **Recommended Campaigns:** Select the 3-5 most relevant campaigns. Prioritize campaigns that directly match the donor's interests. If there's a location match, consider it a bonus. Provide a clear, concise 'matchRationale' for each.
    3.  **Suggested Donation Tiers:** Create four donation tiers (Micro, Small, Medium, Macro). The 'amount' for each should be reasonable and fall within the donor's donation capacity. The 'Medium' tier should be around the midpoint of their capacity. The 'impact' statement for each tier must be specific and tied to one of the recommended campaigns.
    4.  **Engagement Plan:** Design a simple 4-week communication plan. Each week should feature a different topic and use one of the donor's preferred channels.
    
    Return ONLY the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: journeySchema,
      },
    });
    
    const journeyJson = JSON.parse(response.text.trim());
    
    // Data validation and enrichment
    const enrichedJourney: PersonalizedJourney = {
      ...journeyJson,
      recommendedCampaigns: journeyJson.recommendedCampaigns.map((rec: any) => {
        const originalCampaign = campaigns.find(c => c.id === rec.id);
        return {
          ...originalCampaign,
          ...rec,
        };
      })
    };
    
    return enrichedJourney;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate personalized journey from AI model.");
  }
};
