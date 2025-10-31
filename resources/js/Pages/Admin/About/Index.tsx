import type React from 'react';
import { useForm } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Upload, Save } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { About } from '@/lib/models';

type AboutFormData = Omit<About, 'id' | 'created_at' | 'updated_at'>;

interface Props {
    about: About;
}
// interface AboutFormData {
//     name: string;
//     title: string;
//     subtitle: string;
//     short_bio: string;
//     long_bio: string;
//     resume_url: string;
//     cta_label: string;
//     cta_link: string;
//     avatar: string;
//     avatar_file: File | null;
//     resume_file?: File | null;
//     _method: string;
// }
export default function AboutPage({ about }: Props) {
    const { data, setData, post, processing, progress, errors } = useForm<AboutFormData>({
        name: about.name || '',
        title: about.title || '',
        subtitle: about.subtitle || '',
        short_bio: about.short_bio || '',
        long_bio: about.long_bio || '',
        resume_url: about.resume_url || '',
        cta_label: about.cta_label || 'Get in Touch',
        cta_link: about.cta_link || '#contact',
        avatar: about.avatar || '',
        avatar_file: null,
        resume_file:null,
        _method: 'PUT'
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        if (name in data) {
            setData(name as keyof typeof data as any, value as any);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('avatar_file', e.target.files[0] as File | null);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/admin/about/${about.id}`, {
           method: 'put', // Spoof PUT method
            forceFormData: true, // Always use FormData
            onSuccess: () => {
                toast('Success', {
                    description: 'About section updated successfully!'
                });
            },
            onError: () => {
                toast('Error', {
                    description: 'Failed to update About section.'
                });
            }
        });
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSave} className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">About</h1>
                        <p className="text-muted-foreground">
                            Manage your profile information
                        </p>
                    </div>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/80 hover:to-neon-blue/80 text-white border-0"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Changes'}
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
                                <AvatarImage
                                    src={
                                        data.avatar
                                            ? `/storage/${data.avatar}`
                                            : 'https://github.com/shadcn.png'
                                    }
                                />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button
                                    variant="outline"
                                    className="gap-2 bg-transparent"
                                    type="button"
                                    onClick={() =>
                                        document.getElementById('avatar')?.click()
                                    }
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload Avatar
                                </Button>
                                {progress && (
                                    <progress
                                        value={progress.percentage}
                                        max="100"
                                        className="w-full mt-2 h-2 rounded-full bg-gray-700"
                                    >
                                        {progress.percentage}%
                                    </progress>
                                )}
                                {errors.avatar && (
                                    <p className="text-sm text-red-500 mt-2">{errors.avatar}</p>
                                )}
                            </div>
                        </div>

                        {/* Name + Title */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="bg-input border-border/50"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    className="bg-input border-border/50"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title}</p>
                                )}
                            </div>
                        </div>

                        {/* Subtitle */}
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                                id="subtitle"
                                name="subtitle"
                                value={data.subtitle as string}
                                onChange={handleChange}
                                className="bg-input border-border/50"
                            />
                            {errors.subtitle && (
                                <p className="text-sm text-red-500">{errors.subtitle}</p>
                            )}
                        </div>

                        {/* Short Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="short_bio">Short Bio</Label>
                            <Textarea
                                id="short_bio"
                                name="short_bio"
                                value={data.short_bio as string}
                                onChange={handleChange}
                                rows={3}
                                className="bg-input border-border/50"
                            />
                            {errors.short_bio && (
                                <p className="text-sm text-red-500">{errors.short_bio}</p>
                            )}
                        </div>

                        {/* Long Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="long_bio">Long Bio</Label>
                            <Textarea
                                id="long_bio"
                                name="long_bio"
                                value={data.long_bio as string}
                                onChange={handleChange}
                                rows={5}
                                className="bg-input border-border/50"
                            />
                            {errors.long_bio && (
                                <p className="text-sm text-red-500">{errors.long_bio}</p>
                            )}
                        </div>

                        {/* Resume */}
                        <div className="space-y-2">
                            <Label htmlFor="resume_file">Upload Resume (PDF)</Label>
                            <input
                                id="resume_file"
                                type="file"
                                accept=".pdf"
                                onChange={e => setData('resume_file', e.target.files?.[0] ?? null)}
                                className="block w-full text-sm text-gray-400"
                            />

                            {/* Show existing resume link (from backend model) */}
                            {about.resume_url && !data.resume_file && (
                                <a
                                    href={`/storage/${about.resume_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm underline"
                                >
                                    View Current Resume
                                </a>
                            )}

                            {/* Show uploaded (new) file name */}
                            {data.resume_file && (
                                <p className="text-sm text-green-400 mt-1">
                                    {data.resume_file instanceof File ? data.resume_file.name : 'Existing resume uploaded'}
                                </p>
                            )}

                            {errors.resume_file && (
                                <p className="text-sm text-red-500">{errors.resume_file}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cta_label">CTA Label</Label>
                            <Input
                                id="cta_label"
                                name="cta_label"
                                value={data.cta_label}
                                onChange={handleChange}
                                className="bg-input border-border/50"
                            />
                            {errors.cta_label && (
                                <p className="text-sm text-red-500">{errors.cta_label}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cta_link">CTA Link</Label>
                            <Input
                                id="cta_link"
                                name="cta_link"
                                value={data.cta_link}
                                onChange={handleChange}
                                className="bg-input border-border/50"
                            />
                            {errors.cta_link && (
                                <p className="text-sm text-red-500">{errors.cta_link}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
