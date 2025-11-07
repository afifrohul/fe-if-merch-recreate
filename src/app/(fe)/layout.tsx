import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function FeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-2">
      <div className="w-full flex flex-col gap-6 lg:gap-8 min-h-screen px-4 border-x">
        <div className="flex gap-6 items-center justify-between pt-8">
          <Navbar />
        </div>
        {/* <Separator /> */}
        <div className="mt-12">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
