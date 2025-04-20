import React from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const domainData = [
  { domain: "Tech", applications: 120 },
  { domain: "Finance", applications: 90 },
  { domain: "Healthcare", applications: 70 },
  { domain: "Marketing", applications: 50 },
];

const signupData = [
  { date: "Apr 1", users: 10 },
  { date: "Apr 5", users: 30 },
  { date: "Apr 10", users: 45 },
  { date: "Apr 15", users: 20 },
];

const jobTypeData = [
  { type: "Full-time", value: 400 },
  { type: "Part-time", value: 200 },
  { type: "Internship", value: 150 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export default function DashboardCharts() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6">
      
      {/* Bar Chart: Applications by Domain */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Applications by Domain</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={domainData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="domain" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart: User Signups */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">User Signups Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart: Applications by Job Type */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Applications by Job Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={jobTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ name }) => name}
              >
                {jobTypeData.map((entry, index) => (
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
  );
}
