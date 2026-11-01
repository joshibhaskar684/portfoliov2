import { faqData } from "@/components/data/faqData";

export default function Faq() {
  return (
    <section id="faq" className="py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Quick answers about my work, experience, and how to get in touch.
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Native <details> keeps every answer in the HTML for crawlers */}
        <div className="space-y-4">
          {faqData.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm open:shadow-lg transition-shadow duration-300"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg md:text-xl font-bold text-foreground group-open:text-blue-600 transition-colors">
                  {faq.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="text-2xl text-blue-600 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-foreground/70 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
