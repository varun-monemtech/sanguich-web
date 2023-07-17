


export async function GET(request: Request) {
	// const res = await fetch('https://evgreen.unixstorm.org/FRS-3/wp-json/wp/v2/posts',
	// 	{
	// 		// cache: 'no-store',
	// 		next: {
	// 			revalidate: 10
	// 		}
	// 	}
	// )
	// return res.json()
	return new Response('hi')
}

