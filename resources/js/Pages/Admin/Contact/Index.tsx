import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Trash2, Eye } from 'lucide-react';
import { Message, PaginatedMessages } from '@/Pages/Admin/Contact/lib/models';
import { useTable } from '@/lib/use-table';
import { TablePagination } from '@/Components/Admin/TablePagination';
import { TableSortHeader } from '@/Components/Admin/TableSortHeader';
import AdminLayout from '@/Layouts/AdminLayout';


interface Props {
    paginatedMessages: PaginatedMessages;
    filters: any;
}

export default function ContactsPage({ paginatedMessages, filters }: Props) {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    console.log(paginatedMessages)
    const { search, setSearch, sortField, sortOrder, handleSort, page, setPage } =
        useTable({
            initialSortField: filters.sort_by ?? 'title',
            initialSortOrder: filters.order ?? 'asc',
            perPage: paginatedMessages.per_page,
            filters,
            baseUrl: '/admin/contacts'
        });

    const handleViewMessage = (message: Message) => {
        setSelectedMessage(message);
        console.log(message)
        setSheetOpen(true);
    };

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
                    <p className="text-muted-foreground">View and manage contact form submissions</p>
                </div>

                <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardHeader>
                        <CardTitle>Messages</CardTitle>
                        <CardDescription>All contact form submissions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, or subject..."
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
                                            label="Name"
                                            sortable
                                            isSorted={sortField === 'name'}
                                            sortOrder={sortOrder}
                                            onClick={() => handleSort('name')}
                                        />
                                    </TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>
                                        <TableSortHeader
                                            label="Subject"
                                            sortable
                                            isSorted={sortField === 'subject'}
                                            sortOrder={sortOrder}
                                            onClick={() => handleSort('subject')}
                                        />
                                    </TableHead>
                                    <TableHead>
                                        <TableSortHeader
                                            label="Status"
                                            sortable
                                            isSorted={sortField === 'isRead'}
                                            sortOrder={sortOrder}
                                            onClick={() => handleSort('isRead')}
                                        />
                                    </TableHead>
                                    <TableHead>
                                        <TableSortHeader
                                            label="Date"
                                            sortable
                                            isSorted={sortField === 'createdAt'}
                                            sortOrder={sortOrder}
                                            onClick={() => handleSort('createdAt')}
                                        />
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedMessages.data.map((message) => (
                                    <TableRow key={message.id} className="border-border/50 hover:bg-card/50">
                                        <TableCell className="font-medium">{message.name}</TableCell>
                                        <TableCell className="text-sm">{message.email}</TableCell>
                                        <TableCell>{message.subject}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={message.is_read ? 'outline' : 'default'}
                                                className={message.is_read ? '' : 'bg-neon-blue/20 text-neon-blue border-neon-blue/30'}
                                            >
                                                {message.is_read ? 'Read' : 'Unread'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell
                                            className="text-sm text-muted-foreground">{message.created_at}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewMessage(message)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
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
                            totalPages={paginatedMessages.last_page}
                            onPageChange={setPage}
                            totalItems={paginatedMessages.total}
                        />
                    </CardContent>
                </Card>

                {/* Message Detail Sheet */}
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetContent className="bg-card border-border/50 w-full sm:w-96">
                        <SheetHeader>
                            <SheetTitle>Message Details</SheetTitle>
                            <SheetDescription>View the full message content</SheetDescription>
                        </SheetHeader>
                        {selectedMessage && (
                            <div className="space-y-4 mt-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">From</p>
                                    <p className="font-medium">{selectedMessage.name}</p>
                                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Subject</p>
                                    <p className="font-medium">{selectedMessage.subject}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Date</p>
                                    <p className="font-medium">{selectedMessage.created_at}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Message</p>
                                    <p className="mt-2 text-sm">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                                <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white">Reply via
                                    Email</Button>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </AdminLayout>
    );
}
