
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2, Search } from "lucide-react"
import { Link } from '@inertiajs/react';

const projects = [
    { id: 1, title: "E-commerce Platform", tags: ["React", "Node.js"], featured: true, order: 1 },
    { id: 2, title: "Mobile App", tags: ["React Native"], featured: false, order: 2 },
    { id: 3, title: "Design System", tags: ["Figma", "Components"], featured: true, order: 3 },
]

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Projects</h1>
                    <p className="text-muted-foreground">Manage your portfolio projects</p>
                </div>
                <Link href="/admin/projects/new">
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
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-input border-border/50"
                        />
                    </div>

                    {/* Table */}
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border/50">
                                <TableHead>Title</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id} className="border-border/50 hover:bg-card/50">
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {project.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="bg-neon-blue/20 text-neon-blue border-neon-blue/30"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={project.featured ? "default" : "outline"}>{project.featured ? "Yes" : "No"}</Badge>
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
                </CardContent>
            </Card>
        </div>
    )
}
