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
import { Edit, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import SkillForm from '@/Pages/Admin/Skills/Components/SkillForm';
import { Skill } from '@/lib/models';
import { SkillIcon } from '@/Pages/Admin/Skills/Components/SkillIcon';
import { PaginatedSkills, Tag } from '@/Pages/Admin/Projects/lib/models';
import { confirmDelete } from '@/Components/Admin/ConfirmDelete';
const skills = [
    { id: 1, name: "React", icon: "⚛️", order: 1 },
    { id: 2, name: "TypeScript", icon: "📘", order: 2 },
    { id: 3, name: "Node.js", icon: "🟢", order: 3 },
]

interface Props {
    paginatedSkills:PaginatedSkills
    filters: any;
}
export default function SkillsPage({paginatedSkills,filters}:Props) {
    const [open, setOpen] = useState(false)
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);


    const handleAddNew = () => {
        setEditingSkill(null);
        setOpen(true);
    };
    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setOpen(true);
    };
    const handleDelete = (skill:Skill)=>{

        confirmDelete("admin.skills.destroy", skill.id, skill.name);
    }
    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Skills</h1>
                        <p className="text-muted-foreground">Manage your skills</p>
                    </div>


                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleAddNew}
                                className="bg-neon-purple hover:bg-neon-purple/90 text-white"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Skill
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-card border-border/50">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingSkill ? "Edit Skill" : "Add New Skill"}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingSkill
                                        ? "Update skill details below."
                                        : "Add a new skill to your profile."}
                                </DialogDescription>
                            </DialogHeader>

                            <SkillForm
                                method={editingSkill ? "put" : "post"}
                                initialData={editingSkill ?? undefined}
                                onSuccess={() => setOpen(false)} // Close dialog after submit
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paginatedSkills.data.map((skill) => (
                        <Card
                            key={skill.id}

                            className="bg-card/50 backdrop-blur border-border/50 hover:border-neon-purple/50 transition-all"
                        >
                            <CardContent className="pt-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {SkillIcon[skill.icon?.toLowerCase()] ?? SkillIcon.default }
                                    <div>
                                        <p className="font-medium">{skill.name}</p>
                                        <p className="text-xs text-muted-foreground">Order: {skill.order}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={()=>handleEdit(skill)}>
                                    <Edit className="mr-2 h-4 w-4" />

                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={()=>handleDelete(skill)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>

    )
}
