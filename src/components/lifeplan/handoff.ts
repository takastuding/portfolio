import {
    type Child,
    type Housing,
    type Inputs,
    type LifeEvent,
    type Marriage,
    type YearData,
    EDUCATION_PATH_OPTIONS,
    formatMan,
} from './engine';

export const HANDOFF_KEY = 'lifeplan_handoff_v1';
export const HANDOFF_TTL_MS = 24 * 60 * 60 * 1000;
export const HANDOFF_CONSULTATION_TYPE = 'ライフプランニング・資産形成';

export type Kpis = {
    atRetireAssets: number;
    endAssets: number;
    peakAssets: number;
    peakAge: number;
    depletionAge: number | null;
};

export type LifeplanHandoff = {
    v: 1;
    savedAt: number;
    consultationType: typeof HANDOFF_CONSULTATION_TYPE;
    summary: string;
    snapshot: { inputs: Inputs; kpis: Kpis };
};

function educationPathLabel(path: Child['educationPath']): string {
    return EDUCATION_PATH_OPTIONS.find((o) => o.value === path)?.label ?? path;
}

function describeMarriage(m: Marriage): string[] {
    if (m.status === 'married') {
        return [
            `・配偶者：あり（現在${m.spouseCurrentAge}歳、年収${m.spouseAnnualIncome}万円）`,
        ];
    }
    if (m.status === 'single-no-plan') {
        return ['・配偶者：なし（結婚予定なし）'];
    }
    return [
        `・配偶者：${m.ageAtMarriage}歳で結婚予定（結婚費用${m.cost}万円、配偶者${m.spouseAgeAtMarriage}歳・年収${m.spouseAnnualIncome}万円）`,
    ];
}

function describeChildren(children: Child[]): string[] {
    if (children.length === 0) return ['・子供：なし'];
    const lines = [`・子供：${children.length}人`];
    children.forEach((c, i) => {
        const ageDesc = c.currentAge >= 0
            ? `現在${c.currentAge}歳`
            : `${Math.abs(c.currentAge)}年後に誕生予定`;
        lines.push(`  - 第${i + 1}子（${ageDesc}）：${educationPathLabel(c.educationPath)}`);
    });
    return lines;
}

function describeHousing(h: Housing): string[] {
    if (h.mode === 'rent') return [`・賃貸（月${h.monthlyRent}万円）`];
    if (h.mode === 'owned-no-loan') return ['・持ち家（住宅ローン完済済み）'];
    if (h.mode === 'owned-with-loan') {
        return [`・持ち家（住宅ローン返済中：月${h.monthlyPayment}万円、残り${h.remainingYears}年）`];
    }
    return [
        `・${h.ageAtPurchase}歳で住宅購入予定（物件価格${h.price}万円、頭金${h.downPayment}万円、ローン${h.loanYears}年・年利${h.annualRate}%）`,
    ];
}

function describeEvents(events: LifeEvent[]): string[] {
    if (events.length === 0) return [];
    const sorted = [...events].sort((a, b) => a.age - b.age);
    const lines = ['', '■ 大型ライフイベント'];
    sorted.forEach((e) => {
        lines.push(`・${e.age}歳：${e.label}（${e.amount}万円）`);
    });
    return lines;
}

function formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

export function buildSummary(inputs: Inputs, kpis: Kpis, _data: YearData[]): string {
    const lines: string[] = [];
    lines.push('【ライフプラン試算結果サマリ】');
    lines.push('※当方サイトの簡易シミュレーターでの試算です。本格設計のご相談を希望します。');
    lines.push('');

    lines.push('■ 基本情報');
    lines.push(`・現在 ${inputs.currentAge}歳 / リタイア ${inputs.retirementAge}歳 / 試算終了 ${inputs.endAge}歳`);
    lines.push(`・年収（手取り）${inputs.annualIncome}万円 / 現在資産 ${inputs.currentAssets}万円`);
    lines.push(`・想定インフレ率 ${inputs.inflationRate}% / 想定運用利回り ${inputs.returnRate}%`);
    lines.push('');

    lines.push('■ 家族構成');
    lines.push(...describeMarriage(inputs.marriage));
    lines.push(...describeChildren(inputs.children));
    lines.push('');

    lines.push('■ 住宅');
    lines.push(...describeHousing(inputs.housing));
    lines.push('');

    lines.push('■ 老後・年金');
    lines.push(
        `・年金開始 ${inputs.pensionStartAge}歳 / 世帯年金月額 ${inputs.monthlyPensionHousehold}万円 / 退職金 ${inputs.retirementBonus}万円`,
    );

    lines.push(...describeEvents(inputs.events));
    lines.push('');

    lines.push('■ シミュレーション結果（KPI）');
    lines.push(`・リタイア時(${inputs.retirementAge}歳)資産：${formatMan(kpis.atRetireAssets)}`);
    lines.push(`・試算終了時(${inputs.endAge}歳)資産：${formatMan(kpis.endAssets)}`);
    lines.push(`・ピーク資産：${formatMan(kpis.peakAssets)}（${kpis.peakAge}歳時点）`);
    lines.push(
        kpis.depletionAge !== null
            ? `・資産枯渇年齢：${kpis.depletionAge}歳`
            : '・資産枯渇：試算期間内に到達せず',
    );
    lines.push('');

    lines.push('■ ご相談で確認したいこと');
    lines.push('（ご自由にご記入ください。例：教育費の現実感、住宅購入の判断、運用比率 など）');
    lines.push('');

    lines.push('────────────────');
    lines.push(`[${formatDate(new Date())} 試算 / 当日の相談で前提を再確認します]`);

    return lines.join('\n');
}

export function saveHandoff(inputs: Inputs, kpis: Kpis, data: YearData[]): void {
    const payload: LifeplanHandoff = {
        v: 1,
        savedAt: Date.now(),
        consultationType: HANDOFF_CONSULTATION_TYPE,
        summary: buildSummary(inputs, kpis, data),
        snapshot: { inputs, kpis },
    };
    try {
        localStorage.setItem(HANDOFF_KEY, JSON.stringify(payload));
    } catch {
        /* quota / private mode: silent fail */
    }
}

export function loadHandoff(): LifeplanHandoff | null {
    try {
        const raw = localStorage.getItem(HANDOFF_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as LifeplanHandoff;
        if (parsed.v !== 1) return null;
        if (Date.now() - parsed.savedAt > HANDOFF_TTL_MS) {
            localStorage.removeItem(HANDOFF_KEY);
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
}

export function clearHandoff(): void {
    try {
        localStorage.removeItem(HANDOFF_KEY);
    } catch {
        /* noop */
    }
}
