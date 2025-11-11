import type React from "react"

import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from '@inertiajs/react';

export default function ContactForm() {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
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

    useEffect(() => {
        console.log(errors)
    }, [errors]);
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

            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/80 hover:to-neon-blue/80 text-white border-0"
            >
                {submitted ? "Message Sent! 🎉" : "Send Message"}
            </Button>
        </motion.form>
    )
}
