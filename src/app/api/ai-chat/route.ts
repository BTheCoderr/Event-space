import { NextRequest, NextResponse } from 'next/server'

// TODO: Add OpenAI integration
// npm install openai
// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Simple response for now
    return NextResponse.json({
      response: "Hello! I'm here to help with your event planning needs. How can I assist you today?"
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}

// Helper function to determine action type based on AI response
// function determineActionType(response: string): string {
//   if (response.toLowerCase().includes('quote') || response.toLowerCase().includes('price')) {
//     return 'quote'
//   }
//   if (response.toLowerCase().includes('book') || response.toLowerCase().includes('available')) {
//     return 'booking'
//   }
//   return 'contact'
// } 