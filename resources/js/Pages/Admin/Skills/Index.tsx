"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

const skills = [
    { id: 1, name: "React", icon: "⚛️", order: 1 },
    { id: 2, name: "TypeScript", icon: "📘", order: 2 },
    { id: 3, name: "Node.js", icon: "🟢", order: 3 },
]

export default function SkillsPage() {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({ name: "", icon: "" })

    const handleAddSkill = () => {
        setOpen(false)
        setFormData({ name: "", icon: "" })
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Skills</h1>
                    <p className="text-muted-foreground">Manage your skills</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Skill
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border/50">
                        <DialogHeader>
                            <DialogTitle>Add New Skill</DialogTitle>
                            <DialogDescription>Add a new skill to your profile</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder="Skill name"
                                    className="bg-input border-border/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Icon (emoji)</label>
                                <Input
                                    value={formData.icon}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                                    placeholder="⚛️"
                                    className="bg-input border-border/50"
                                />
                            </div>
                            <Button onClick={handleAddSkill} className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white">
                                Add Skill
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <Card
                        key={skill.id}
                        className="bg-card/50 backdrop-blur border-border/50 hover:border-neon-purple/50 transition-all"
                    >
                        <CardContent className="pt-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{skill.icon}</span>
                                <div>
                                    <p className="font-medium">{skill.name}</p>
                                    <p className="text-xs text-muted-foreground">Order: {skill.order}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
