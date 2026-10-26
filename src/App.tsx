import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { SettingsModal } from './components/views/SettingsModal';
import { DashboardView } from './components/views/DashboardView';
import { ClassesView } from './components/views/ClassesView';
import { StudentsView } from './components/views/StudentsView';
import { LessonsView } from './components/views/LessonsView';
import { TasksView } from './components/views/TasksView';
import { GradesView } from './components/views/GradesView';
import { ProgressView } from './components/views/ProgressView';
import { FeedbackView } from './components/views/FeedbackView';
import { ReportsView } from './components/views/ReportsView';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <div className="flex flex-1">
        {/* Navigation Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header onOpenSettings={() => setIsSettingsOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'classes' && <ClassesView />}
            {activeTab === 'students' && <StudentsView />}
            {activeTab === 'lessons' && <LessonsView />}
            {activeTab === 'tasks' && <TasksView />}
            {activeTab === 'grades' && <GradesView />}
            {activeTab === 'progress' && <ProgressView />}
            {activeTab === 'feedback' && <FeedbackView />}
            {activeTab === 'reports' && <ReportsView />}
          </main>
        </div>
      </div>

      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Settings & Backup Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
