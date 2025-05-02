import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContactMessages, deleteContactMessage } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
  createdAt: Date;
}

export default function Admin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password protection, not secure but for demo purposes
    if (password === 'Gabriel123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin-authenticated', 'true');
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem('admin-authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
    }
    
    if (isAuth) {
      const fetchMessages = async () => {
        try {
          const messageData = await getContactMessages();
          setMessages(messageData);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load messages",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchMessages();
    }
  }, [isAuthenticated, toast]);

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteContactMessage(id);
      setMessages(messages.filter(msg => msg.id !== id));
      toast({
        title: "Success",
        description: "Message deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive"
      });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <motion.div 
          className="w-full max-w-md p-8 bg-white dark:bg-dark-card rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
          <form onSubmit={authenticate} className="space-y-4">
            <div>
              <label htmlFor="password" className="block mb-2 font-medium">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <a 
              href="/" 
              className="text-primary hover:underline"
            >
              Return to Home
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <a 
              href="/" 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
            >
              Return to Site
            </a>
            <button 
              onClick={() => {
                localStorage.removeItem('admin-authenticated');
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Contact Messages</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {messages.map((message) => (
                <motion.div 
                  key={message.id} 
                  className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">{message.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Email:</span> {message.email}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Phone:</span> {message.phone || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Package:</span> {message.package || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">Message:</p>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {message.message}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
