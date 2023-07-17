import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const RESEND_API_KEY: string = process.env.RESEND_API_KEY!


// Rate limiter
const rateLimit = require("lambda-rate-limiter")({
  interval: 60 * 1000 // Our rate-limit interval, one minute
}).check


// Request
export async function POST(request: NextRequest) {

	// Rate Limiter
	const ip: string = request.ip!
	try {
    // 10 stands for the maximum amount of requests allowed during the defined interval
    // rateLimit now returns a promise, let's await for it! (◕‿◕✿)
    await rateLimit(3, ip)
  } catch (error) {
    return NextResponse.json({
			message: "Rate limit exceeded"
		}, {
			status: 429,
		})
  }

  // Extra info provided by next js request
	const city: string = request?.geo?.city!
	const country: string = request?.geo?.country!
	const url: string = request?.nextUrl?.basePath

  // Passed data
	const data: any = await request.json()

  // For debugging/discover of json
	const code: string = JSON.stringify(data, null, 2)

  // Send mail via RESEND
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'the242@gmail.com',
      subject: `Microprism Contact Form`,
      html: `${data.name}, ${data.email}, ${data.message}. Object: ${code}. IP: ${ip}. City: ${city}. Country: ${country}. URL: ${url}`,
    })
  })

  // If mail sent, send ok
  if (res.ok) {
    const data = await res.json()
    return NextResponse.json({
      message: "Thank you for your submission."
    }, {
      status: 200,
    })
  } else {
    return NextResponse.json({
      message: "We have encountered problems when sending the mail, please try again later."
    }, {
      status: res.status,
    })
  }
}