import { useEffect } from "react";
import React from "react";

interface DashboardProps {
  RouteLocation: Location;
}

export const Dashboard = (props: DashboardProps) => {
  useEffect(() => {}, []);
  return <h1>Dashboard</h1>;
};
