// Project: MKR Inventory Management System
// Frontend: React (Vite + Tailwind + shadcn/ui)
// Backend: Supabase (PostgreSQL)
// Deployment: Vercel

// The following is the layout of the application structure and key code components

// Folder structure:
// src/
//   components/
//     DashboardCard.jsx
//     ProductDropdown.jsx
//     ReportFilters.jsx
//     StockAlertCard.jsx
//   pages/
//     Dashboard.jsx
//     Sales.jsx
//     Purchase.jsx
//     Reports.jsx
//     Login.jsx
//   utils/
//     supabaseClient.js
//     authHelpers.js
//   App.jsx
//   main.jsx

// Sample: src/components/DashboardCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function DashboardCard({ title, value, icon }) {
  return (
    <Card className="rounded-2xl shadow-md p-4">
      <CardContent className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-3xl font-bold text-blue-600">{value}</p>
        </div>
        <div className="text-gray-500">{icon || <BarChart2 size={36} />}</div>
      </CardContent>
    </Card>
  );
}

// Sample: src/pages/Dashboard.jsx
import DashboardCard from "@/components/DashboardCard";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const { data: sales } = await supabase.from("sales_summary").select();
      const { data: stock } = await supabase.from("stock_summary").select();
      const { data: topItems } = await supabase.rpc("get_top_ordered_items");
      setStats({ sales, stock, topItems });
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <DashboardCard title="Total Sales Today" value={`৳ ${stats.sales?.today || 0}`} />
      <DashboardCard title="Total Stock" value={stats.stock?.total || 0} />
      <DashboardCard title="Out for Delivery" value={stats.stock?.outForDelivery || 0} />
      <DashboardCard title="Top Ordered Item" value={stats.topItems?.[0]?.product_name || "-"} />
    </div>
  );
}
