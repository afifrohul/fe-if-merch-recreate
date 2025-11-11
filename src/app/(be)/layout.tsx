import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function FeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-2">
      <div className="w-full flex flex-col gap-4 min-h-screen border-x">
        <div className="flex gap-6 items-center justify-between">
          <Navbar />
        </div>
        {/* <Separator /> */}
        <div className="px-4 flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
