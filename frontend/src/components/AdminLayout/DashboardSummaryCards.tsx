import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Users, Briefcase } from 'lucide-react';

// Interface for the summary card props
interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

// Summary Card Component
const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  description, 
  icon,
  trend,
  color = "text-blue-600" 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon && <div className={`${color} h-5 w-5`}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" style={{ color: color.replace('text-', '').includes('-') ? `var(--${color.replace('text-', '')})` : '' }}>
          {value}
        </div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center mt-1">
            <span className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              <ArrowUp className={`h-3 w-3 mr-1 ${!trend.isPositive ? 'transform rotate-180' : ''}`} />
              {trend.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Dashboard Summary Cards Component
const DashboardSummaryCards: React.FC = () => {
  // This would typically come from an API call
  const summaryData = {
    donations: {
      total: "$125,670",
      trend: "+5% from last month",
      isPositive: true
    },
    volunteers: {
      total: 85,
      trend: "+10 new this month",
      isPositive: true
    },
    projects: {
      total: 12,
      description: "3 completed last quarter",
      isPositive: true
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        title="Total Donations"
        value={summaryData.donations.total}
        trend={{
          value: summaryData.donations.trend,
          isPositive: summaryData.donations.isPositive
        }}
        color="text-blue-600"
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
      />
      
      <SummaryCard
        title="Active Volunteers"
        value={summaryData.volunteers.total}
        trend={{
          value: summaryData.volunteers.trend,
          isPositive: summaryData.volunteers.isPositive
        }}
        color="text-green-600"
        icon={<Users className="h-4 w-4" />}
      />
      
      <SummaryCard
        title="Ongoing Projects"
        value={summaryData.projects.total}
        description={summaryData.projects.description}
        color="text-amber-600"
        icon={<Briefcase className="h-4 w-4" />}
      />
    </div>
  );
};

export default DashboardSummaryCards;
