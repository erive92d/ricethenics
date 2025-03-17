import Image from 'next/image'
import Link from 'next/link';


export default function HeroComp() {

    return (
        <section className="relative flex items-center justify-center h-screen text-white">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={"/herobg.jpg"}
                    alt="Hero Background"
                    layout="fill"
                    objectFit="cover"
                    className="object-bottom"
                    quality={80}
                />
                <div className="absolute inset-0 bg-black/50"></div>            </div>

            {/* Content */}
            <div className="text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold">Welcome to Ricethenics Website</h1>
                <p className="text-lg md:text-xl mt-4">
                    We love to run and eat rice.
                </p>
                <Link href="/runs" className="btn btn-ghost bg-lime-400 text-black mt-2">
                    View runs
                </Link>
            </div>
        </section>
    );

}
