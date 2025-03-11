import { ReactNode } from 'react';

type TabPanelProps = {
  children: ReactNode;
  value: number;
  index: number;
};

export function TabPanel({ children, value, index }: TabPanelProps) {
  return value === index && children;
}
