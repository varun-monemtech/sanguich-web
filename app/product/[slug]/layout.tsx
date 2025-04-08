import PageTransition from '@/animations/PageTransition'
import { Container } from '@/components/Container'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
		<PageTransition>
			<main className="main-product">
				<div id="header-fold-breakpoint"></div>
				<section className="content product-presentation c5 grid-12 is-inview border-type-2 inview inview-rn">

					{children}

				</section>
			</main>
		</PageTransition>
  )
}