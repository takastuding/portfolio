export type WeekendDay = { value: string; label: string; short: string; dow: '土' | '日' };
export type SlotStatus = 'available' | 'booked' | 'loading';

export const TIME_SLOTS = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

export function getUpcomingWeekends(count: number): WeekendDay[] {
    const dates: WeekendDay[] = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);

    while (dates.length < count) {
        const dow = d.getDay();
        if (dow === 0 || dow === 6) {
            const y = d.getFullYear();
            const m = d.getMonth() + 1;
            const day = d.getDate();
            const value = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dowLabel: '土' | '日' = dow === 6 ? '土' : '日';
            dates.push({
                value,
                label: `${y}年${m}月${day}日（${dowLabel}）`,
                short: `${m}/${day}（${dowLabel}）`,
                dow: dowLabel,
            });
        }
        d.setDate(d.getDate() + 1);
    }
    return dates;
}
