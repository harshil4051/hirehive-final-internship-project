// src/components/admin/Charts.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';

const jobData = [
  { month: 'Jan', jobs: 40 },
  { month: 'Feb', jobs: 30 },
  { month: 'Mar', jobs: 60 },
  { month: 'Apr', jobs: 50 },
  { month: 'May', jobs: 70 },
  { month: 'Jun', jobs: 90 },
];

const userData = [
  { name: 'Employers', value: 400 },
  { name: 'Candidates', value: 1000 },
];

const COLORS = ['#0088FE', '#00C49F'];

const Charts = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard Charts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart - Jobs per Month */}
        <div className="bg-white p-4 shadow rounded-xl">
          <h3 className="text-lg font-medium mb-2">Job Postings Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#8884d8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - User Types */}
        <div className="bg-white p-4 shadow rounded-xl">
          <h3 className="text-lg font-medium mb-2">User Signups</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
