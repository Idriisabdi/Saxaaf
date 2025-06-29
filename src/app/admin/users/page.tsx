import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

// Mock data - in a real application, this would come from a secure backend function.
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    createdAt: '2023-01-15T10:00:00Z',
    lastSignIn: '2023-10-26T12:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    createdAt: '2023-02-20T14:45:00Z',
    lastSignIn: '2023-10-25T09:15:00Z',
  },
    {
    id: '3',
    name: 'John Smith',
    email: 'john.smith@example.com',
    createdAt: '2023-03-10T08:00:00Z',
    lastSignIn: '2023-10-20T18:00:00Z',
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
      
       <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Developer Note</AlertTitle>
          <AlertDescription>
            This page uses mock data. Listing users requires the Firebase Admin SDK on a secure server. For a production environment, you would create a serverless function to fetch user data and call it from this page.
          </AlertDescription>
        </Alert>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users with access to the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Last Sign-In</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{new Date(user.lastSignIn).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
