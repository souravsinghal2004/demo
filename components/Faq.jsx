export default function FAQ(){

  const faqs=[
    "How do AI interviews work?",
    "Can I customize interview questions?",
    "Does it support multiple languages?",
    "Is candidate data secure?"
  ]

  return(
    <section className="py-24 max-w-3xl mx-auto px-6">

      <h2 className="text-3xl text-center font-bold mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">

        {faqs.map((q,i)=>(
          <div key={i} className="bg-[#111827] p-4 rounded-lg">
            {q}
          </div>
        ))}

      </div>

    </section>
  )
}