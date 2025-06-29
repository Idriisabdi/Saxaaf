'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


const profileSchema = z.object({
  email: z.string().email('Invalid email address.'),
});

const passwordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters.'),
  confirmPassword: z.string(),
  currentPassword: z.string().min(1, 'Current password is required for security.'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});


export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [reauthAction, setReauthAction] = useState<(() => Promise<void>) | null>(null);

  // State for the interactive toggles
  const [isCompact, setIsCompact] = useState(true);
  const [leadEmails, setLeadEmails] = useState(true);
  const [chatEmails, setChatEmails] = useState(false);

  // Theming state would require more complex logic with context, so we'll just make the toggle interactive
  const [isDarkMode, setIsDarkMode] = useState(true);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      currentPassword: '',
    },
  });
  
  const handleUpdate = async (updateFn: () => Promise<void>, currentPasswordForReauth: string) => {
    if (!user || !user.email) return;

    setIsUpdating(true);
    try {
        const credential = EmailAuthProvider.credential(user.email, currentPasswordForReauth);
        await reauthenticateWithCredential(user, credential);
        await updateFn(); // Execute the original update function (email or password)
        toast({ title: "Success", description: "Your details have been updated." });
        if (reauthAction) setReauthAction(null);
        passwordForm.reset();
    } catch (error: any) {
        let description = 'An unexpected error occurred.';
        if (error.code === 'auth/wrong-password') {
            description = 'The current password you entered is incorrect.';
        } else if (error.code === 'auth/too-many-requests') {
            description = 'Too many attempts. Please try again later.';
        }
        toast({ variant: 'destructive', title: 'Update Failed', description });
    } finally {
        setIsUpdating(false);
    }
  };

  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!user) return;
    
    // The password will be collected in the re-auth dialog
    const updateFn = async () => updateEmail(user, data.email);
    setReauthAction(() => () => handleUpdate(updateFn, passwordForm.getValues('currentPassword')));
  };
  
  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    if (!user) return;
    const updateFn = async () => updatePassword(user, data.newPassword);
    handleUpdate(updateFn, data.currentPassword);
  };

  const ReauthDialog = () => {
    const [pwd, setPwd] = useState('');
    return (
        <AlertDialog open={!!reauthAction} onOpenChange={() => setReauthAction(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Re-authentication Required</AlertDialogTitle>
                    <AlertDialogDescription>
                        For your security, please enter your current password to continue.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-2">
                    <Input 
                        type="password" 
                        placeholder="Current Password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        passwordForm.setValue('currentPassword', pwd);
                        reauthAction?.();
                    }}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
       <ReauthDialog />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Email Address</CardTitle>
                <CardDescription>Change the email address associated with your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Update Email
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Choose a new, strong password.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Update Password
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the admin dashboard.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                     <div className="space-y-0.5">
                        <Label>Theme</Label>
                        <p className="text-sm text-muted-foreground">Select between light and dark mode.</p>
                     </div>
                     <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode}/>
                  </div>
                   <div className="flex items-center justify-between rounded-lg border p-4">
                     <div className="space-y-0.5">
                        <Label>Compact View</Label>
                        <p className="text-sm text-muted-foreground">Display tables and lists more compactly.</p>
                     </div>
                     <Switch checked={isCompact} onCheckedChange={setIsCompact}/>
                  </div>
              </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                     <div className="space-y-0.5">
                        <Label>New Lead Email</Label>
                        <p className="text-sm text-muted-foreground">Receive an email for every new lead submission.</p>
                     </div>
                     <Switch checked={leadEmails} onCheckedChange={setLeadEmails} />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                     <div className="space-y-0.5">
                        <Label>New Chat Message Email</Label>
                        <p className="text-sm text-muted-foreground">Get notified by email for new chat messages.</p>
                     </div>
                     <Switch checked={chatEmails} onCheckedChange={setChatEmails} />
                  </div>
              </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
