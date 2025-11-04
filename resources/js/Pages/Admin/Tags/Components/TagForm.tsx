import React from "react";
import { useForm } from "@inertiajs/react";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react';

interface TagFormProps {
    method?: "post" | "put";
    initialData?: {
        id?: number;
        name?: string;
        slug?: string;
    };
}

export default function TagForm({ method = "post", initialData }: TagFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: method === "put" ? "PUT" : "POST",
        name: initialData?.name || "",
        slug: initialData?.slug || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (method === "put" && initialData?.id) {
            put(route("tags.update", initialData.id));
        } else {
            post(route("admin.tags.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Tag name"
                    className="bg-input border-border/50"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Slug</label>
                <Input
                    name="slug"
                    value={data.slug}
                    onChange={handleChange}
                    placeholder="tag-slug"
                    className="bg-input border-border/50"
                />
                {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
            </div>

            <Button
                type="submit"
                disabled={processing}
                className="bg-gradient-to-r from-neon-purple to-neon-blue text-white"
            >
                <Save className="mr-2 h-4 w-4" />
                {processing ? 'Saving...' : 'Save Project'}
            </Button>
        </form>
    );
}
