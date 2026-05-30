import { useEffect, useMemo, useState } from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TIME_SLOTS, getUpcomingWeekends, type SlotStatus, type WeekendDay } from './slots';

type Props = {
    selectedDate: WeekendDay | null;
    selectedTime: string;
    onSelect: (day: WeekendDay, time: string) => void;
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
                setBookedSlots({});
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
        <div className="booking-card">
            <div className="booking-card-head">
                <h3>
                    <Calendar aria-hidden="true" />
                    空き状況
                </h3>
                {loadingSlots && <Loader2 className="booking-spin" aria-label="空き状況を確認中" />}
            </div>

            <div className="slot-legend" aria-label="予約枠の凡例">
                <span><i className="slot-open" />空き</span>
                <span><i className="slot-booked" />予約済み</span>
                <span><i className="slot-selected" />選択中</span>
            </div>

            <div className="slot-list">
                {weekends.map(day => (
                    <div className="slot-day" key={day.value}>
                        <p className="slot-day-label">
                            <span className={day.dow === '土' ? 'is-sat' : 'is-sun'}>{day.dow}</span>
                            {day.short}
                        </p>
                        <div className="slot-grid">
                            {TIME_SLOTS.map(time => {
                                const status = getSlotStatus(day.value, time);
                                const isSelected = selectedDate?.value === day.value && selectedTime === time;
                                return (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => handleSlotClick(day, time)}
                                        disabled={status !== 'available'}
                                        className={[
                                            'slot-button',
                                            isSelected ? 'is-selected' : '',
                                            status === 'booked' ? 'is-booked' : '',
                                            status === 'loading' ? 'is-loading' : '',
                                        ].join(' ')}
                                        aria-pressed={isSelected}
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
