export interface Lead {
  id: string;
  type: 'Consultation' | 'Contact';
  companyName?: string;
  name?: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    type: 'Consultation',
    companyName: 'InnovateCorp',
    priority: 'high',
    date: new Date('2024-07-20T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    type: 'Contact',
    name: 'Jane Smith',
    priority: 'medium',
    date: new Date('2024-07-19T14:30:00Z').toISOString(),
  },
  {
    id: '3',
    type: 'Consultation',
    companyName: 'Future Solutions',
    priority: 'low',
    date: new Date('2024-07-19T09:00:00Z').toISOString(),
  },
    {
    id: '4',
    type: 'Consultation',
    companyName: 'Data Dynamics',
    priority: 'high',
    date: new Date('2024-07-18T16:00:00Z').toISOString(),
  },
  {
    id: '5',
    type: 'Contact',
    name: 'Robert Brown',
    priority: 'medium',
    date: new Date('2024-07-17T11:45:00Z').toISOString(),
  },
];

export async function getLeads(): Promise<Lead[]> {
  // In a real app, you'd fetch this from a database.
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockLeads;
}
