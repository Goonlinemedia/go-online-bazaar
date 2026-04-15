import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const ProblemSolutionSection = () => {
  const problems = [
    "Selling through WhatsApp can be unstructured and difficult to manage",
    "Customers often show interest but don’t complete purchases",
    "Repeating product details manually takes time",
    "Without a proper store, your business may not appear credible",
  ];

  const solutions = [
    "We build a clean, professional online store for your business",
    "Your customers can place orders easily, with full details sent to your WhatsApp",
    "All your products are organized and presented in one place",
    "You save time and focus on growing your business",
  ];

  return (
    <section id="solution" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            Stop Losing Sales to <span className="text-red-500">"DM for Price"</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You work too hard to let messy WhatsApp chats kill your business. 
            GoOnline turns your phone into a professional sales machine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Problem */}
          <div className="bg-background/50 border border-red-500/10 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertCircle size={80} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-red-500">
              <XCircle size={24} /> The Problem
            </h3>
            <ul className="space-y-6">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-4 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 flex-shrink-0" />
                  <span className="text-lg leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 shadow-2xl shadow-primary/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle2 size={80} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <CheckCircle2 size={24} /> The GoOnline Solution
            </h3>
            <ul className="space-y-6">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0" />
                  <span className="text-lg font-medium leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-white/20 pt-8">
                <p className="text-xl font-bold mb-2">Let Us Set Up Your Store for You</p>
                <p className="text-sm opacity-90 mb-6">Simple process • No technical skills required</p>
                <a href="#pricing" className="inline-flex items-center gap-2 bg-white text-primary font-bold py-3 px-8 rounded-xl hover:scale-105 transition-transform shadow-lg">
                    Start Receiving Orders Now
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
