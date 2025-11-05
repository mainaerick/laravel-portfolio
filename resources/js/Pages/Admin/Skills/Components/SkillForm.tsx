import React from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SkillFormProps {
    method?: "post" | "put";
    initialData?: {
        id?: number;
        name?: string;
        icon?: string;
        order?: number;
    };
    onSuccess?: () => void;
}

export default function SkillForm({
                                      method = "post",
                                      initialData,
                                      onSuccess,
                                  }: SkillFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: method === "put" ? "PUT" : "POST",
        name: initialData?.name || "",
        icon: initialData?.icon || "",
        order: initialData?.order || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (method === "put" && initialData?.id) {
            put(route("admin.skills.update", initialData.id), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        } else {
            post(route("admin.skills.store"), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Skill Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Skill name"
                    className="bg-input border-border/50"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Skill Icon */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Icon (emoji)</label>
                <Input
                    name="icon"
                    value={data.icon}
                    onChange={handleChange}
                    placeholder="⚛️"
                    className="bg-input border-border/50"
                />
                {errors.icon && <p className="text-red-500 text-sm">{errors.icon}</p>}
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
                className="bg-gradient-to-r from-neon-purple to-neon-blue text-white"
            >
                <Save className="mr-2 h-4 w-4" />
                {processing
                    ? editingLabel(method)
                    : method === "put"
                        ? "Update Skill"
                        : "Add Skill"}
            </Button>
        </form>
    );
}

// Helper for button text during processing
function editingLabel(method: "post" | "put") {
    return method === "put" ? "Updating..." : "Saving...";
}
