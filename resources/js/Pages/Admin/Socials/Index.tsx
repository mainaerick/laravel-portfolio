import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Social } from '@/lib/models';
import { PaginatedSocials } from '@/Pages/Admin/Projects/lib/models';
import { confirmDelete } from '@/Components/Admin/ConfirmDelete';
import { SocialForm } from '@/Pages/Admin/Socials/Components/SocialForm';

interface Props {
    paginatedSocials: PaginatedSocials;
    filters: any;
}

export default function SocialsPage({ paginatedSocials }: Props) {
    const [open, setOpen] = useState(false);
    const [editingSocial, setEditingSocial] = useState<Social | null>(null);

    const handleAddNew = () => {
        setEditingSocial(null);
        setOpen(true);
    };

    const handleEdit = (social: Social) => {
        setEditingSocial(social);
        setOpen(true);
    };

    const handleDelete = (social: Social) => {
        confirmDelete("admin.socials.destroy", social.id, social.provider);
    };

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Social Links</h1>
                        <p className="text-muted-foreground">Manage your social media links</p>
                    </div>

                    {/* Add/Edit Dialog */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleAddNew}
                                className="bg-neon-purple hover:bg-neon-purple/90 text-white"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Social
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-card border-border/50">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingSocial ? "Edit Social Link" : "Add New Social Link"}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingSocial
                                        ? "Update the social link details below."
                                        : "Add a new social link to your profile."}
                                </DialogDescription>
                            </DialogHeader>

                            <SocialForm
                                method={editingSocial ? "put" : "post"}
                                initialData={editingSocial ?? undefined}
                                onSuccess={() => setOpen(false)} // Close modal on success
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Grid of Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paginatedSocials.data.map((social) => (
                        <Card
                            key={social.id}
                            className="bg-card/50 backdrop-blur border-border/50 hover:border-neon-purple/50 transition-all"
                        >
                            <CardContent className="pt-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <LinkIcon className="h-5 w-5 text-neon-purple" />
                                    <div>
                                        <p className="font-medium">{social.provider}</p>
                                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                            {social.url}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Order: {social.order}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="hover:text-neon-purple"
                                        onClick={() => handleEdit(social)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleDelete(social)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
