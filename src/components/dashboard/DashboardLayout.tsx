import { TopNav } from './TopNav';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-rose-50">
      <TopNav />
      <main className="pt-20 px-6 md:px-8 pb-16 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};