import { NextRequest, NextResponse } from 'next/server'

// TODO: Add OpenAI integration
// npm install openai
// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    // TODO: Replace with actual OpenAI call
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content: `You are a helpful assistant for Events On Charles, an elegant event venue in Providence, RI. 
    //                Key info:
    //                - Location: 593 Charles Street, Providence, RI 02904
    //                - Phone: (401) 671-6758
    //                - Email: info@eventsoncharles.com
    //                - Capacity: 20-150 guests
    //                - Packages: Wedding, Bridal Shower, Baby Shower, Birthday, Kids Party, Holiday, Intimate Dinner
    //                - Base prices: $1,300-$2,500 depending on package and guest count
    //                - Features: Historic building, full kitchen, bar service, event planning
    //                
    //                Always be helpful, professional, and try to book consultations/tours when appropriate.
    //                If you don't know specific pricing or availability, direct them to call or book a tour.`
    //     },
    //     {
    //       role: "user",
    //       content: message
    //     }
    //   ],
    //   max_tokens: 300,
    //   temperature: 0.7,
    // })

    // For now, return a placeholder response
    return NextResponse.json({
      response: "I'm your AI assistant for Events On Charles! I can help with questions about our venue, packages, and booking. What would you like to know?",
      actionType: "contact"
    })

    // TODO: When OpenAI is integrated, return:
    // return NextResponse.json({
    //   response: completion.choices[0].message.content,
    //   actionType: determineActionType(completion.choices[0].message.content)
    // })

  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { error: 'Failed to process AI request' },
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