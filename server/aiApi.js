//import dotenv from 'dotenv';
//import OpenAI from 'openai/index.mjs';
//
//dotenv.config();
//const apiKey = process.env.OPEN_AI_API_KEY;
//
//const openai = new OpenAI(apiKey);
//
///**
// * Generates a response from OpenAI based on the provided prompt.
// * @param {string} prompt - The text prompt to send to OpenAI.
// * @returns {Promise<string>} - The response text from OpenAI.
// */
//export async function generateResponse(prompt) {
//    try {
//        const completion = await openai.chat.completions.create({
//            model: "gpt-4o-mini",
//            messages: [
//                { role: "system", content: "You are a helpful assistant." },
//                { role: "user", content: prompt },
//            ],
//        });
//        return completion.choices[0].message.content;
//    } catch (error) {
//        console.error("Error fetching response:", error);
//        throw error;
//    }
//}