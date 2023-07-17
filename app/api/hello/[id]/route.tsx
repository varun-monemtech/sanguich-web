import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
	// const res = await fetch('https://evgreen.unixstorm.org/FRS-3/wp-json/wp/v2/posts',
	// 	{
	// 		// cache: 'no-store',
	// 		next: {
	// 			revalidate: 10
	// 		}
	// 	}
	// )
	// return res.json()
	const id = params.id
	const {searchParams} = request.nextUrl
	const sort = searchParams.get('sort') // http://localhost:3000/api/hello/33?sort=asc
	return NextResponse.json(
		{
			message: 'Hello World',
			id,
			sort
		},
		{ status: 201 }
	)
}

