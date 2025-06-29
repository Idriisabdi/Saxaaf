'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ServerCrash } from "lucide-react";
import { getUsers, type AppUser } from '@/services/user-service';

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
        console.error("Failed to fetch users:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);


  const renderContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="h-48">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
       return (
        <TableRow>
          <TableCell colSpan={3}>
            <Alert variant="destructive" className="mt-4">
              <ServerCrash className="h-4 w-4" />
              <AlertTitle>Failed to Load Users</AlertTitle>
              <AlertDescription>
                {error} This could be due to missing server configurations (like service account credentials) or network issues. Please check the server logs for more details.
              </AlertDescription>
            </Alert>
          </TableCell>
        </TableRow>
       );
    }
    
    if (users.length === 0) {
        return (
             <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                    No users found.
                </TableCell>
            </TableRow>
        )
    }

    return users.map((user) => (
      <TableRow key={user.uid}>
        <TableCell>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </TableCell>
        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
        <TableCell className="text-right">{new Date(user.lastSignIn).toLocaleString()}</TableCell>
      </TableRow>
    ));
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">User Management</h1>

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
              {renderContent()}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
