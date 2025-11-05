import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Edit, Trash2, Search } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TablePagination } from '@/Components/Admin/TablePagination';
import { TableSortHeader } from '@/Components/Admin/TableSortHeader';
import { useTable } from '@/lib/use-table';
import { Link } from '@inertiajs/react';
import { PaginatedProjects, Project, Tag } from '@/Pages/Admin/Projects/lib/models';
import { confirmDelete } from '@/Components/Admin/ConfirmDelete';


interface Props {
    projects:PaginatedProjects
    filters:any
    tags:Tag[]

}
export default function ProjectsPage({projects, filters, tags }:Props) {
    const { search, setSearch, sortField, sortOrder, handleSort, page, setPage } = useTable({
        initialSortField: filters.sort_by ?? 'title',
        initialSortOrder: filters.order ?? 'asc',
        perPage: projects.per_page,
        filters,
        baseUrl: '/admin/projects',
    });

    const deleteProject = (project:Project)=>{

        confirmDelete("admin.projects.destroy", project.id, project.title);

    }
    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
                        <p className="text-muted-foreground">Manage your portfolio projects</p>
                    </div>
                    <Link href="/admin/projects/create">
                        <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Project
                        </Button>
                    </Link>
                </div>

                <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardHeader>
                        <CardTitle>Projects List</CardTitle>
                        <CardDescription>View and manage all your projects</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search projects by title..."
                                value={search as string}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 bg-input border-border/50"
                            />
                        </div>

                        {/* Table */}
                        <Table>
                            <TableHeader>
                                <TableRow className="border-border/50">
                                    <TableHead>
                                        <TableSortHeader
                                            label="Title"
                                            sortable
                                            isSorted={sortField === 'title'}
                                            sortOrder={sortOrder}
                                            onClick={() => handleSort('title')}
                                        />
                                    </TableHead>
                                    <TableHead>Tags</TableHead>
                                    <TableHead>
                                        <TableSortHeader
                                            label="Featured"
                                            sortable
                                            isSorted={sortField === 'featured'}
                                            sortOrder={sortOrder}
                                            onClick={() => handleSort('is_featured')}
                                        />
                                    </TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.data.map((project) => (
                                    <TableRow key={project.id} className="border-border/50 hover:bg-card/50">
                                        <TableCell className="font-medium">{project.title}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {project.tags?.map((tag) => (
                                                    <span key={tag.id}>
                                                         <Badge
                                                             variant="secondary"
                                                             className="bg-neon-blue/20 text-neon-blue border-neon-blue/30"
                                                         >
                                                        {tag.name}
                                                    </Badge>
                                                    </span>

                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={project.is_featured ? 'default' : 'outline' as any}>{project.is_featured ? 'Yes' : 'No'}</Badge>
                                        </TableCell>
                                        <TableCell>{project.order}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <a href={`projects/${project.id}/edit`}> Edit </a>

                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={()=>deleteProject(project)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <TablePagination
                            currentPage={page as number}
                            totalPages={projects.last_page}
                            onPageChange={setPage}
                            itemsPerPage={projects.per_page}
                            totalItems={projects.total}

                        />
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
