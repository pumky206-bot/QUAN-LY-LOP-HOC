import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Download, Settings, Printer, School, Filter } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { data, selectedClassId, setSelectedClassId } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-3.5 bg-white border-b border-slate-200 no-print">
      {/* Zone 1: Brand title & Teacher Identity */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-blue-700 via-blue-800 to-indigo-900 text-amber-300 flex items-center justify-center font-bold shadow-xs border border-blue-600/30">
          <Star className="w-5 h-5 fill-amber-300 text-amber-300 drop-shadow-xs" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
              Quản Lý Lớp Học Ngôi Sao
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap">
            <span className="font-semibold text-blue-900">{data.settings.teacherName}</span>
            <span aria-hidden="true">·</span>
            <span>{data.settings.schoolName}</span>
          </div>
        </div>
      </div>

      {/* Zone 2: Global Class Filter dropdown */}
      <div className="hidden md:flex items-center gap-2 bg-blue-50/70 border border-blue-200/80 rounded-lg px-3 py-1.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
        <Filter className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-medium text-blue-900">Đang lọc theo:</span>
        <select
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="text-xs font-semibold text-blue-950 bg-transparent focus:outline-hidden cursor-pointer"
        >
          <option value="all">Tất cả các lớp ({data.classes.length} lớp)</option>
          {data.classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.code} – {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Zone 3: Actions & Tools */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handlePrint}
          title="In trang báo cáo / sổ điểm hiện tại"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span className="hidden sm:inline">In báo cáo</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <Settings className="w-4 h-4 text-blue-200" />
          <span className="hidden sm:inline">Dữ liệu & Cài đặt</span>
        </button>
      </div>
    </header>
  );
};
