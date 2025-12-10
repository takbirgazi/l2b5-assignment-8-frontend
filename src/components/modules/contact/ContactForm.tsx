"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form Submitted:", form)
        setForm({ name: "", email: "", message: "" });
        toast.success("Message Send Successfully!")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label className="pb-2" htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label className="pb-2" htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label className="pb-2" htmlFor="message">Your Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    className="h-52"
                    placeholder="Type your message here..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
                Send Message
            </Button>
        </form>
    )
};