import type React from "react"

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
type FormStatus = "idle" | "loading" | "success" | "error"

export default function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (!element) return

        const yOffset = -80 // adjust for fixed navbar
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({ top: y, behavior: "smooth" })
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setErrorMessage("")
        // Handle form submission here
        post(route('contact.store'), {
            onSuccess: () => {
                scrollToSection("contact")

                reset();
                setStatus("success")

                setTimeout(() => {
                    setStatus("idle")
                }, 5000)
            },
            onError: (error:any) => {
                console.log(error)
                setStatus("error")
                setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")

                // Reset error after 5 seconds
                setTimeout(() => {
                    setStatus("idle")
                    setErrorMessage("")
                }, 5000)
            },
            onProgress:()=>{
                setSubmitted(true)
            },
            onFinish:()=>{
                setSubmitted(false)

            },
        });


        // setTimeout(() => {
        //     setData({ name: "", email: "", message: "" })
        //     setSubmitted(false)
        // }, 3000)
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 p-8 rounded-xl border border-neon-purple/20 bg-gradient-to-br from-neon-purple/5 to-neon-blue/5 backdrop-blur-sm"
        >
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                </label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-background/50 border-neon-purple/20 focus:border-neon-purple/60 focus:ring-neon-purple/20"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-background/50 border-neon-purple/20 focus:border-neon-purple/60 focus:ring-neon-purple/20"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                </label>
                <Textarea
                    id="message"
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-background/50 border-neon-purple/20 focus:border-neon-purple/60 focus:ring-neon-purple/20 resize-none"
                />
            </div>
            <AnimatePresence mode="wait">
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                    >
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{errorMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/80 hover:to-neon-blue/80 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "loading" && (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                    </>
                )}
                {status === "success" && (
                    <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Sent Successfully!
                    </>
                )}
                {(status === "idle" || status === "error") && "Send Message"}
            </Button>
        </motion.form>
    )
}
