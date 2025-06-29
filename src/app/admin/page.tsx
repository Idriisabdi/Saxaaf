'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, AlertTriangle, Loader2 } from 'lucide-react';
import { getLeads, type Lead } from '@/services/lead-service';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/auth-context';

function getPriorityBadge(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="secondary">Medium</Badge>;
    case 'low':
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge>{priority}</Badge>;
  }
}

export default function AdminDashboardPage() {
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return; // Don't fetch data if user is not authenticated

    async function fetchLeads() {
      try {
        const leads = await getLeads();
        setRecentLeads(leads);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeads();
  }, [user]);

  const totalLeads = recentLeads.length;
  const highPriorityLeads = recentLeads.filter(
    (lead) => lead.priority === 'high'
  ).length;

  const stats = [
    { title: 'Total Leads', value: totalLeads.toString(), icon: Users },
    {
      title: 'High Priority Leads',
      value: highPriorityLeads.toString(),
      icon: AlertTriangle,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-4 w-4 text-muted-foreground ${stat.title === 'High Priority Leads' && highPriorityLeads > 0 ? 'text-destructive' : ''}`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Lead Submissions</CardTitle>
          <CardDescription>
            An overview of the latest project inquiries and contact messages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead / Company</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Submission Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.length > 0 ? (
                recentLeads.slice(0, 10).map((lead: Lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">
                      {lead.type === 'Consultation'
                        ? lead.companyName
                        : lead.name}
                    </TableCell>
                    <TableCell>{lead.type}</TableCell>
                    <TableCell>{getPriorityBadge(lead.priority)}</TableCell>
                    <TableCell className="text-right">
                      {format(new Date(lead.date), 'PP')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No lead submissions yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
