import PageTransition from '../../../animations/PageTransition'
import { Container } from '../../../components/Container'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
		<PageTransition>
			<section className="post">

			<Container>
				{children}
			</Container>

			</section>
		</PageTransition>
  )
}