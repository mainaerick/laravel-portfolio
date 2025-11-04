import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Edit, Trash2, Search } from 'lucide-react';
import { PaginatedTags } from '@/Pages/Admin/Projects/lib/models';
import { useTable } from '@/lib/use-table';
import { TablePagination } from '@/Components/Admin/TablePagination';
import { TableSortHeader } from '@/Components/Admin/TableSortHeader';
import AdminLayout from '@/Layouts/AdminLayout';
import TagForm from '@/Pages/Admin/Tags/Components/TagForm';

const tags = [
    { id: 1, name: 'React', slug: 'react' },
    { id: 2, name: 'TypeScript', slug: 'typescript' },
    { id: 3, name: 'Node.js', slug: 'nodejs' },
    { id: 4, name: 'Python', slug: 'python' },
    { id: 5, name: 'GraphQL', slug: 'graphql' }
];

interface Props {
    paginatedTags: PaginatedTags;
    filters: any;
}

export default function TagsPage({ paginatedTags, filters }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', slug: '' });



    const { search, setSearch, sortField, sortOrder, handleSort, page, setPage } = useTable({
        initialSortField: filters.sort_by ?? 'title',
        initialSortOrder: filters.order ?? 'asc',
        perPage: paginatedTags.per_page,
        filters,
        baseUrl: '/admin/tags'
    });
    const handleAddTag = () => {
        setOpen(false);
        setFormData({ name: '', slug: '' });
    };

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Tags</h1>
                        <p className="text-muted-foreground">Manage project tags</p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Tag
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-border/50">
                            <DialogHeader>
                                <DialogTitle>Add New Tag</DialogTitle>
                                <DialogDescription>Create a new tag for your projects</DialogDescription>
                            </DialogHeader>
                            <TagForm/>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardHeader>
                        <CardTitle>Tags List</CardTitle>
                        <CardDescription>All available project tags</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search tags..."
                                value={search as string}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 bg-input border-border/50"
                            />
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="border-border/50">
                                    <TableHead>
                                        <TableSortHeader
                                            label="Name"
                                            sortable
                                            isSorted={sortField === 'name'}
                                            sortOrder={sortOrder}
                                            onClick={() => handleSort('name')}
                                        />
                                    </TableHead>
                                    <TableHead>
                                        <TableSortHeader
                                            label="Slug"
                                            sortable
                                            isSorted={sortField === 'slug'}
                                            sortOrder={sortOrder}
                                            onClick={() => handleSort('slug')}
                                        />
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedTags.data.map((tag) => (
                                    <TableRow key={tag.id} className="border-border/50 hover:bg-card/50">
                                        <TableCell className="font-medium">{tag.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{tag.slug}</TableCell>
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
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
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
                            totalPages={paginatedTags.last_page}
                            onPageChange={setPage}
                            itemsPerPage={paginatedTags.per_page}
                            totalItems={paginatedTags.total}

                        />
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
