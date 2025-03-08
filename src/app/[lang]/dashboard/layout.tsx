import DashboardLayout from "@/layout/DashboardLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
