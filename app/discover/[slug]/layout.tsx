import PageTransition from '../../../animations/PageTransition'
import { Container } from '../../../components/Container'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
		<PageTransition>
			<section className="post c0 padd-2 padd-top-1-5">

			<Container>
				{children}
			</Container>

			</section>
		</PageTransition>
  )
}