import React from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Social } from '@/lib/models';

interface SocialFormProps {
    method?: "post" | "put";
    initialData?: Social;
    onSuccess?: () => void;
}

export function SocialForm({
                               method = "post",
                               initialData,
                               onSuccess,
                           }: SocialFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: method === "put" ? "PUT" : "POST",
        provider: initialData?.provider || "",
        url: initialData?.url || "",
        label: initialData?.label || "",
        order: initialData?.order || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (method === "put" && initialData?.id) {
            put(route("admin.socials.update", initialData.id), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        } else {
            post(route("admin.socials.store"), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Provider */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Provider</label>
                <Input
                    name="provider"
                    value={data.provider}
                    onChange={handleChange}
                    placeholder="GitHub, Twitter, LinkedIn..."
                    className="bg-input border-border/50"
                />
                {errors.provider && <p className="text-red-500 text-sm">{errors.provider}</p>}
            </div>

            {/* URL */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">URL</label>
                <Input
                    name="url"
                    value={data.url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="bg-input border-border/50"
                />
                {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
            </div>

            {/* Label */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Label (optional)</label>
                <Input
                    name="label"
                    value={data.label}
                    onChange={handleChange}
                    placeholder="e.g. personal, work"
                    className="bg-input border-border/50"
                />
                {errors.label && <p className="text-red-500 text-sm">{errors.label}</p>}
            </div>

            {/* Order */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Order</label>
                <Input
                    name="order"
                    type="number"
                    value={data.order}
                    onChange={handleChange}
                    placeholder="0"
                    className="bg-input border-border/50"
                />
                {errors.order && <p className="text-red-500 text-sm">{errors.order}</p>}
            </div>

            <Button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white"
            >
                <Save className="mr-2 h-4 w-4" />
                {processing
                    ? method === "put"
                        ? "Updating..."
                        : "Saving..."
                    : method === "put"
                        ? "Update Social"
                        : "Add Social"}
            </Button>
        </form>
    );
}
