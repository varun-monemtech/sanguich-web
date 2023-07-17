import LoadTransition from '../../animations/LoadTransition'
import { NaviContextProvider } from '../../context/NaviContext'
import { Hamburger } from '../Hamburger'
import { Logo } from '../Logo'
import { NaviPrimary } from '../NaviPrimary'
import './style.scss'

async function getPosts() {
	const res = await fetch('https://evgreen.unixstorm.org/FRS-3/wp-json/wp/v2/posts',
		{
			// cache: 'no-store',
			next: {
				revalidate: 600
			}
		}
	)
	return res.json()
}

export const Header = async({ children }: { children?: React.ReactNode}) => {
	const postsResponse = getPosts()
	const [posts] = await Promise.all([postsResponse]) // this enable parallel fetching
	const items = posts

	return (
		<NaviContextProvider>
			<header className="master-header relative h-nav-h c5 t">
				<div className='master-second-row h-full'>
					<div className="leftside">
						{/* <Hamburger /> */}
						<Logo />
					</div>
					{children}
					{/* <LoadTransition>
					</LoadTransition> */}
					<NaviPrimary items={items} />
					{/* <SocialLinks /> */}
				</div>
			</header>
		</NaviContextProvider>
	)
}