import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Plus, Eye } from "lucide-react"
import AdminLayout from '@/Layouts/AdminLayout';

const stats = [
    { label: "Total Projects", value: "12", icon: "📁" },
    { label: "Total Tags", value: "24", icon: "🏷️" },
    { label: "Total Skills", value: "18", icon: "⚡" },
    { label: "Unread Messages", value: "3", icon: "💬" },
]

const recentProjects = [
    { id: 1, title: "E-commerce Platform", tags: ["React", "Node.js"], featured: true },
    { id: 2, title: "Mobile App", tags: ["React Native", "Firebase"], featured: false },
    { id: 3, title: "Design System", tags: ["Figma", "Components"], featured: true },
]

const chartData = [
    { name: "Jan", projects: 2 },
    { name: "Feb", projects: 3 },
    { name: "Mar", projects: 2 },
    { name: "Apr", projects: 4 },
    { name: "May", projects: 1 },
]

export default function AdminDashboard() {
    return (
        <AdminLayout>


        <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card
                        key={stat.label}
                        className="bg-card/50 backdrop-blur border-border/50 hover:border-neon-purple/50 transition-all"
                    >
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <Card className="lg:col-span-2 bg-card/50 backdrop-blur border-border/50">
                    <CardHeader>
                        <CardTitle>Projects Over Time</CardTitle>
                        <CardDescription>Monthly project creation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                                <XAxis dataKey="name" stroke="oklch(0.7 0 0)" />
                                <YAxis stroke="oklch(0.7 0 0)" />
                                <Tooltip contentStyle={{ backgroundColor: "oklch(0.12 0 0)", border: "1px solid oklch(0.2 0 0)" }} />
                                <Bar dataKey="projects" fill="oklch(0.65 0.25 290)" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Project
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                            <Eye className="mr-2 h-4 w-4" />
                            View Contacts
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Projects */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>Your latest portfolio projects</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border/50">
                                <TableHead>Title</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead>Featured</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentProjects.map((project) => (
                                <TableRow key={project.id} className="border-border/50 hover:bg-card/50">
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {project.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="bg-neon-purple/20 text-neon-purple border-neon-purple/30"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={project.featured ? "default" : "outline"}>{project.featured ? "Yes" : "No"}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        </AdminLayout>
    )
}
