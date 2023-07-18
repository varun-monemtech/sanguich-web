// import classNames from "classnames"
import Image from "next/image"
import PageTransition from '../animations/PageTransition'
import { Container } from "../components/Container"
import { Hero, HeroSubTitle, HeroTitle } from "../components/Hero"
import { Background } from "../components/Background"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas, faFire, faMugHot, faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "../components/Loader"
import { LoadImage } from "../components/LoadImage"
import ArtemisForm from "../components/Form"

import Menu from '../components/ACF/Sanguich/Menu'
import ACFOrder from '../components/ACF/Sanguich/Order'
import ACFSeenOn from '../components/ACF/Sanguich/SeenOn'
import ACFHero from "../components/ACF/Hero"

async function getPage() {
	const res = await fetch('https://cms.sanguich.com/wp-json/acf/v3/pages/5',
		{
			// cache: 'no-store',
			next: {
				revalidate: 600
			}
		}
	)
	return res.json()
}


export default async function MainPage() {
	const page = await getPage()

  const Sections = page?.acf?.sections.map((section: any, i: number) => {

    if(section.acf_fc_layout === 'hero') {
      return (
        <div key="hero-main">
          <ACFHero { ...section } />
          {/* Point of reference for past hero observer threashold, so we can calculate if the user is past hero or not */}
          <div id="header-fold-breakpoint"></div>
        </div>
      )
    }
   
    if(section.acf_fc_layout === 'menu') {
      return (
        <Menu key={section.id} { ...section } />
      )
    }

    if(section.acf_fc_layout === 'order') {
      return (
        <ACFOrder key={section.id} { ...section } />
      )
    }

    if(section.acf_fc_layout === 'seen_on') {
      return (
        <ACFSeenOn key={section.id} { ...section } />
      )
    }
    
  })
	
	return (
		<PageTransition>

			{Sections ? Sections : null}

			{/* <Hero className="c5 items-center padd">
				<div className="text-left">
					<HeroTitle>precision in <span className="fat">design</span>,<br/><span className="fat">beauty</span> in performance,<br/><span className="fat">power</span> in simplicity</HeroTitle>
					<HeroSubTitle>we are a small team of skilled developers focused to provide excellently performing, elegantly built landing websites for your growing business</HeroSubTitle>
				</div>
				<LoadImage
					src='/img/biuro.jpg'
					width="2200"
					height="1500"
					quality="90"
					className="bg inset-0"
					alt=''
					// placeholder='blur'
					priority
				/>
			</Hero> */}

			{/* <section className="c0 padd padd-top-2 padd-bottom-2">

				<Container>
					<div className="flex-12">
						<div className="span-12 padd-third padd-bottom">
							<h1>what is microprism<span className="colored">*</span></h1>
							<p className="fs-1125"><span className="colored">*</span> at microprism - we build fast, reliable and easy-to-use website solutions that we tailor to your needs. <br/>We strive to take away all the hurdles of getting your first website out there to promote your business, so that you can focus on what you do best.</p>
							<hr className="padd-top-hr"/>
						</div>
						<div className="feature-box span-3 span-6-tablet span-12-mobile padd-third">
							<div className="aspect-ratio">
								<div className="feature-box-positioner">
									<div className="feature-box-icon">
										<FontAwesomeIcon icon={faPiggyBank} />
									</div>
								</div>
							</div>
							<h3 className="uppercase">Low cost solution</h3>
							<h2 className="uppercase">Affordable</h2>
							<p>We offer cost-effective solutions for businesses, enabling them to establish a professional online presence, reach a wider audience, and generate potential leads and sales.</p>
						</div>
						<div className="feature-box span-3 span-6-tablet span-12-mobile padd-third">
							<div className="aspect-ratio">
								<div className="feature-box-positioner">
									<div className="feature-box-icon">
										<FontAwesomeIcon icon={faFire} />
									</div>
								</div>
							</div>
							<h3 className="uppercase">Solid framework</h3>
							<h2 className="uppercase">Blazing fast</h2>
							<p>Our framework provides an enhanced user experience, improves search engine rankings, reduces bounce rates, and increases conversion rates, ultimately leading to higher customer satisfaction and business success.</p>
						</div>
						<div className="feature-box span-3 span-6-tablet span-12-mobile padd-third">
							<div className="aspect-ratio">
								<div className="feature-box-positioner">
									<div className="feature-box-icon">
										<FontAwesomeIcon icon={faEarthAmericas} />
									</div>
								</div>
							</div>
							<h3 className="uppercase">Dedicated &amp; caring</h3>
							<h2 className="uppercase">Support</h2>
							<p>We offer resolution of technical issues, personalized assistance, and a positive user experience, fostering trust, loyalty, and long-term customer satisfaction.</p>
						</div>
						<div className="feature-box span-3 span-6-tablet span-12-mobile padd-third">
							<div className="aspect-ratio">
								<div className="feature-box-positioner">
									<div className="feature-box-icon">
										<FontAwesomeIcon icon={faMugHot} />
									</div>
								</div>
							</div>
							<h3 className="uppercase">Flexibility</h3>
							<h2 className="uppercase">Ease of use</h2>
							<p>We empower businesses to update, modify, and publish content effortlessly, ensuring timely information delivery, better organization, and improved scalability, resulting in a more dynamic and engaging user experience.</p>
						</div>
					</div>
				</Container>

			</section> */}

			{/* <pre>
				<code>{JSON.stringify(options.acf?.logo, null, 2)}</code>
			</pre> */}

			{/* <section className="above-all flex-12 c5">
				<Background>
					<LoadImage src='/img/footer.jpg' width="2200" height="500" quality="90" alt=''/>
				</Background>
				<div className="span-12 padd-2 ai-center text-center z-100">
					<Loader className="x0 t" />
					<h2 className="uppercase fat h4">Above all, we want our work to be part of a new and better web</h2>
					<h6 className="by">- Daniel, co-founder</h6>
					<hr className="center"/>
				</div>
			</section> */}

			{/* <section className="awards c3 padd padd-bottom-1-5">
				<Container>
					<div className="flex-12">
						<Image src='/img/backdrop-webby.svg' className="backdrop-award-1" width="2200" height="500" quality="90" alt=''/>
						<Image src='/img/backdrop-webby.svg' className="backdrop-award-2" width="2200" height="500" quality="90" alt=''/>
						<div className="span-12 padd padd-bottom-off ai-center text-center z-100">
							<h2 className="uppercase fat h4">Our efforts have been recognized</h2>
							<h6 className="by">We focus on delivering high quality product, no matter who the client is.<br/>Projects we've been crucial part of have been awarded many times.</h6>
							<hr className="center"/>
						</div>
						<div className="span-3 span-6-tablet span-12-mobile padd-quart padd-top-half text-center">
							<div className="award">
								<Image src='/img/webby.svg' className="award-webby" width="2200" height="500" quality="90" alt=''/>
							</div>
							<h3 className="uppercase fat h5">Webbys</h3>
							<p>Winners, honorees and nominees.</p>
						</div>
						<div className="span-3 span-6-tablet span-12-mobile padd-quart padd-top-half text-center">
							<div className="award">
								<Image src='/img/cssda.svg' className="award-cssda" width="2200" height="500" quality="90" alt=''/>
							</div>
							<h3 className="uppercase fat h5">CSSDA</h3>
							<p>Recognized in various categories.</p>
						</div>
						<div className="span-3 span-6-tablet span-12-mobile padd-quart padd-top-half text-center">
							<div className="award">
								<Image src='/img/awwwards.svg' className="award-awwwards" width="2200" height="500" quality="90" alt=''/>
							</div>
							<h3 className="uppercase fat h5">Awwwards</h3>
							<p>Honorees in user vote.</p>
						</div>
						<div className="span-3 span-6-tablet span-12-mobile padd-quart padd-top-half text-center">
							<div className="award">
								<Image src='/img/envato.svg' className="award-envato" width="2200" height="500" quality="90" alt=''/>
							</div>
							<h3 className="uppercase fat h5">Envato</h3>
							<p>Elite authors since 2010.</p>
						</div>
					</div>
				</Container>
			</section> */}

			{/* <section className="cta flex-12 c5 padd-2">
				<div className="span-12 ai-center text-center z-100">
					<h2 className="uppercase fat h4">Interested?</h2>
					<h6 className="by">Fill out the form and we will get back to you</h6>
					<hr className="center"/>
				</div>
				<div className="span-4 m-auto">
					<ArtemisForm formType="Contact" />
				</div>
				<Background>
					<Image src='/img/waves.jpg' width="2560" height="900" quality="90" alt=''/>
				</Background>
			</section> */}

			{/* <section className="above-all flex-12 c0">
				<Background>
					<Image src='/img/dune.jpg' width="2200" height="500" quality="90" alt=''/>
				</Background>
				<div className="span-12 padd-2 ai-center text-center z-100">
					<h2 className="uppercase fat h4">Pricing and tiers coming soon!</h2>
					<h6 className="by">We are excited to work with you!</h6>
					<hr className="center"/>
				</div>
			</section> */}


			{/* <pre>
				<code>{JSON.stringify(page, null, 2)}</code>
			</pre> */}

		</PageTransition>
	)
}