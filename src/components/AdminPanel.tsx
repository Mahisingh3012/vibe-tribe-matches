import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  Users, 
  Home, 
  Calendar,
  Filter,
  Eye
} from "lucide-react";
import { mockProfiles } from "@/data/mockProfiles";
import { UserProfile, RoomMatch } from "@/types/roommate";

interface AdminEntry {
  id: string;
  timestamp: Date;
  user: UserProfile;
  match?: RoomMatch;
  status: "pending" | "matched" | "booked";
}

export const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock admin data
  const adminEntries: AdminEntry[] = [
    {
      id: "entry_1",
      timestamp: new Date("2024-02-10T14:30:00"),
      user: mockProfiles[0],
      status: "booked"
    },
    {
      id: "entry_2", 
      timestamp: new Date("2024-02-10T15:45:00"),
      user: mockProfiles[1],
      status: "matched"
    },
    {
      id: "entry_3",
      timestamp: new Date("2024-02-10T16:20:00"),
      user: mockProfiles[2],
      status: "pending"
    }
  ];

  const filteredEntries = adminEntries.filter(entry => {
    const matchesSearch = entry.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.id.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || entry.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked": return "bg-green-500";
      case "matched": return "bg-blue-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Name", "Age", "Timestamp", "Status", "Sleep Schedule", "Cleanliness", "Work Style", "Social Level"],
      ...filteredEntries.map(entry => [
        entry.id,
        entry.user.name,
        entry.user.age,
        entry.timestamp.toISOString(),
        entry.status,
        entry.user.preferences.sleepSchedule,
        entry.user.preferences.cleanliness,
        entry.user.preferences.workStyle,
        entry.user.preferences.socialLevel
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roommate_matches.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage roommate matching requests and track bookings
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard hover={false}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Rooms Booked</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Pending Matches</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard hover={false}>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="matched">Matched</option>
                  <option value="booked">Booked</option>
                </select>
              </div>

              <Button onClick={exportToCSV} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Entries Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard hover={false} className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-poppins font-semibold">ID</th>
                    <th className="text-left p-4 font-poppins font-semibold">User</th>
                    <th className="text-left p-4 font-poppins font-semibold">Preferences</th>
                    <th className="text-left p-4 font-poppins font-semibold">Timestamp</th>
                    <th className="text-left p-4 font-poppins font-semibold">Status</th>
                    <th className="text-left p-4 font-poppins font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, index) => (
                    <motion.tr
                      key={entry.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <td className="p-4 font-mono text-sm">{entry.id}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={entry.user.profilePicture || "/placeholder-avatar.jpg"}
                            alt={entry.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{entry.user.name}</p>
                            <p className="text-sm text-muted-foreground">Age {entry.user.age}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex gap-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {entry.user.preferences.sleepSchedule}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Clean: {entry.user.preferences.cleanliness}/10
                            </Badge>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {entry.user.preferences.workStyle}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Social: {entry.user.preferences.socialLevel}/10
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {entry.timestamp.toLocaleDateString()} {entry.timestamp.toLocaleTimeString()}
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(entry.status)} text-white`}>
                          {entry.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};