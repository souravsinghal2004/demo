import Image from "next/image"

export default function Logos() {

  const logos = [
    { name: "OpenAI", src: "/logos/openai.svg" },
    { name: "Gemini", src: "/logos/gemini.svg" },
    { name: "AssemblyAI", src: "/logos/assembly.svg" },
  ]

  return (
    <section className="py-28 text-center relative bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">

      <p className="text-2xl md:text-3xl font-semibold mb-16 text-gray-800">
        Powered by the world’s most advanced AI models
      </p>

      <div className="flex justify-center items-center gap-24 flex-wrap">

        {logos.map((logo) => (

          <div
            key={logo.name}
            className="relative w-[180px] h-[60px] flex items-center justify-center 
            opacity-90 hover:scale-110 transition duration-300"
          >

            <Image
              src={logo.src}
              alt={logo.name}
              fill
              className="object-contain"
            />

          </div>

        ))}

      </div>

    </section>
  )
}