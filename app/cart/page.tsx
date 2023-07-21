import PageTransition from '../../animations/PageTransition'
import Cart from '../../OLD/Cart'

export default async function PageCart() {
	
	return (
		<PageTransition>
			
      <main id="mainframe" className={`main-cart page-cart c5`}>

        <section className="is-inview inview section-cart c5 border-type-2">
          <div className="decor-wrap">
            <div className="decor-top">
              <div className="decor-top-left"></div>
              <div className="decor-top-center"></div>
              <div className="decor-top-right"></div>
            </div>
            <div className="decor-center">
              <div className="decor-center-left"></div>
              <div className="decor-center-right"></div>
            </div>
            <div className="decor-bottom">
              <div className="decor-bottom-left"></div>
              <div className="decor-bottom-center"></div>
              <div className="decor-bottom-right"></div>
            </div>
          </div>

          <h1>Cart</h1>
          <Cart />
        </section>

      </main>

		</PageTransition>
	)
}