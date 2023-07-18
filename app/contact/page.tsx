import PageTransition from '../../animations/PageTransition'
import CF7Contact from '../../components/Form/CF7/Contact'
import './style.scss'

export default async function MainPage() {
	
	return (
		<PageTransition>
			
      <main id="mainframe" className={`main-cart page-cart c5`}>

				<section id={`section-contact`} className={`content c5 grid-12 is-inview inview`}>

          <div className="catering span-12 border-type-3 fs-85">

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

            <CF7Contact />
            
          </div>

          </section>

      </main>

		</PageTransition>
	)
}