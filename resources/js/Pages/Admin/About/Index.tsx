import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Upload, Save } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AboutPage() {
    const [formData, setFormData] = useState({
        name: 'John Doe',
        title: 'Full Stack Developer',
        subtitle: 'Building amazing web experiences',
        bio: 'Passionate about creating beautiful and functional web applications.',
        longBio: 'I am a full-stack developer with 5+ years of experience...',
        resumeUrl: 'https://example.com/resume.pdf',
        ctaLabel: 'Get In Touch',
        ctaLink: 'mailto:john@example.com'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {

        toast('Success', {
            description: 'About section updated successfully!'

        });
    };

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">About</h1>
                        <p className="text-muted-foreground">Manage your profile information</p>
                    </div>
                    <Button onClick={handleSave} className="bg-neon-purple hover:bg-neon-purple/90 text-white">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>

                <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Avatar Upload */}
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" className="gap-2 bg-transparent">
                                <Upload className="h-4 w-4" />
                                Upload Avatar
                            </Button>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-input border-border/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="bg-input border-border/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                                id="subtitle"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="bg-input border-border/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Short Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={3}
                                className="bg-input border-border/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="longBio">Long Bio</Label>
                            <Textarea
                                id="longBio"
                                name="longBio"
                                value={formData.longBio}
                                onChange={handleChange}
                                rows={5}
                                className="bg-input border-border/50"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="resumeUrl">Resume URL</Label>
                                <Input
                                    id="resumeUrl"
                                    name="resumeUrl"
                                    value={formData.resumeUrl}
                                    onChange={handleChange}
                                    className="bg-input border-border/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ctaLabel">CTA Label</Label>
                                <Input
                                    id="ctaLabel"
                                    name="ctaLabel"
                                    value={formData.ctaLabel}
                                    onChange={handleChange}
                                    className="bg-input border-border/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ctaLink">CTA Link</Label>
                            <Input
                                id="ctaLink"
                                name="ctaLink"
                                value={formData.ctaLink}
                                onChange={handleChange}
                                className="bg-input border-border/50"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
