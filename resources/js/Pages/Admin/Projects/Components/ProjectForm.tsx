// /Pages/Admin/Projects/Components/ProjectForm.tsx
import React, { useState, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Upload, Save } from 'lucide-react'
import type { Project, Tag } from '@/Pages/Admin/Projects/lib/models';
import Select from 'react-select'
interface ProjectFormProps {
    tags: Tag[]
    initialData?: Partial<ProjectFormData>
    submitRoute: string
    method?: 'post' | 'put'
    onSuccessMessage: string
}
type ProjectFormData = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export default function ProjectForm({
                                        tags,
                                        initialData = {},
                                        submitRoute,
                                        method = 'post',
                                        onSuccessMessage,
                                    }: ProjectFormProps) {
    const { data, setData, post, processing, progress, errors, reset } = useForm<ProjectFormData>({
        _method: method === 'put' ? "PUT" : "POST",
        thumbnail: initialData?.thumbnail,
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        github: initialData?.github || '',
        live_url: initialData?.live_url || '',
        is_featured: initialData?.is_featured ?? false,
        order: initialData?.order || 0,
        tags: initialData?.tags || [],
        tag_ids: initialData?.tags?.map((t: Tag) => t.id) || [],
        thumbnail_file: null
    })

    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        if (initialData?.thumbnail_file && typeof initialData.thumbnail_file === 'string') {
            setPreview(initialData.thumbnail_file)
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, type, value, checked } = e.target as HTMLInputElement
        setData(name as keyof ProjectFormData, type === 'checkbox' ? checked : value)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0]
            setData('thumbnail_file', file)
            const reader = new FileReader()
            reader.onload = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = {
            ...data,
            tags: data.tags?.map((t: Tag) => t.id) || [] // Send as integers, no String()
        }
        console.log(formData)
        post(submitRoute, {
            method : method === 'put' ? "put" : "post",
            forceFormData: !!data.thumbnail_file,

            onSuccess: () => {
                toast.success(onSuccessMessage)
                reset()
            },
            onError: (e:any) => {console.log(e)
                toast.error('Failed to save project.')},
        } as any)
    }
    const options = tags.map(tag => ({
        value: tag.id,
        label: tag.name,
    }));

    // Map your selected tags (Tag[]) → react-select format
    const selectedValues = data.tags
        ? data.tags.map((t: Tag) => ({ value: t.id, label: t.name }))
        : [];
    useEffect(() => {
        // Only run if data.tags is not undefined and is an array
        if (Array.isArray(data.tags)) {
            // Map the array of full Tag objects to an array of just their IDs
            const newTagIds = data.tags.map(t => t.id);

            // Update the form state's tag_ids property
            setData('tag_ids', newTagIds);
        }
    }, [data.tags, setData]);
    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur">
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>Fill in all fields below</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={data.title} onChange={handleChange} />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input id="slug" name="slug" value={data.slug} onChange={handleChange} />
                        {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={data.description} onChange={handleChange} rows={4} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub URL</Label>
                            <Input id="github" name="github" value={data.github as string} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="live_url">Live URL</Label>
                            <Input id="live_url" name="live_url" value={data.live_url as string} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 mt-6">
                            <input id="is_featured" name="is_featured" type="checkbox" checked={data.is_featured} onChange={handleChange} />
                            <Label htmlFor="is_featured">Featured</Label>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Order</Label>
                            <Input id="order" name="order" type="number" value={data.order} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Select
                            inputId="tags"
                            isMulti
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => {
                                // selected is an array of { value, label }
                                const mappedTags = selected.map((s) => ({
                                    id: s.value,
                                    name: s.label,
                                }));
                                // console.log(selected)
                                // const mappedTags = selected.map((s) => String(s.value));
                                // data.tags.map((t: Tag) => String(t.id))
                                setData('tags', mappedTags);
                            }}
                            classNamePrefix="react-select"
                            className="react-select-container"
                        />
                        {/*<select*/}
                        {/*    id="tags"*/}
                        {/*    name="tags"*/}
                        {/*    multiple*/}
                        {/*    value={data.tags?.map(String)}*/}
                        {/*    onChange={(e) =>*/}
                        {/*        setData(*/}
                        {/*            'tags',*/}
                        {/*            Array.from(e.target.selectedOptions).map((opt) => Number(opt.value))*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    {tags.map((tag) => (*/}
                        {/*        <option key={tag.id} value={tag.id}>*/}
                        {/*            {tag.name}*/}
                        {/*        </option>*/}
                        {/*    ))}*/}
                        {/*</select>*/}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="thumbnail_file">Thumbnail</Label>
                        <input id="thumbnail_file" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-400" />
                        {preview && <img src={preview} alt="Preview" className="mt-2 max-h-40 rounded-md border" />}
                        {progress && <progress value={progress.percentage} max="100" className="w-full h-2 rounded-full mt-2 bg-gray-700" />}
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue text-white"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Project'}
                    </Button>
                </CardContent>
            </Card>
        </form>
    )
}
