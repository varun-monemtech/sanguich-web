import ACF from "../../WP/ACF"
import PageTransition from '../../animations/PageTransition'
import { Container } from "../../components/Container"

async function getPost() {
	const res = await fetch(`https://evgreen.unixstorm.org/FRS-3/wp-json/wp/v2/pages?slug=about`,
		{
			// cache: 'no-store',
			next: {
				revalidate: 10
			}
		}
	)
	const data = await res.json()
	return data[0]
}


export default async function MainPage() {
	const data = await getPost()
	
	return (
		<PageTransition>
			<div className="c0 padd-2">
				<Container>

					<h1 className="h1">{data?.title?.rendered}</h1>
					{/* <div
						dangerouslySetInnerHTML={{ __html: data?.content?.rendered }}
					/> */}

					<ACF {...data} />


					{/* <button id="showDialog" onClick={() => document.getElementById("favDialog").showModal()}>Show the dialog</button> */}

					{/* <button onClick={document.getElementById('test').showModal()}>click for modal</button> */}

					{/* <pre>
						<code>{JSON.stringify(post, null, 2)}</code>
					</pre> */}

					{/* <div 
						className={classNames('shadow-small', {
							'hover:shadow-medium transition-shadow duration-200': slug,
						})}
					/> */}
					
				</Container>
			</div>
		</PageTransition>
	)
}