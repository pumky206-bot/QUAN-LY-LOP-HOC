import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  CheckSquare,
  Award,
  TrendingUp,
  MessageSquareText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Database,
  RotateCcw,
} from 'lucide-react';
import { studentNeedsAttention } from '../../utils/calculations';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  onOpenSettings,
}) => {
  const { data, activeTab, setActiveTab, resetToDemoData } = useApp();

  // Calculate count of students needing attention
  const attentionCount = data.students.filter((s) => {
    const check = studentNeedsAttention(
      s,
      data.grades,
      data.taskSubmissions,
      data.tasks,
      data.settings
    );
    return check.needsAttention;
  }).length;

  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Tổng quan',
      icon: LayoutDashboard,
    },
    {
      id: 'classes',
      label: 'Lớp học',
      icon: GraduationCap,
      count: data.classes.length,
    },
    {
      id: 'students',
      label: 'Học sinh',
      icon: Users,
      count: data.students.length,
      badgeColor: attentionCount > 0 ? 'text-amber-700 bg-amber-100' : undefined,
    },
    {
      id: 'lessons',
      label: 'Bài học',
      icon: BookOpen,
      count: data.lessons.length,
    },
    {
      id: 'tasks',
      label: 'Nhiệm vụ',
      icon: CheckSquare,
      count: data.tasks.length,
    },
    {
      id: 'grades',
      label: 'Điểm số',
      icon: Award,
    },
    {
      id: 'progress',
      label: 'Tiến độ học tập',
      icon: TrendingUp,
      count: attentionCount > 0 ? attentionCount : undefined,
      badgeColor: 'text-rose-700 bg-rose-100',
    },
    {
      id: 'feedback',
      label: 'Nhận xét',
      icon: MessageSquareText,
      count: data.feedbacks.length,
    },
    {
      id: 'reports',
      label: 'Thống kê & Báo cáo',
      icon: BarChart3,
    },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-[#0B1528] text-slate-300 flex flex-col justify-between transition-all duration-200 border-r border-slate-800/80 shrink-0 no-print ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header in Sidebar */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          {!collapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                NS
              </div>
              <div className="truncate">
                <span className="text-sm font-semibold text-white tracking-tight block truncate">
                  THCS, THPT Ngôi Sao
                </span>
                <span className="text-xs text-slate-400 block truncate">
                  Năm học {data.settings.currentSchoolYear}
                </span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center font-bold text-sm">
              NS
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden lg:flex items-center justify-center cursor-pointer"
            title={collapsed ? 'Mở rộng thanh điều hướng' : 'Thu gọn thanh điều hướng'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer group relative ${
                  isActive
                    ? 'bg-blue-950/70 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!collapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!collapsed && item.count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono tabular-nums ${
                      item.badgeColor || 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
                {/* Active left indicator pill */}
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-500 rounded-r-sm" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & System Status */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {!collapsed && (
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold text-sm shrink-0">
              BR
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-white block truncate">
                Cô Bùi Thị Ra
              </span>
              <span className="text-[11px] text-blue-400 block truncate">
                Giáo viên phụ trách
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSettings}
            className="flex-1 flex items-center justify-center gap-2 p-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Quản lý sao lưu & Cài đặt hệ thống"
          >
            <Database className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Dữ liệu & Cài đặt</span>}
          </button>
          
          <button
            onClick={() => {
              if (window.confirm('Khôi phục dữ liệu mẫu ban đầu của Cô Bùi Thị Ra?')) {
                resetToDemoData();
              }
            }}
            className="p-2 text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Khôi phục dữ liệu mẫu"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </aside>
  );
};
