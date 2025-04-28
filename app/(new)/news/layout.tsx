import Intro from "@/animations/Intro_Framer";
import BorderHeading from "../_components/BorderHeading";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {


	return (
		<div className="frs-grid bg-[#D0C8B9]">
			<BorderHeading className=" pt-13 " filterColor="green">
				<h2 className={` m-0 px-[0.1em] py-0  font2  z-[1001] text-[#274F37] bg-[#D0C8B9]`} >News</h2>
			</BorderHeading>
			{children}
		</div>
	)
}