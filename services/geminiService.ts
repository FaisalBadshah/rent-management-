
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeRentTrends = async (rentData: any) => {
  // Use gemini-3-pro-preview for complex reasoning and data analysis tasks
  const model = 'gemini-3-pro-preview';
  const prompt = `
    As a professional Real Estate Analyst in India, analyze the following rent collection data for an owner:
    ${JSON.stringify(rentData)}
    
    Provide:
    1. A summary of collection efficiency.
    2. Recommendations for improvement.
    3. Potential risks identified (e.g., late payments trend).
    Keep it professional, concise and actionable.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    // Return extracted text; fallback to a default message if response.text is undefined
    return response.text || "Unable to generate AI analysis at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate AI analysis at this time.";
  }
};

export const predictMaintenanceIssues = async (history: any, propertyDetails: any) => {
  // Use gemini-3-pro-preview for complex forecasting based on history
  const model = 'gemini-3-pro-preview';
  const prompt = `
    Given the property details and maintenance history:
    Property: ${JSON.stringify(propertyDetails)}
    History: ${JSON.stringify(history)}
    
    Predict the next 3 likely maintenance issues this owner will face. 
    Focus on Indian construction common issues (plumbing, seepage, electrical during monsoons).
    Format as a concise list with estimated urgency.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "No predictions available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "No predictions available.";
  }
};

export const draftLegalAgreement = async (owner: string, tenant: string, property: string, rent: number) => {
  // Use gemini-3-pro-preview for high-quality legal drafting
  const model = 'gemini-3-pro-preview';
  const prompt = `
    Draft a concise, legally robust residential rent agreement summary for India:
    Owner: ${owner}
    Tenant: ${tenant}
    Property: ${property}
    Rent: ₹${rent}
    Include standard clauses for 11 months, 10% escalation, and maintenance responsibilities.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Error drafting agreement.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error drafting agreement.";
  }
};
