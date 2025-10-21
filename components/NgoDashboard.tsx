
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Button from './Button';

const donorSegmentsData = [
  { name: 'Children & Youth', value: 400, color: '#8884d8' },
  { name: 'Elderly Care', value: 300, color: '#82ca9d' },
  { name: 'Disability Services', value: 300, color: '#ffc658' },
  { name: 'Family Support', value: 200, color: '#ff8042' },
  { name: 'Other', value: 278, color: '#a4de6c' },
];

const campaignPerformanceData = [
  { name: 'Bright Start', Donations: 35000, Goal: 100000 },
  { name: 'Golden Years', Donations: 15000, Goal: 50000 },
  { name: 'Enable & Empower', Donations: 80000, Goal: 150000 },
  { name: 'Family Ties', Donations: 22000, Goal: 60000 },
  { name: 'Green SG', Donations: 40000, Goal: 120000 },
];

const DashboardCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 ${className}`}>
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        {children}
    </div>
);


const NgoDashboard: React.FC = () => {
    
    const handleExport = () => {
        console.log("Exporting data (mock)...");
        const data = { donorSegmentsData, campaignPerformanceData };
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "ngo_analytics_export.json";
        link.click();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-gray-800">NGO Analytics Dashboard</h1>
                <Button onClick={handleExport}>Export Insights (JSON)</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                 <DashboardCard title="Total Donors">
                    <p className="text-5xl font-bold text-indigo-600">1,478</p>
                </DashboardCard>
                <DashboardCard title="Total Donations (This Month)">
                    <p className="text-5xl font-bold text-indigo-600">S$ 192,000</p>
                </DashboardCard>
                <DashboardCard title="Engagement Rate">
                    <p className="text-5xl font-bold text-indigo-600">62%</p>
                </DashboardCard>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <DashboardCard title="Donor Segments by Interest" className="lg:col-span-2">
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={donorSegmentsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {donorSegmentsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                             <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </DashboardCard>
                
                <DashboardCard title="Campaign Performance" className="lg:col-span-3">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={campaignPerformanceData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-15} textAnchor="end" height={50} interval={0} fontSize={12} />
                            <YAxis tickFormatter={(value) => `$${Number(value)/1000}k`} />
                            <Tooltip formatter={(value) => `S$${Number(value).toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="Donations" fill="#8884d8" name="Donations Raised" />
                            <Bar dataKey="Goal" fill="#82ca9d" name="Funding Goal" />
                        </BarChart>
                    </ResponsiveContainer>
                </DashboardCard>
            </div>
        </div>
    );
};

export default NgoDashboard;
