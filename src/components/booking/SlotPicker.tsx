import { useState, useEffect, useMemo } from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TIME_SLOTS, getUpcomingWeekends, type WeekendDay, type SlotStatus } from './slots';

type Props = {
    selectedDate: WeekendDay | null;
    selectedTime: string;
    onSelect: (day: WeekendDay, time: string) => void;
    /** 自分の現予約は予約済み扱いしない（管理画面でのリスケ用） */
    excludeDate?: string;
    excludeTime?: string;
    weekendCount?: number;
};

export const SlotPicker = ({
    selectedDate,
    selectedTime,
    onSelect,
    excludeDate,
    excludeTime,
    weekendCount = 10,
}: Props) => {
    const weekends = useMemo(() => getUpcomingWeekends(weekendCount), [weekendCount]);
    const [bookedSlots, setBookedSlots] = useState<Record<string, Set<string>>>({});
    const [loadingSlots, setLoadingSlots] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoadingSlots(true);
            try {
                const dates = weekends.map(w => w.value);
                const { data, error } = await supabase
                    .from('bookings')
                    .select('date, time_start')
                    .in('date', dates)
                    .neq('status', 'cancelled');

                if (error) throw error;

                const map: Record<string, Set<string>> = {};
                (data ?? []).forEach(({ date, time_start }: { date: string; time_start: string }) => {
                    if (excludeDate && excludeTime && date === excludeDate && time_start === excludeTime) return;
                    if (!map[date]) map[date] = new Set();
                    map[date].add(time_start);
                });
                setBookedSlots(map);
            } catch {
                // Supabase未設定時はサイレントにフォールバック
            } finally {
                setLoadingSlots(false);
            }
        };
        fetchBookings();
    }, [weekends, excludeDate, excludeTime]);

    const getSlotStatus = (date: string, time: string): SlotStatus => {
        if (loadingSlots) return 'loading';
        return bookedSlots[date]?.has(time) ? 'booked' : 'available';
    };

    const handleSlotClick = (day: WeekendDay, time: string) => {
        if (getSlotStatus(day.value, time) !== 'available') return;
        onSelect(day, time);
    };

    return (
        <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6">
            <h3 className="text-navy-900 font-bold text-base mb-5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-700" />
                空き状況
                {loadingSlots && <Loader2 className="w-3 h-3 text-stone-400 animate-spin ml-1" />}
            </h3>

            <div className="flex gap-4 mb-5">
                {[
                    { color: 'bg-emerald-100 border-emerald-300 text-emerald-700', label: '空き' },
                    { color: 'bg-stone-100 border-stone-200 text-stone-400', label: '予約済' },
                    { color: 'bg-blue-100 border-blue-400 text-blue-700', label: '選択中' },
                ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-5 h-5 rounded border text-[9px] flex items-center justify-center font-bold ${color}`}>○</div>
                        <span className="text-stone-500 text-xs">{label}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                {weekends.map(day => (
                    <div key={day.value}>
                        <p className="text-xs font-bold text-stone-500 mb-2 flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${day.dow === '土' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-600'}`}>
                                {day.dow}
                            </span>
                            {day.short}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map(time => {
                                const status = getSlotStatus(day.value, time);
                                const isSelected = selectedDate?.value === day.value && selectedTime === time;
                                return (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => handleSlotClick(day, time)}
                                        disabled={status !== 'available'}
                                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                                            isSelected
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                                : status === 'booked'
                                                ? 'bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed line-through'
                                                : status === 'loading'
                                                ? 'bg-stone-50 border-stone-100 text-stone-300'
                                                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
