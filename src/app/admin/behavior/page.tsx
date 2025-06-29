'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getPageViews, type PageView } from '@/services/tracking-service';
import { Loader2, Eye, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/auth-context';

export default function BehaviorPage() {
    const [pageViews, setPageViews] = useState<PageView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (authLoading || !user) {
            return;
        }

        async function fetchData() {
            setIsLoading(true);
            try {
                const data = await getPageViews();
                setPageViews(data);
            } catch (error) {
                console.error("Failed to fetch page views:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [user, authLoading]);

    const totalViews = pageViews.length;
    const uniqueSessions = new Set(pageViews.map(v => v.sessionId)).size;

    const viewsByPage = pageViews.reduce((acc, view) => {
        acc[view.pathname] = (acc[view.pathname] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(viewsByPage)
        .map(([name, value]) => ({ name, views: value }))
        .sort((a, b) => b.views - a.views);

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Behavior Analytics</h1>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium uppercase">Total Page Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalViews}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium uppercase">Unique Sessions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{uniqueSessions}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Page Views by Path</CardTitle>
                    <CardDescription>A look at the most popular pages on your website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis type="category" dataKey="name" width={150} tick={{fontSize: 12}} />
                            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                            <Legend />
                            <Bar dataKey="views" name="Total Views" fill="hsl(var(--primary))" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of the latest page views.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Path</TableHead>
                                <TableHead>Session ID</TableHead>
                                <TableHead className="text-right">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pageViews.slice(0, 10).map((view) => (
                                <TableRow key={view.id}>
                                    <TableCell className="font-medium">{view.pathname}</TableCell>
                                    <TableCell className="text-muted-foreground truncate max-w-xs">{view.sessionId}</TableCell>
                                    <TableCell className="text-right text-muted-foreground">{new Date(view.timestamp).toLocaleTimeString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
