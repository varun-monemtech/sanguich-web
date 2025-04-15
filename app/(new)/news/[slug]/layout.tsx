
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
			<section className="post ">
				{children}
			</section>
  )
}