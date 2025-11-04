// /Pages/Admin/Projects/Create.tsx
import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'
import ProjectForm from './Components/ProjectForm'
import type { Tag } from './lib/models'

type Props = { tags: Tag[] }

export default function Create({ tags }: Props) {
    return (
        <AdminLayout>
            <Head title="Create Project" />
            <div className="flex items-center justify-between p-6">
                <h1 className="text-3xl font-bold">Create Project</h1>
                <Link href={route('admin.projects.index')}>
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </Link>
            </div>

            <ProjectForm
                tags={tags}
                submitRoute="/admin/projects"
                onSuccessMessage="Project created successfully!"
            />
        </AdminLayout>
    )
}
