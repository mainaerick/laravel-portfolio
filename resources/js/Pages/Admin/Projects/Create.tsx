import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, Save, ArrowLeft } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { Tag } from '@/Pages/Admin/Projects/lib/models';

type Props = {
    tags: Tag[];
};

interface ProjectFormData {
    title: string;
    slug: string;
    description: string;
    github: string;
    live_url: string;
    is_featured: boolean;
    order: number;
    tags: number[];
    thumbnail_file: File | null;
}

export default function CreateProject({ tags }: Props) {
    const { data, setData, post, processing, progress, errors, reset } =
        useForm<ProjectFormData>({
            title: '',
            slug: '',
            description: '',
            github: '',
            live_url: '',
            is_featured: false,
            order: 0,
            tags: [],
            thumbnail_file: null
        });

    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setData(name as keyof ProjectFormData, type === 'checkbox' ? checked : value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('thumbnail_file', file);
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.projects.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast('Success', { description: 'Project created successfully!' });
                reset();
                setPreview(null);
            },
            onError: (e) => {
                console.log(e)
                toast('Error', { description: 'Failed to create project.' });
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Project" />

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">New Project</h1>
                        <p className="text-muted-foreground">Create a new project entry</p>
                    </div>

                    <div className="flex gap-3">
                        <Link href={route('admin.projects.index')}>
                            <Button variant="outline" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-gradient-to-r from-neon-purple to-neon-blue text-white"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Saving...' : 'Create Project'}
                        </Button>
                    </div>
                </div>

                <Card className="bg-card/50 border-border/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>Fill in all fields below</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                value={data.slug}
                                onChange={handleChange}
                            />
                            {errors.slug && (
                                <p className="text-sm text-red-500">{errors.slug}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        {/* GitHub + Live URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="github">GitHub URL</Label>
                                <Input
                                    id="github"
                                    name="github"
                                    value={data.github}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="live_url">Live URL</Label>
                                <Input
                                    id="live_url"
                                    name="live_url"
                                    value={data.live_url}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Featured + Order */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 mt-6">
                                <input
                                    id="is_featured"
                                    name="is_featured"
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={handleChange}
                                />
                                <Label htmlFor="is_featured">Featured</Label>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order">Order</Label>
                                <Input
                                    id="order"
                                    name="order"
                                    type="number"
                                    value={data.order}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <select
                                id="tags"
                                name="tags"
                                multiple
                                value={data.tags.map(String)}
                                onChange={(e) =>
                                    setData(
                                        'tags',
                                        Array.from(e.target.selectedOptions).map((opt) =>
                                            Number(opt.value)
                                        )
                                    )
                                }
                                className="w-full border rounded-md bg-input text-foreground p-2"
                            >
                                {tags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </option>
                                ))}
                            </select>
                            {errors.tags && (
                                <p className="text-sm text-red-500">{errors.tags}</p>
                            )}
                        </div>

                        {/* Thumbnail */}
                        <div className="space-y-2">
                            <Label htmlFor="thumbnail_file">Thumbnail</Label>
                            <input
                                id="thumbnail_file"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-400"
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-2 max-h-40 rounded-md border"
                                />
                            )}
                            {progress && (
                                <progress
                                    value={progress.percentage}
                                    max="100"
                                    className="w-full h-2 rounded-full mt-2 bg-gray-700"
                                />
                            )}
                            {errors.thumbnail_file && (
                                <p className="text-sm text-red-500">{errors.thumbnail_file}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
