'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLeads, type Lead } from '@/services/lead-service';
import { format, parseISO, startOfMonth, startOfWeek } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--destructive))', '#8884d8', '#82ca9d', '#ffc658'];

type Timeframe = 'all' | 'monthly' | 'weekly';

export default function AnalyticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<Timeframe>('all');

  useEffect(() => {
    async function fetchLeads() {
      setIsLoading(true);
      try {
        const fetchedLeads = await getLeads();
        setLeads(fetchedLeads);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    if (timeframe === 'all') return true;
    const leadDate = parseISO(lead.date);
    const now = new Date();
    if (timeframe === 'monthly') return leadDate >= startOfMonth(now);
    if (timeframe === 'weekly') return leadDate >= startOfWeek(now);
    return true;
  });

  const leadsByDate = filteredLeads.reduce((acc, lead) => {
    const date = format(parseISO(lead.date), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartDataLeadsByDate = Object.entries(leadsByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const leadsByPriority = filteredLeads.reduce((acc, lead) => {
    acc[lead.priority] = (acc[lead.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const chartDataLeadsByPriority = Object.entries(leadsByPriority).map(([name, value]) => ({ name, value }));
  
  const leadsByIndustry = filteredLeads
    .filter(lead => lead.type === 'Consultation' && lead.industry)
    .reduce((acc, lead) => {
        const industry = lead.industry!.trim();
        acc[industry] = (acc[industry] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

  const chartDataLeadsByIndustry = Object.entries(leadsByIndustry).map(([name, value]) => ({ name, value }));


  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <Select value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
            </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lead Submissions Over Time</CardTitle>
          <CardDescription>A look at the number of leads received daily.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartDataLeadsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" name="Leads" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-8 md:grid-cols-2">
         <Card>
          <CardHeader>
            <CardTitle>Leads by Priority</CardTitle>
            <CardDescription>Distribution of leads based on AI-assessed priority.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartDataLeadsByPriority}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Count" fill="hsl(var(--primary))" />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Leads by Industry</CardTitle>
            <CardDescription>Breakdown of leads from different industries.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartDataLeadsByIndustry} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {chartDataLeadsByIndustry.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
