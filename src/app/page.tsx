import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="px-4">
        <div className="grid grid-cols-[repeat(3, 1fr)] grid-rows-[repeat(2, 1fr)] gap-4">
          <div className="bg-white dark:bg-black relative relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer   rounded border col-span-2 row-span-2 group">
            <Image
              src={"/product/jshd.png"}
              width={720}
              height={720}
              alt="js"
              className="p-24 group-hover:scale-105 duration-300"
            />
            <div className="absolute rounded-full border left-16 top-[450px]">
              <div className="py-1 pr-1 pl-4 flex items-center gap-4 text-sm font-semibold">
                <p>T-shirt Javascript Web Programmer</p>
                <div className="bg-primary rounded-full px-2 py-1">
                  <p className="">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(89000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-black relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer   rounded border col-start-3 group">
            <Image
              src={"/product/jacket.png"}
              width={360}
              height={360}
              alt="php"
              className="p-12 group-hover:scale-105 duration-300"
            />
            <div className="absolute rounded-full border left-4 top-72">
              <div className="py-1 pr-1 pl-4 flex items-center gap-4 text-sm font-semibold">
                <p>Informatics Jacket</p>
                <div className="bg-primary rounded-full px-2 py-1">
                  <p className="">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(140000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-black relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer   rounded border col-start-3 row-start-2 group">
            <Image
              src={"/product/cap.png"}
              width={360}
              height={360}
              alt="sereal"
              className="p-12 group-hover:scale-105 duration-300"
            />
            <div className="absolute rounded-full border left-4 top-72">
              <div className="py-1 pr-1 pl-4 flex items-center gap-4 text-sm font-semibold">
                <p>Infortination Cap Hat</p>
                <div className="bg-primary rounded-full px-2 py-1">
                  <p className="">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(45000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
