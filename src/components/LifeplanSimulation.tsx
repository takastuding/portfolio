import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Wallet,
    TrendingUp,
    Banknote,
    Calculator,
    AlertTriangle,
    Sparkles,
    RotateCcw,
} from 'lucide-react';

/* ---------------------------------------------------------------- */
/* 計算ロジック                                                      */
/* ---------------------------------------------------------------- */

type Inputs = {
    currentAge: number;
    retirementAge: number;
    endAge: number;
    annualIncome: number;       // 手取り 万円/年
    annualExpense: number;      // 年間支出 万円/年
    currentAssets: number;      // 現在の貯蓄・投資額 万円
    pensionStartAge: number;
    monthlyPension: number;     // 月額 万円
    retirementBonus: number;    // 退職金 一時金 万円
    returnRate: number;         // %
    inflationRate: number;      // %
};

type YearData = {
    age: number;
    income: number;          // 万円
    expense: number;         // 万円
    netCashflow: number;     // 万円
    assets: number;          // 万円
};

const DEFAULTS: Inputs = {
    currentAge: 35,
    retirementAge: 65,
    endAge: 95,
    annualIncome: 500,
    annualExpense: 360,
    currentAssets: 500,
    pensionStartAge: 65,
    monthlyPension: 15,
    retirementBonus: 1000,
    returnRate: 3,
    inflationRate: 1.5,
};

function simulate(inputs: Inputs): YearData[] {
    const rows: YearData[] = [];
    let assets = inputs.currentAssets;
    const r = inputs.returnRate / 100;
    const i = inputs.inflationRate / 100;

    for (let age = inputs.currentAge; age <= inputs.endAge; age++) {
        const yearsFromNow = age - inputs.currentAge;

        let income = 0;
        if (age < inputs.retirementAge) {
            income += inputs.annualIncome;
        }
        if (age >= inputs.pensionStartAge) {
            income += inputs.monthlyPension * 12;
        }

        const expense = inputs.annualExpense * Math.pow(1 + i, yearsFromNow);

        let oneTime = 0;
        if (age === inputs.retirementAge) {
            oneTime = inputs.retirementBonus;
        }

        assets = assets * (1 + r) + income - expense + oneTime;

        rows.push({
            age,
            income: Math.round(income),
            expense: Math.round(expense),
            netCashflow: Math.round(income - expense + oneTime),
            assets: Math.round(assets),
        });
    }
    return rows;
}

function formatMan(man: number): string {
    if (Math.abs(man) >= 10000) {
        return `${(man / 10000).toFixed(2)}億円`;
    }
    return `${Math.round(man).toLocaleString()}万円`;
}

function formatSignedMan(man: number): string {
    const sign = man >= 0 ? '+' : '-';
    return `${sign}${formatMan(Math.abs(man))}`;
}

/* ---------------------------------------------------------------- */
/* 入力コントロール                                                  */
/* ---------------------------------------------------------------- */

type ControlProps = {
    label: string;
    unit: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (v: number) => void;
    hint?: string;
};

const Control = ({ label, unit, value, min, max, step = 1, onChange, hint }: ControlProps) => (
    <div>
        <div className="flex items-baseline justify-between mb-1.5">
            <label className="text-stone-700 text-xs font-bold">{label}</label>
            <span className="text-blue-800 text-sm font-bold tabular-nums">
                {value.toLocaleString()}
                <span className="text-stone-400 text-[10px] font-medium ml-1">{unit}</span>
            </span>
        </div>
        <div className="flex items-center gap-2">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="flex-1 accent-blue-700 h-1.5"
            />
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => {
                    const v = Number(e.target.value);
                    if (Number.isFinite(v)) onChange(v);
                }}
                className="w-20 px-2 py-1 text-right rounded-md border border-stone-200 text-stone-800 text-xs tabular-nums focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
        </div>
        {hint && <p className="text-stone-400 text-[10px] mt-1">{hint}</p>}
    </div>
);

/* ---------------------------------------------------------------- */
/* チャート                                                          */
/* ---------------------------------------------------------------- */

type ChartProps = {
    data: YearData[];
    retirementAge: number;
    pensionStartAge: number;
    depletionAge: number | null;
    selectedAge: number;
    onSelect: (age: number) => void;
};

const Chart = ({ data, retirementAge, pensionStartAge, depletionAge, selectedAge, onSelect }: ChartProps) => {
    const W = 720;
    const H = 320;
    const P = { t: 24, r: 24, b: 36, l: 64 };
    const innerW = W - P.l - P.r;
    const innerH = H - P.t - P.b;

    if (data.length === 0) return null;
    const minAge = data[0].age;
    const maxAge = data[data.length - 1].age;

    const assetsList = data.map((d) => d.assets);
    const rawMax = Math.max(...assetsList);
    const rawMin = Math.min(...assetsList, 0);
    const pad = Math.max((rawMax - rawMin) * 0.08, 100);
    const yMax = rawMax + pad;
    const yMin = rawMin - pad;
    const range = yMax - yMin || 1;

    const x = (age: number) => P.l + ((age - minAge) / (maxAge - minAge)) * innerW;
    const y = (asset: number) => P.t + (1 - (asset - yMin) / range) * innerH;

    const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(d.age)} ${y(d.assets)}`).join(' ');
    const areaPath = `${linePath} L ${x(maxAge)} ${y(yMin < 0 ? 0 : yMin)} L ${x(minAge)} ${y(yMin < 0 ? 0 : yMin)} Z`;

    const gridSteps = 4;
    const gridValues = Array.from({ length: gridSteps + 1 }, (_, i) => yMin + (range * i) / gridSteps);

    const xLabels: number[] = [];
    for (let age = Math.ceil(minAge / 5) * 5; age <= maxAge; age += 5) xLabels.push(age);

    const stepW = innerW / Math.max(maxAge - minAge, 1);
    const selected = data.find((d) => d.age === selectedAge);

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label="資産推移グラフ">
            <defs>
                <linearGradient id="lifeplanArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* グリッド線 + Y軸ラベル */}
            {gridValues.map((val, i) => (
                <g key={i}>
                    <line
                        x1={P.l}
                        y1={y(val)}
                        x2={W - P.r}
                        y2={y(val)}
                        stroke="#e2e8f0"
                        strokeDasharray="2,4"
                    />
                    <text
                        x={P.l - 10}
                        y={y(val)}
                        dy="0.32em"
                        textAnchor="end"
                        fontSize="10"
                        fill="#94a3b8"
                    >
                        {formatMan(val)}
                    </text>
                </g>
            ))}

            {/* ゼロ基準線 */}
            {yMin < 0 && (
                <line
                    x1={P.l}
                    y1={y(0)}
                    x2={W - P.r}
                    y2={y(0)}
                    stroke="#ef4444"
                    strokeOpacity="0.55"
                    strokeWidth="1"
                />
            )}

            {/* 資産推移 エリア + ライン */}
            <path d={areaPath} fill="url(#lifeplanArea)" />
            <path d={linePath} fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round" />

            {/* マーカー線：リタイア年齢 */}
            {retirementAge >= minAge && retirementAge <= maxAge && (
                <g>
                    <line
                        x1={x(retirementAge)}
                        y1={P.t}
                        x2={x(retirementAge)}
                        y2={H - P.b}
                        stroke="#f59e0b"
                        strokeDasharray="3,3"
                    />
                    <text
                        x={x(retirementAge)}
                        y={P.t + 10}
                        fontSize="9"
                        fontWeight="700"
                        fill="#b45309"
                        textAnchor="middle"
                    >
                        リタイア {retirementAge}歳
                    </text>
                </g>
            )}

            {/* マーカー線：年金開始（リタイア年齢と異なる場合のみ） */}
            {pensionStartAge !== retirementAge && pensionStartAge >= minAge && pensionStartAge <= maxAge && (
                <g>
                    <line
                        x1={x(pensionStartAge)}
                        y1={P.t}
                        x2={x(pensionStartAge)}
                        y2={H - P.b}
                        stroke="#10b981"
                        strokeDasharray="3,3"
                        strokeOpacity="0.7"
                    />
                    <text
                        x={x(pensionStartAge)}
                        y={P.t + 22}
                        fontSize="9"
                        fontWeight="700"
                        fill="#047857"
                        textAnchor="middle"
                    >
                        年金 {pensionStartAge}歳
                    </text>
                </g>
            )}

            {/* マーカー線：資産尽き */}
            {depletionAge !== null && (
                <g>
                    <line
                        x1={x(depletionAge)}
                        y1={P.t}
                        x2={x(depletionAge)}
                        y2={H - P.b}
                        stroke="#ef4444"
                        strokeWidth="1.5"
                    />
                    <text
                        x={x(depletionAge)}
                        y={P.t + 10}
                        fontSize="9"
                        fontWeight="700"
                        fill="#b91c1c"
                        textAnchor="middle"
                    >
                        資産0 {depletionAge}歳
                    </text>
                </g>
            )}

            {/* X軸ラベル */}
            {xLabels.map((age) => (
                <text
                    key={age}
                    x={x(age)}
                    y={H - P.b + 18}
                    fontSize="10"
                    fill="#64748b"
                    textAnchor="middle"
                >
                    {age}
                </text>
            ))}
            <text x={W - P.r} y={H - 4} fontSize="9" fill="#94a3b8" textAnchor="end">
                （歳）
            </text>

            {/* 選択中のポイント */}
            {selected && (
                <g>
                    <line
                        x1={x(selected.age)}
                        y1={P.t}
                        x2={x(selected.age)}
                        y2={H - P.b}
                        stroke="#1d4ed8"
                        strokeOpacity="0.3"
                    />
                    <circle
                        cx={x(selected.age)}
                        cy={y(selected.assets)}
                        r="5"
                        fill="#fff"
                        stroke="#1d4ed8"
                        strokeWidth="2.5"
                    />
                </g>
            )}

            {/* ホバー検出領域 */}
            {data.map((d) => (
                <rect
                    key={d.age}
                    x={x(d.age) - stepW / 2}
                    y={P.t}
                    width={stepW}
                    height={innerH}
                    fill="transparent"
                    onMouseEnter={() => onSelect(d.age)}
                    onClick={() => onSelect(d.age)}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </svg>
    );
};

/* ---------------------------------------------------------------- */
/* メインページ                                                      */
/* ---------------------------------------------------------------- */

export const LifeplanSimulation = () => {
    const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
    const [selectedAge, setSelectedAge] = useState<number>(DEFAULTS.retirementAge);

    const update = <K extends keyof Inputs>(key: K) => (v: number) => {
        setInputs((prev) => {
            const next = { ...prev, [key]: v };
            // 整合性ガード：終了年齢 < リタイア年齢 < 現在年齢 にならないよう調整
            if (next.retirementAge < next.currentAge) next.retirementAge = next.currentAge;
            if (next.endAge < next.retirementAge) next.endAge = next.retirementAge;
            if (next.pensionStartAge < next.currentAge) next.pensionStartAge = next.currentAge;
            return next;
        });
    };

    const reset = () => {
        setInputs(DEFAULTS);
        setSelectedAge(DEFAULTS.retirementAge);
    };

    const data = useMemo(() => simulate(inputs), [inputs]);

    const kpis = useMemo(() => {
        const atRetire = data.find((d) => d.age === inputs.retirementAge);
        const last = data[data.length - 1];
        const peak = data.reduce((acc, d) => (d.assets > acc.assets ? d : acc), data[0]);
        const depletion = data.find((d) => d.assets < 0) ?? null;
        return {
            atRetireAssets: atRetire?.assets ?? 0,
            endAssets: last?.assets ?? 0,
            peakAssets: peak.assets,
            peakAge: peak.age,
            depletionAge: depletion?.age ?? null,
        };
    }, [data, inputs.retirementAge]);

    // selectedAge が範囲外なら調整
    const clampedSelectedAge = Math.min(Math.max(selectedAge, inputs.currentAge), inputs.endAge);
    const selected = data.find((d) => d.age === clampedSelectedAge) ?? data[0];

    return (
        <div className="min-h-screen bg-surface-50">
            <header className="border-b border-stone-200 bg-white/95 backdrop-blur sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = '';
                            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                        }}
                        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-blue-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        トップへ戻る
                    </a>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
                        <span className="text-navy-900 font-bold text-xs">橋本社会保険労務士事務所</span>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="section-label mb-3">Lifeplan Simulation</p>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
                        ライフプランシミュレーション
                    </h1>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                    <p className="mt-5 text-stone-500 text-sm sm:text-base leading-relaxed max-w-2xl [text-wrap:pretty]">
                        現在の年齢・収入・支出・資産・想定運用利回りなどを入力すると、
                        将来の資産推移をリアルタイムにシミュレーションします。
                        個別の制度（社会保険料・税金等）は簡略化していますので、概観の把握用としてご利用ください。
                    </p>
                </motion.div>

                {/* KPI カード */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3"
                >
                    <KpiCard
                        icon={<Calendar className="w-4 h-4 text-blue-700" />}
                        label={`${inputs.retirementAge}歳時点の資産`}
                        value={formatMan(kpis.atRetireAssets)}
                        tone={kpis.atRetireAssets >= 0 ? 'blue' : 'red'}
                    />
                    <KpiCard
                        icon={<TrendingUp className="w-4 h-4 text-emerald-700" />}
                        label={`ピーク資産（${kpis.peakAge}歳）`}
                        value={formatMan(kpis.peakAssets)}
                        tone="emerald"
                    />
                    <KpiCard
                        icon={<Wallet className="w-4 h-4 text-blue-700" />}
                        label={`${inputs.endAge}歳時点の資産`}
                        value={formatMan(kpis.endAssets)}
                        tone={kpis.endAssets >= 0 ? 'blue' : 'red'}
                    />
                    <KpiCard
                        icon={
                            kpis.depletionAge !== null
                                ? <AlertTriangle className="w-4 h-4 text-red-700" />
                                : <Sparkles className="w-4 h-4 text-emerald-700" />
                        }
                        label="資産が尽きる年齢"
                        value={kpis.depletionAge !== null ? `${kpis.depletionAge}歳` : '到達せず'}
                        tone={kpis.depletionAge !== null ? 'red' : 'emerald'}
                    />
                </motion.div>

                {kpis.depletionAge !== null && (
                    <div className="mt-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                            このプランでは <span className="font-bold">{kpis.depletionAge}歳</span> で資産が底をつく試算です。
                            支出の見直し、就労期間の延長、運用利回りの改善などで改善余地を検討しましょう。
                        </p>
                    </div>
                )}

                <div className="mt-10 grid lg:grid-cols-5 gap-6 items-start">
                    {/* 入力フォーム */}
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="lg:col-span-2 space-y-5"
                    >
                        <Section title="基本情報" icon={<Calendar className="w-4 h-4 text-blue-700" />}>
                            <Control
                                label="現在の年齢"
                                unit="歳"
                                value={inputs.currentAge}
                                min={20}
                                max={70}
                                onChange={update('currentAge')}
                            />
                            <Control
                                label="リタイア予定年齢"
                                unit="歳"
                                value={inputs.retirementAge}
                                min={inputs.currentAge}
                                max={80}
                                onChange={update('retirementAge')}
                            />
                            <Control
                                label="シミュレーション終了年齢"
                                unit="歳"
                                value={inputs.endAge}
                                min={inputs.retirementAge}
                                max={110}
                                onChange={update('endAge')}
                            />
                        </Section>

                        <Section title="収入" icon={<Banknote className="w-4 h-4 text-blue-700" />}>
                            <Control
                                label="現在の年収（手取り）"
                                unit="万円/年"
                                value={inputs.annualIncome}
                                min={0}
                                max={3000}
                                step={10}
                                onChange={update('annualIncome')}
                            />
                            <Control
                                label="年金受給開始年齢"
                                unit="歳"
                                value={inputs.pensionStartAge}
                                min={inputs.currentAge}
                                max={75}
                                onChange={update('pensionStartAge')}
                            />
                            <Control
                                label="年金月額（想定）"
                                unit="万円/月"
                                value={inputs.monthlyPension}
                                min={0}
                                max={40}
                                onChange={update('monthlyPension')}
                                hint="標準的な厚生年金の目安は月14〜16万円"
                            />
                            <Control
                                label="退職金（一時金）"
                                unit="万円"
                                value={inputs.retirementBonus}
                                min={0}
                                max={10000}
                                step={50}
                                onChange={update('retirementBonus')}
                            />
                        </Section>

                        <Section title="支出" icon={<Wallet className="w-4 h-4 text-blue-700" />}>
                            <Control
                                label="年間支出"
                                unit="万円/年"
                                value={inputs.annualExpense}
                                min={0}
                                max={2000}
                                step={10}
                                onChange={update('annualExpense')}
                                hint="家賃・食費・通信費など現役時の実支出ベース"
                            />
                            <Control
                                label="想定インフレ率"
                                unit="%/年"
                                value={inputs.inflationRate}
                                min={0}
                                max={5}
                                step={0.1}
                                onChange={update('inflationRate')}
                            />
                        </Section>

                        <Section title="資産・運用" icon={<TrendingUp className="w-4 h-4 text-blue-700" />}>
                            <Control
                                label="現在の貯蓄・投資額"
                                unit="万円"
                                value={inputs.currentAssets}
                                min={0}
                                max={20000}
                                step={50}
                                onChange={update('currentAssets')}
                            />
                            <Control
                                label="想定運用利回り"
                                unit="%/年"
                                value={inputs.returnRate}
                                min={0}
                                max={10}
                                step={0.1}
                                onChange={update('returnRate')}
                                hint="長期国際分散投資の目安は3〜5%"
                            />
                        </Section>

                        <button
                            type="button"
                            onClick={reset}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-stone-600 text-xs font-semibold bg-white border border-stone-200 hover:border-blue-300 hover:text-blue-800 hover:bg-blue-50 transition-all"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            初期値に戻す
                        </button>
                    </motion.div>

                    {/* チャート + 詳細 */}
                    <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-3 space-y-5"
                    >
                        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-navy-900 font-bold text-sm flex items-center gap-2">
                                    <Calculator className="w-4 h-4 text-blue-700" />
                                    資産推移
                                </h3>
                                <p className="text-stone-400 text-[10px]">
                                    グラフ上にマウスをのせると年齢別の詳細を表示
                                </p>
                            </div>
                            <Chart
                                data={data}
                                retirementAge={inputs.retirementAge}
                                pensionStartAge={inputs.pensionStartAge}
                                depletionAge={kpis.depletionAge}
                                selectedAge={clampedSelectedAge}
                                onSelect={setSelectedAge}
                            />
                        </div>

                        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
                            <p className="text-stone-400 text-[10px] font-bold tracking-widest uppercase mb-3">
                                Year Detail
                            </p>
                            <p className="text-navy-900 font-bold text-base mb-3">
                                {selected.age}歳 の見通し
                            </p>
                            <dl className="grid grid-cols-2 gap-3 text-sm">
                                <Stat label="年間収入" value={formatMan(selected.income)} />
                                <Stat label="年間支出" value={formatMan(selected.expense)} />
                                <Stat
                                    label="ネット収支"
                                    value={formatSignedMan(selected.netCashflow)}
                                    tone={selected.netCashflow >= 0 ? 'emerald' : 'red'}
                                />
                                <Stat
                                    label="年末資産"
                                    value={formatMan(selected.assets)}
                                    tone={selected.assets >= 0 ? 'blue' : 'red'}
                                />
                            </dl>
                        </div>
                    </motion.div>
                </div>

                {/* 注意書き */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 p-5 rounded-2xl bg-stone-50 border border-stone-200"
                >
                    <p className="text-stone-500 text-xs leading-relaxed">
                        ※ 本シミュレーターは概観の把握を目的とした簡易計算ツールであり、
                        税金・社会保険料・公的年金の正確な計算、ライフイベント（住宅購入・教育費・医療介護費等）の個別反映は行いません。
                        実際のライフプランは個別事情により大きく変動するため、本格的な設計をご希望の方は個別相談をご活用ください。
                    </p>
                </motion.div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <a
                        href="#booking"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = '';
                            setTimeout(() => {
                                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                            }, 50);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm bg-blue-700 hover:bg-blue-800 transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                    >
                        個別相談でライフプランを精緻化する
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = '';
                            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                        }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-stone-700 font-bold text-sm bg-white border border-stone-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800 transition-all"
                    >
                        トップへ戻る
                    </a>
                </div>
            </main>

            <footer className="border-t border-stone-200 py-8 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center text-stone-400 text-xs">
                    &copy; {new Date().getFullYear()} 橋本社会保険労務士事務所
                </div>
            </footer>
        </div>
    );
};

/* ---------------------------------------------------------------- */
/* 補助コンポーネント                                                */
/* ---------------------------------------------------------------- */

const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
        <h3 className="text-navy-900 font-bold text-sm flex items-center gap-2 mb-4">
            {icon}
            {title}
        </h3>
        <div className="space-y-4">{children}</div>
    </div>
);

type Tone = 'blue' | 'emerald' | 'red';

const toneClasses: Record<Tone, { bg: string; border: string; text: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-800' },
    red: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-800' },
};

const KpiCard = ({
    icon,
    label,
    value,
    tone,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    tone: Tone;
}) => {
    const t = toneClasses[tone];
    return (
        <div className={`rounded-2xl border ${t.border} ${t.bg} p-4`}>
            <div className="flex items-center gap-1.5 mb-2">
                {icon}
                <p className="text-stone-500 text-[10px] font-semibold leading-tight">{label}</p>
            </div>
            <p className={`${t.text} font-bold text-base sm:text-lg tabular-nums`}>{value}</p>
        </div>
    );
};

const Stat = ({ label, value, tone = 'blue' }: { label: string; value: string; tone?: Tone }) => {
    const t = toneClasses[tone];
    return (
        <div className={`rounded-xl border ${t.border} ${t.bg} px-4 py-3`}>
            <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className={`${t.text} font-bold text-sm tabular-nums`}>{value}</p>
        </div>
    );
};
