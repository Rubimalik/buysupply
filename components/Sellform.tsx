"use client"

import { useState } from "react"

type FormState = "idle" | "loading" | "success" | "error"

export default function SellForm() {
    const [state, setState] = useState<FormState>("idle")
    const [errorMsg, setErrorMsg] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setState("loading")
        setErrorMsg("")

        const form = e.currentTarget
        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            company: (form.elements.namedItem("company") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
            description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
        }

        try {
            const res = await fetch("/api/sell-enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const json = await res.json()
                throw new Error(json.error || "Something went wrong")
            }

            setState("success")
            form.reset()
        } catch (err: any) {
            setState("error")
            setErrorMsg(err.message || "Failed to send. Please try again.")
        }
    }

    return (
        <div className="border-t border-white/10 mt-16 pt-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
                Sell Your Equipment
            </h2>
            <p className="text-white/60 text-center mb-10">
                Fill in the form below and our team will get back to you with a quote.
            </p>

            {state === "success" ? (
                <div className="max-w-xl mx-auto text-center bg-white/5 border border-white/10 rounded-xl px-8 py-12">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold mb-2">Enquiry Received</h3>
                    <p className="text-white/60">
                        Thank you — our team will review your details and be in touch shortly.
                    </p>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto flex flex-col gap-5"
                >
                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-white/50 text-xs uppercase tracking-widest">
                                Full Name <span className="text-white/30">*</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="John Smith"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20
                                           focus:outline-none focus:border-white/30 focus:bg-white/8
                                           transition-all duration-200 text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="company" className="text-white/50 text-xs uppercase tracking-widest">
                                Company <span className="text-white/30">(optional)</span>
                            </label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                placeholder="Acme Ltd"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20
                                           focus:outline-none focus:border-white/30 focus:bg-white/8
                                           transition-all duration-200 text-sm"
                            />
                        </div>
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-white/50 text-xs uppercase tracking-widest">
                                Email <span className="text-white/30">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="john@example.com"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20
                                           focus:outline-none focus:border-white/30 focus:bg-white/8
                                           transition-all duration-200 text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="phone" className="text-white/50 text-xs uppercase tracking-widest">
                                Phone <span className="text-white/30">*</span>
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                placeholder="07700 900000"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20
                                           focus:outline-none focus:border-white/30 focus:bg-white/8
                                           transition-all duration-200 text-sm"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="description" className="text-white/50 text-xs uppercase tracking-widest">
                            Products for Sale <span className="text-white/30">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={5}
                            placeholder="e.g. 3x Ricoh IM C3000 (2021), 2x Canon iR-ADV C5560 — all in working condition, low meter counts..."
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20
                                       focus:outline-none focus:border-white/30 focus:bg-white/8
                                       transition-all duration-200 text-sm resize-none"
                        />
                    </div>

                    {/* Error */}
                    {state === "error" && (
                        <p className="text-red-400 text-sm text-center">{errorMsg}</p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={state === "loading"}
                        className="w-full bg-white text-black font-semibold py-3.5 rounded-lg
                                   transition-all duration-300
                                   hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] hover:scale-[1.01]
                                   active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                                   text-sm tracking-wide"
                    >
                        {state === "loading" ? "Sending…" : "Submit Enquiry"}
                    </button>

                    <p className="text-white/30 text-xs text-center">
                        We'll respond within 1 business day.
                    </p>
                </form>
            )}
        </div>
    )
}