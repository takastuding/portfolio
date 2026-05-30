import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
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
    Users,
    Home,
    Plus,
    Trash2,
    BookOpen,
} from 'lucide-react';
import {
    type Child,
    type EducationPath,
    type Housing,
    type Inputs,
    type LifeEvent,
    type Marriage,
    type YearData,
    DEFAULTS,
    EDUCATION_COSTS,
    EDUCATION_PATH_OPTIONS,
    formatMan,
    formatSignedMan,
    newId,
    simulate,
} from './lifeplan/engine';
import { saveHandoff } from './lifeplan/handoff';

/* ===================== ページ本体 ===================== */

export const LifeplanSimulation = () => {
    const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
    const [selectedAge, setSelectedAge] = useState<number>(DEFAULTS.retirementAge);

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

    const clampedSelectedAge = Math.min(Math.max(selectedAge, inputs.currentAge), inputs.endAge);
    const selected = data.find((d) => d.age === clampedSelectedAge) ?? data[0];

    const set = <K extends keyof Inputs>(key: K) => (value: Inputs[K]) => {
        setInputs((prev) => {
            const next = { ...prev, [key]: value };
            // 整合性ガード
            if (next.retirementAge < next.currentAge) next.retirementAge = next.currentAge;
            if (next.endAge < next.retirementAge) next.endAge = next.retirementAge;
            if (next.pensionStartAge < next.currentAge) next.pensionStartAge = next.currentAge;
            return next;
        });
    };

    const setNum = <K extends keyof Inputs>(key: K) => (v: number) => {
        set(key)(v as Inputs[K]);
    };

    const reset = () => {
        setInputs(DEFAULTS);
        setSelectedAge(DEFAULTS.retirementAge);
    };

    /* ----- child handlers ----- */
    const updateChild = (id: string, patch: Partial<Child>) => {
        set('children')(inputs.children.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    };
    const addChild = () => {
        if (inputs.children.length >= 6) return;
        set('children')([
            ...inputs.children,
            { id: newId(), currentAge: 0, educationPath: 'public-then-private-univ' },
        ]);
    };
    const removeChild = (id: string) => {
        set('children')(inputs.children.filter((c) => c.id !== id));
    };

    /* ----- event handlers ----- */
    const updateEvent = (id: string, patch: Partial<LifeEvent>) => {
        set('events')(inputs.events.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    };
    const addEvent = () => {
        if (inputs.events.length >= 12) return;
        set('events')([
            ...inputs.events,
            { id: newId(), age: inputs.currentAge + 5, label: '車購入', amount: 250 },
        ]);
    };
    const removeEvent = (id: string) => {
        set('events')(inputs.events.filter((e) => e.id !== id));
    };

    /* ----- marriage handlers ----- */
    const setMarriageStatus = (status: Marriage['status']) => {
        if (status === 'married') {
            set('marriage')({ status, spouseCurrentAge: inputs.currentAge, spouseAnnualIncome: 300 });
        } else if (status === 'single-no-plan') {
            set('marriage')({ status });
        } else {
            set('marriage')({
                status,
                ageAtMarriage: inputs.currentAge + 3,
                cost: 300,
                spouseAgeAtMarriage: inputs.currentAge + 3,
                spouseAnnualIncome: 300,
            });
        }
    };

    /* ----- housing handlers ----- */
    const setHousingMode = (mode: Housing['mode']) => {
        if (mode === 'rent') set('housing')({ mode, monthlyRent: 10 });
        else if (mode === 'owned-no-loan') set('housing')({ mode });
        else if (mode === 'owned-with-loan') set('housing')({ mode, monthlyPayment: 10, remainingYears: 25 });
        else
            set('housing')({
                mode,
                ageAtPurchase: inputs.currentAge + 5,
                price: 4000,
                downPayment: 500,
                loanYears: 35,
                annualRate: 1.5,
            });
    };

    return (
        <div id="lifeplan" className="handoff-page min-h-screen">
            <Header />

            <main className="max-w-6xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
                <div className="lp-page-crumb">
                    <a
                        href="#top"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = '';
                            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                        }}
                    >
                        トップ
                    </a>
                    <span className="lp-page-crumb-sep">/</span>
                    <span>ライフプランシミュレーション</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="num">LIFEPLAN SIMULATION</span>
                    <h1
                        className="serif"
                        style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 600, lineHeight: 1.4, margin: '16px 0 0', color: 'var(--ink)' }}
                    >
                        ライフプランシミュレーション
                    </h1>
                    <div style={{ marginTop: 16, height: 1, width: 36, background: 'var(--accent)' }} />
                    <p style={{ marginTop: 18, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.95, maxWidth: 640 }}>
                        年齢・家族構成・収入・支出・住宅・教育費・ライフイベントを入力すると、
                        各年の収支と将来の資産推移をリアルタイムにシミュレーションします。
                        税・社会保険料の精緻な計算は行わない簡易ツールです。
                    </p>
                </motion.div>

                {/* KPI */}
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
                            kpis.depletionAge !== null ? (
                                <AlertTriangle className="w-4 h-4 text-red-700" />
                            ) : (
                                <Sparkles className="w-4 h-4 text-emerald-700" />
                            )
                        }
                        label="資産が尽きる年齢"
                        value={kpis.depletionAge !== null ? `${kpis.depletionAge}歳` : '到達せず'}
                        tone={kpis.depletionAge !== null ? 'red' : 'emerald'}
                    />
                </motion.div>

                {kpis.depletionAge !== null && (
                    <div className="mt-5 p-4 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                            このプランでは <span className="font-bold">{kpis.depletionAge}歳</span> で資産が底をつく試算です。
                            支出・教育コース・住宅プラン・運用利回りの見直しを検討しましょう。
                        </p>
                    </div>
                )}

                <div className="mt-10 grid lg:grid-cols-5 gap-6 items-start">
                    {/* ---------- 入力フォーム ---------- */}
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="lg:col-span-2 space-y-5 lp-input-panel lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-106px)] lg:overflow-y-auto"
                    >
                        <Section title="基本情報" icon={<Calendar className="w-4 h-4 text-blue-700" />}>
                            <SliderControl
                                label="現在の年齢"
                                unit="歳"
                                value={inputs.currentAge}
                                min={20}
                                max={70}
                                onChange={setNum('currentAge')}
                            />
                            <SliderControl
                                label="リタイア予定年齢"
                                unit="歳"
                                value={inputs.retirementAge}
                                min={inputs.currentAge}
                                max={80}
                                onChange={setNum('retirementAge')}
                            />
                            <SliderControl
                                label="シミュレーション終了年齢"
                                unit="歳"
                                value={inputs.endAge}
                                min={inputs.retirementAge}
                                max={110}
                                onChange={setNum('endAge')}
                            />
                            <SliderControl
                                label="あなたの年収（手取り）"
                                unit="万円/年"
                                value={inputs.annualIncome}
                                min={0}
                                max={3000}
                                step={10}
                                onChange={setNum('annualIncome')}
                            />
                            <SliderControl
                                label="現在の貯蓄・投資額"
                                unit="万円"
                                value={inputs.currentAssets}
                                min={0}
                                max={20000}
                                step={50}
                                onChange={setNum('currentAssets')}
                            />
                        </Section>

                        {/* ---------- 家族構成 ---------- */}
                        <Section title="家族構成" icon={<Users className="w-4 h-4 text-blue-700" />}>
                            <div>
                                <p className="text-stone-600 text-[11px] font-bold mb-2">配偶者</p>
                                <Segmented
                                    options={[
                                        { value: 'married', label: '配偶者あり' },
                                        { value: 'single-no-plan', label: '独身・予定なし' },
                                        { value: 'single-plan-marry', label: '独身・結婚予定あり' },
                                    ]}
                                    value={inputs.marriage.status}
                                    onChange={(v) => setMarriageStatus(v as Marriage['status'])}
                                />

                                {inputs.marriage.status === 'married' && (
                                    <div className="mt-3 space-y-3">
                                        <SliderControl
                                            label="配偶者の現在の年齢"
                                            unit="歳"
                                            value={inputs.marriage.spouseCurrentAge}
                                            min={20}
                                            max={70}
                                            onChange={(v) =>
                                                set('marriage')({
                                                    ...inputs.marriage,
                                                    spouseCurrentAge: v,
                                                } as Marriage)
                                            }
                                        />
                                        <SliderControl
                                            label="配偶者の年収（手取り）"
                                            unit="万円/年"
                                            value={inputs.marriage.spouseAnnualIncome}
                                            min={0}
                                            max={2000}
                                            step={10}
                                            onChange={(v) =>
                                                set('marriage')({
                                                    ...inputs.marriage,
                                                    spouseAnnualIncome: v,
                                                } as Marriage)
                                            }
                                            hint="無職の場合は 0 でOK"
                                        />
                                    </div>
                                )}

                                {inputs.marriage.status === 'single-plan-marry' && (
                                    <div className="mt-3 space-y-3">
                                        <SliderControl
                                            label="結婚予定年齢（あなた）"
                                            unit="歳"
                                            value={inputs.marriage.ageAtMarriage}
                                            min={inputs.currentAge}
                                            max={Math.min(inputs.retirementAge, 60)}
                                            onChange={(v) =>
                                                set('marriage')({
                                                    ...inputs.marriage,
                                                    ageAtMarriage: v,
                                                } as Marriage)
                                            }
                                        />
                                        <SliderControl
                                            label="結婚費用（自己負担）"
                                            unit="万円"
                                            value={inputs.marriage.cost}
                                            min={0}
                                            max={1000}
                                            step={10}
                                            onChange={(v) =>
                                                set('marriage')({
                                                    ...inputs.marriage,
                                                    cost: v,
                                                } as Marriage)
                                            }
                                            hint="目安: ご祝儀差引後 約300万円（挙式・新生活準備）"
                                        />
                                        <SliderControl
                                            label="配偶者の年収（手取り）"
                                            unit="万円/年"
                                            value={inputs.marriage.spouseAnnualIncome}
                                            min={0}
                                            max={2000}
                                            step={10}
                                            onChange={(v) =>
                                                set('marriage')({
                                                    ...inputs.marriage,
                                                    spouseAnnualIncome: v,
                                                } as Marriage)
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                            {/* 子供 */}
                            <div className="pt-3 border-t border-stone-100">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-stone-600 text-[11px] font-bold">子供（教育費自動計算）</p>
                                    <button
                                        type="button"
                                        onClick={addChild}
                                        disabled={inputs.children.length >= 6}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] text-[10px] font-bold disabled:opacity-40 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                        追加
                                    </button>
                                </div>
                                {inputs.children.length === 0 && (
                                    <p className="text-stone-400 text-xs">子供なし</p>
                                )}
                                <div className="space-y-2">
                                    {inputs.children.map((c, idx) => (
                                        <ChildRow
                                            key={c.id}
                                            index={idx + 1}
                                            child={c}
                                            onChange={(patch) => updateChild(c.id, patch)}
                                            onRemove={() => removeChild(c.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Section>

                        {/* ---------- 支出 ---------- */}
                        <Section title="日々の支出" icon={<Wallet className="w-4 h-4 text-blue-700" />}>
                            <SliderControl
                                label="基本年間支出"
                                unit="万円/年"
                                value={inputs.baseAnnualExpense}
                                min={0}
                                max={2000}
                                step={10}
                                onChange={setNum('baseAnnualExpense')}
                                hint="食費・通信・娯楽など。教育費・住宅費は別途計算するため除いてください"
                            />
                            <SliderControl
                                label="想定インフレ率"
                                unit="%/年"
                                value={inputs.inflationRate}
                                min={0}
                                max={5}
                                step={0.1}
                                onChange={setNum('inflationRate')}
                            />
                        </Section>

                        {/* ---------- 住宅 ---------- */}
                        <Section title="住宅" icon={<Home className="w-4 h-4 text-blue-700" />}>
                            <Segmented
                                options={[
                                    { value: 'rent', label: '賃貸' },
                                    { value: 'owned-no-loan', label: '持ち家(ローンなし)' },
                                    { value: 'owned-with-loan', label: '持ち家(ローンあり)' },
                                    { value: 'plan-purchase', label: '将来購入予定' },
                                ]}
                                value={inputs.housing.mode}
                                onChange={(v) => setHousingMode(v as Housing['mode'])}
                            />

                            {inputs.housing.mode === 'rent' && (
                                <SliderControl
                                    label="家賃（月額）"
                                    unit="万円/月"
                                    value={inputs.housing.monthlyRent}
                                    min={0}
                                    max={50}
                                    step={0.5}
                                    onChange={(v) =>
                                        set('housing')({ ...inputs.housing, monthlyRent: v } as Housing)
                                    }
                                />
                            )}

                            {inputs.housing.mode === 'owned-no-loan' && (
                                <p className="text-stone-400 text-xs">
                                    ローン完済済みのため住宅費は計上されません。固定資産税・修繕費は「日々の支出」に含めてご入力ください。
                                </p>
                            )}

                            {inputs.housing.mode === 'owned-with-loan' && (
                                <>
                                    <SliderControl
                                        label="月々のローン返済額"
                                        unit="万円/月"
                                        value={inputs.housing.monthlyPayment}
                                        min={0}
                                        max={50}
                                        step={0.5}
                                        onChange={(v) =>
                                            set('housing')({
                                                ...inputs.housing,
                                                monthlyPayment: v,
                                            } as Housing)
                                        }
                                    />
                                    <SliderControl
                                        label="ローン残年数"
                                        unit="年"
                                        value={inputs.housing.remainingYears}
                                        min={1}
                                        max={40}
                                        onChange={(v) =>
                                            set('housing')({
                                                ...inputs.housing,
                                                remainingYears: v,
                                            } as Housing)
                                        }
                                    />
                                </>
                            )}

                            {inputs.housing.mode === 'plan-purchase' && (
                                <>
                                    <SliderControl
                                        label="購入時のあなたの年齢"
                                        unit="歳"
                                        value={inputs.housing.ageAtPurchase}
                                        min={inputs.currentAge}
                                        max={Math.min(inputs.retirementAge, 65)}
                                        onChange={(v) =>
                                            set('housing')({
                                                ...inputs.housing,
                                                ageAtPurchase: v,
                                            } as Housing)
                                        }
                                    />
                                    <SliderControl
                                        label="物件価格"
                                        unit="万円"
                                        value={inputs.housing.price}
                                        min={500}
                                        max={15000}
                                        step={100}
                                        onChange={(v) =>
                                            set('housing')({ ...inputs.housing, price: v } as Housing)
                                        }
                                    />
                                    <SliderControl
                                        label="頭金"
                                        unit="万円"
                                        value={inputs.housing.downPayment}
                                        min={0}
                                        max={inputs.housing.price}
                                        step={50}
                                        onChange={(v) =>
                                            set('housing')({
                                                ...inputs.housing,
                                                downPayment: v,
                                            } as Housing)
                                        }
                                    />
                                    <SliderControl
                                        label="ローン期間"
                                        unit="年"
                                        value={inputs.housing.loanYears}
                                        min={5}
                                        max={40}
                                        onChange={(v) =>
                                            set('housing')({
                                                ...inputs.housing,
                                                loanYears: v,
                                            } as Housing)
                                        }
                                    />
                                    <SliderControl
                                        label="ローン金利"
                                        unit="%/年"
                                        value={inputs.housing.annualRate}
                                        min={0}
                                        max={5}
                                        step={0.1}
                                        onChange={(v) =>
                                            set('housing')({
                                                ...inputs.housing,
                                                annualRate: v,
                                            } as Housing)
                                        }
                                    />
                                    <p className="text-stone-400 text-[10px] mt-1">
                                        ※ 物件は家計資産には計上しません。頭金は資産から差し引かれます。
                                    </p>
                                </>
                            )}
                        </Section>

                        {/* ---------- 老後 ---------- */}
                        <Section title="老後・年金" icon={<Banknote className="w-4 h-4 text-blue-700" />}>
                            <SliderControl
                                label="年金受給開始年齢"
                                unit="歳"
                                value={inputs.pensionStartAge}
                                min={inputs.currentAge}
                                max={75}
                                onChange={setNum('pensionStartAge')}
                            />
                            <SliderControl
                                label="世帯年金月額（夫婦合計）"
                                unit="万円/月"
                                value={inputs.monthlyPensionHousehold}
                                min={0}
                                max={50}
                                step={0.5}
                                onChange={setNum('monthlyPensionHousehold')}
                                hint="標準的な夫婦世帯の厚生年金合計は月22万円前後"
                            />
                            <SliderControl
                                label="退職金（一時金）"
                                unit="万円"
                                value={inputs.retirementBonus}
                                min={0}
                                max={10000}
                                step={50}
                                onChange={setNum('retirementBonus')}
                            />
                        </Section>

                        {/* ---------- 大型イベント ---------- */}
                        <Section
                            title="大型ライフイベント"
                            icon={<Sparkles className="w-4 h-4 text-blue-700" />}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-stone-400 text-[11px]">
                                    車購入・旅行・リフォーム等の単発支出を追加できます
                                </p>
                                <button
                                    type="button"
                                    onClick={addEvent}
                                    disabled={inputs.events.length >= 12}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold disabled:opacity-40 hover:bg-blue-100 transition-colors"
                                >
                                    <Plus className="w-3 h-3" />
                                    追加
                                </button>
                            </div>
                            {inputs.events.length === 0 && (
                                <p className="text-stone-400 text-xs pt-1">イベントなし</p>
                            )}
                            <div className="space-y-2">
                                {inputs.events.map((e) => (
                                    <EventRow
                                        key={e.id}
                                        event={e}
                                        minAge={inputs.currentAge}
                                        maxAge={inputs.endAge}
                                        onChange={(patch) => updateEvent(e.id, patch)}
                                        onRemove={() => removeEvent(e.id)}
                                    />
                                ))}
                            </div>
                        </Section>

                        {/* ---------- 運用 ---------- */}
                        <Section title="運用" icon={<TrendingUp className="w-4 h-4 text-blue-700" />}>
                            <SliderControl
                                label="想定運用利回り"
                                unit="%/年"
                                value={inputs.returnRate}
                                min={0}
                                max={10}
                                step={0.1}
                                onChange={setNum('returnRate')}
                                hint="長期国際分散投資の目安は3〜5%"
                            />
                        </Section>

                        <button
                            type="button"
                            onClick={reset}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-stone-600 text-xs font-semibold bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            初期値に戻す
                        </button>
                    </motion.div>

                    {/* ---------- グラフ + 詳細 ---------- */}
                    <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-3 space-y-5"
                    >
                        <div className="bg-[var(--paper)] border border-[var(--line-soft)] p-5">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-navy-900 font-bold text-sm flex items-center gap-2">
                                    <Calculator className="w-4 h-4 text-blue-700" />
                                    資産推移
                                </h3>
                                <p className="text-stone-400 text-[10px]">
                                    グラフ上にマウスをのせると年齢別の詳細を表示
                                </p>
                            </div>
                            <AssetChart
                                data={data}
                                retirementAge={inputs.retirementAge}
                                pensionStartAge={inputs.pensionStartAge}
                                depletionAge={kpis.depletionAge}
                                selectedAge={clampedSelectedAge}
                                onSelect={setSelectedAge}
                            />
                        </div>

                        <div className="bg-[var(--paper)] border border-[var(--line-soft)] p-5">
                            <h3 className="text-navy-900 font-bold text-sm flex items-center gap-2 mb-2">
                                <Wallet className="w-4 h-4 text-blue-700" />
                                年間収支
                            </h3>
                            <CashflowChart
                                data={data}
                                selectedAge={clampedSelectedAge}
                                onSelect={setSelectedAge}
                            />
                            <div className="flex items-center gap-3 mt-3 text-[10px] text-stone-500">
                                <LegendDot color="#10b981" label="収入" />
                                <LegendDot color="#ef4444" label="支出" />
                                <LegendDot color="#a85a3a" label="ネット収支" />
                            </div>
                        </div>

                        <YearDetail year={selected} />

                        <EducationReferenceCard />
                    </motion.div>
                </div>

                {/* 注意書き */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 p-5 bg-[var(--accent-soft)] border border-[var(--line-soft)]"
                >
                    <p className="text-stone-500 text-xs leading-relaxed [text-wrap:pretty]">
                        ※ 本シミュレーターは概観の把握を目的とした簡易計算ツールであり、
                        税金・社会保険料・各種控除・公的年金の正確な計算は行いません。
                        教育費は文部科学省「子供の学習費調査」等を参考にした年額平均で、
                        塾・習い事・留学・大学院は含みません。
                        住宅は家計資産に計上していません。
                        実際のライフプランは個別事情により大きく変動するため、本格的な設計は個別相談をご活用ください。
                    </p>
                </motion.div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            saveHandoff(inputs, kpis, data);
                            window.location.hash = '';
                            setTimeout(() => {
                                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                            }, 80);
                        }}
                        className="cta flex-1 inline-flex items-center justify-center gap-2"
                    >
                        この試算結果で個別相談を予約する
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = '';
                            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                        }}
                        className="btn-ghost inline-flex items-center justify-center gap-2 px-4"
                    >
                        トップへ戻る
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
};

/* ===================== 入力コントロール ===================== */

type SliderControlProps = {
    label: string;
    unit: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (v: number) => void;
    hint?: string;
};

const SliderControl = ({ label, unit, value, min, max, step = 1, onChange, hint }: SliderControlProps) => (
    <div>
        <div className="flex items-baseline justify-between mb-1.5">
            <label className="text-stone-700 text-xs font-bold">{label}</label>
            <span className="text-stone-800 text-sm font-bold tabular-nums" style={{ color: 'var(--accent)' }}>
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
                className="flex-1 h-0.5"
                style={{ accentColor: 'var(--accent)' }}
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
                className="w-20 px-2 py-1 text-right border border-[var(--line)] bg-[var(--paper)] text-stone-800 text-xs tabular-nums focus:border-[var(--accent)] focus:outline-none"
            />
        </div>
        {hint && <p className="text-stone-400 text-[10px] mt-1">{hint}</p>}
    </div>
);

/* ===================== Segmented buttons ===================== */

type SegmentedProps<T extends string> = {
    options: { value: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
};

const Segmented = <T extends string>({ options, value, onChange }: SegmentedProps<T>) => (
    <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
            <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={`px-3 py-1.5 text-[11px] font-bold border transition-all ${
                    value === opt.value
                        ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--bg)]'
                        : 'bg-[var(--paper)] border-[var(--line)] text-stone-600 hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
            >
                {opt.label}
            </button>
        ))}
    </div>
);

/* ===================== Child row ===================== */

const ChildRow = ({
    index,
    child,
    onChange,
    onRemove,
}: {
    index: number;
    child: Child;
    onChange: (patch: Partial<Child>) => void;
    onRemove: () => void;
}) => {
    return (
        <div className="p-3 bg-[var(--accent-soft)] border border-[var(--line-soft)] space-y-2">
            <div className="flex items-center justify-between">
                <p className="text-blue-800 text-[11px] font-bold">第{index}子</p>
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-stone-400 hover:text-red-600 transition-colors"
                    aria-label="削除"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-stone-500 text-[10px] font-bold mb-1">現在の年齢</label>
                    <input
                        type="number"
                        min={-15}
                        max={25}
                        value={child.currentAge}
                        onChange={(e) => onChange({ currentAge: Number(e.target.value) })}
                        className="w-full px-2 py-1.5 border border-[var(--line)] bg-[var(--paper)] text-stone-800 text-xs tabular-nums focus:border-[var(--accent)] focus:outline-none"
                    />
                    <p className="text-stone-400 text-[9px] mt-0.5">
                        {child.currentAge < 0
                            ? `${Math.abs(child.currentAge)}年後に誕生予定`
                            : `${child.currentAge}歳`}
                    </p>
                </div>
                <div>
                    <label className="block text-stone-500 text-[10px] font-bold mb-1">進学コース</label>
                    <select
                        value={child.educationPath}
                        onChange={(e) => onChange({ educationPath: e.target.value as EducationPath })}
                        className="w-full px-2 py-1.5 border border-[var(--line)] bg-[var(--paper)] text-stone-800 text-[11px] focus:border-[var(--accent)] focus:outline-none"
                    >
                        {EDUCATION_PATH_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

/* ===================== Event row ===================== */

const EventRow = ({
    event,
    minAge,
    maxAge,
    onChange,
    onRemove,
}: {
    event: LifeEvent;
    minAge: number;
    maxAge: number;
    onChange: (patch: Partial<LifeEvent>) => void;
    onRemove: () => void;
}) => {
    return (
        <div className="p-3 bg-[var(--accent-soft)] border border-[var(--line-soft)]">
            <div className="grid grid-cols-[1fr_80px_80px_auto] gap-2 items-end">
                <div>
                    <label className="block text-stone-500 text-[10px] font-bold mb-1">内容</label>
                    <input
                        type="text"
                        value={event.label}
                        onChange={(e) => onChange({ label: e.target.value })}
                        className="w-full px-2 py-1.5 border border-[var(--line)] bg-[var(--paper)] text-stone-800 text-xs focus:border-[var(--accent)] focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-stone-500 text-[10px] font-bold mb-1">年齢</label>
                    <input
                        type="number"
                        min={minAge}
                        max={maxAge}
                        value={event.age}
                        onChange={(e) => onChange({ age: Number(e.target.value) })}
                        className="w-full px-2 py-1.5 border border-[var(--line)] bg-[var(--paper)] text-stone-800 text-xs tabular-nums focus:border-[var(--accent)] focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-stone-500 text-[10px] font-bold mb-1">金額(万円)</label>
                    <input
                        type="number"
                        min={0}
                        step={10}
                        value={event.amount}
                        onChange={(e) => onChange({ amount: Number(e.target.value) })}
                        className="w-full px-2 py-1.5 border border-[var(--line)] bg-[var(--paper)] text-stone-800 text-xs tabular-nums focus:border-[var(--accent)] focus:outline-none"
                    />
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-stone-400 hover:text-red-600 transition-colors pb-1.5"
                    aria-label="削除"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};

/* ===================== Chart：資産推移 ===================== */

type AssetChartProps = {
    data: YearData[];
    retirementAge: number;
    pensionStartAge: number;
    depletionAge: number | null;
    selectedAge: number;
    onSelect: (age: number) => void;
};

const AssetChart = ({ data, retirementAge, pensionStartAge, depletionAge, selectedAge, onSelect }: AssetChartProps) => {
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
    const baseY = y(yMin < 0 ? 0 : yMin);
    const areaPath = `${linePath} L ${x(maxAge)} ${baseY} L ${x(minAge)} ${baseY} Z`;

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
                    <stop offset="0%" stopColor="#a85a3a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#a85a3a" stopOpacity="0" />
                </linearGradient>
            </defs>
            {gridValues.map((val, i) => (
                <g key={i}>
                    <line x1={P.l} y1={y(val)} x2={W - P.r} y2={y(val)} stroke="#ece6d5" strokeDasharray="2,4" />
                    <text x={P.l - 10} y={y(val)} dy="0.32em" textAnchor="end" fontSize="10" fill="#75736a">
                        {formatMan(val)}
                    </text>
                </g>
            ))}
            {yMin < 0 && (
                <line x1={P.l} y1={y(0)} x2={W - P.r} y2={y(0)} stroke="#ef4444" strokeOpacity="0.55" />
            )}
            <path d={areaPath} fill="url(#lifeplanArea)" />
            <path d={linePath} fill="none" stroke="#a85a3a" strokeWidth="2" strokeLinejoin="round" />

            {retirementAge >= minAge && retirementAge <= maxAge && (
                <g>
                    <line
                        x1={x(retirementAge)}
                        y1={P.t}
                        x2={x(retirementAge)}
                        y2={H - P.b}
                        stroke="#75736a"
                        strokeDasharray="3,3"
                    />
                    <text
                        x={x(retirementAge)}
                        y={P.t + 10}
                        fontSize="9"
                        fontWeight="700"
                        fill="#75736a"
                        textAnchor="middle"
                    >
                        リタイア {retirementAge}歳
                    </text>
                </g>
            )}
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
            {xLabels.map((age) => (
                <text key={age} x={x(age)} y={H - P.b + 18} fontSize="10" fill="#75736a" textAnchor="middle">
                    {age}
                </text>
            ))}
            <text x={W - P.r} y={H - 4} fontSize="9" fill="#75736a" textAnchor="end">
                （歳）
            </text>
            {selected && (
                <g>
                    <line
                        x1={x(selected.age)}
                        y1={P.t}
                        x2={x(selected.age)}
                        y2={H - P.b}
                        stroke="#a85a3a"
                        strokeOpacity="0.3"
                    />
                    <circle
                        cx={x(selected.age)}
                        cy={y(selected.assets)}
                        r="5"
                        fill="#faf7f1"
                        stroke="#a85a3a"
                        strokeWidth="2.5"
                    />
                </g>
            )}
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

/* ===================== Chart：年間収支 ===================== */

const CashflowChart = ({
    data,
    selectedAge,
    onSelect,
}: {
    data: YearData[];
    selectedAge: number;
    onSelect: (age: number) => void;
}) => {
    const W = 720;
    const H = 220;
    const P = { t: 16, r: 24, b: 30, l: 64 };
    const innerW = W - P.l - P.r;
    const innerH = H - P.t - P.b;
    if (data.length === 0) return null;
    const minAge = data[0].age;
    const maxAge = data[data.length - 1].age;
    const maxInc = Math.max(...data.map((d) => d.totalIncome));
    const maxExp = Math.max(...data.map((d) => d.totalExpense));
    const yMax = Math.max(maxInc, maxExp) * 1.1 || 1;
    const yMin = -yMax;
    const range = yMax - yMin;

    const x = (age: number) => P.l + ((age - minAge) / (maxAge - minAge)) * innerW;
    const y = (v: number) => P.t + (1 - (v - yMin) / range) * innerH;

    const stepW = innerW / Math.max(maxAge - minAge, 1);
    const barW = Math.max(stepW * 0.6, 1);

    const gridValues = [-yMax, -yMax / 2, 0, yMax / 2, yMax];

    const xLabels: number[] = [];
    for (let age = Math.ceil(minAge / 5) * 5; age <= maxAge; age += 5) xLabels.push(age);

    const netPath = data
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(d.age)} ${y(d.netCashflow)}`)
        .join(' ');

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label="年間収支グラフ">
            {gridValues.map((val, i) => (
                <g key={i}>
                    <line x1={P.l} y1={y(val)} x2={W - P.r} y2={y(val)} stroke="#ece6d5" strokeDasharray="2,4" />
                    <text x={P.l - 10} y={y(val)} dy="0.32em" textAnchor="end" fontSize="10" fill="#75736a">
                        {formatMan(val)}
                    </text>
                </g>
            ))}
            <line x1={P.l} y1={y(0)} x2={W - P.r} y2={y(0)} stroke="#75736a" strokeWidth="1" />

            {data.map((d) => (
                <g key={d.age} opacity={d.age === selectedAge ? 1 : 0.85}>
                    {/* 収入バー（上向き） */}
                    <rect
                        x={x(d.age) - barW / 2}
                        y={y(d.totalIncome)}
                        width={barW}
                        height={y(0) - y(d.totalIncome)}
                        fill="#10b981"
                    />
                    {/* 支出バー（下向き） */}
                    <rect
                        x={x(d.age) - barW / 2}
                        y={y(0)}
                        width={barW}
                        height={y(-d.totalExpense) - y(0)}
                        fill="#ef4444"
                    />
                </g>
            ))}

            {/* ネット収支ライン */}
            <path d={netPath} fill="none" stroke="#a85a3a" strokeWidth="1.5" strokeLinejoin="round" />

            {xLabels.map((age) => (
                <text key={age} x={x(age)} y={H - P.b + 16} fontSize="10" fill="#75736a" textAnchor="middle">
                    {age}
                </text>
            ))}

            <line
                x1={x(selectedAge)}
                y1={P.t}
                x2={x(selectedAge)}
                y2={H - P.b}
                stroke="#a85a3a"
                strokeOpacity="0.25"
            />

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

const LegendDot = ({ color, label }: { color: string; label: string }) => (
    <span className="inline-flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
        {label}
    </span>
);

/* ===================== 年齢別詳細 ===================== */

const YearDetail = ({ year }: { year: YearData }) => {
    const incomeRows = [
        { label: '本人 給与', value: year.ownIncome },
        { label: '配偶者 給与', value: year.spouseIncome },
        { label: '公的年金（世帯）', value: year.pension },
        { label: '退職金（一時金）', value: year.retirementBonus },
    ].filter((r) => r.value !== 0);

    const expenseRows = [
        { label: '基本生活費', value: year.baseExpense },
        { label: '教育費', value: year.educationExpense },
        { label: '住宅費', value: year.housingExpense },
        { label: '住宅 頭金', value: year.downPayment },
        { label: '結婚費用', value: year.marriageCost },
        { label: 'ライフイベント', value: year.eventExpense },
    ].filter((r) => r.value !== 0);

    return (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
                <p className="text-stone-400 text-[10px] font-bold tracking-widest uppercase">Year Detail</p>
                <p className="text-navy-900 font-bold text-lg tabular-nums">{year.age}歳</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <p className="text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                        収入 {formatMan(year.totalIncome)}
                    </p>
                    <ul className="space-y-1 text-xs">
                        {incomeRows.length === 0 && <li className="text-stone-400">なし</li>}
                        {incomeRows.map((r) => (
                            <li key={r.label} className="flex items-baseline justify-between">
                                <span className="text-stone-500">{r.label}</span>
                                <span className="text-stone-800 font-bold tabular-nums">
                                    {formatMan(r.value)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-red-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                        支出 {formatMan(year.totalExpense)}
                    </p>
                    <ul className="space-y-1 text-xs">
                        {expenseRows.length === 0 && <li className="text-stone-400">なし</li>}
                        {expenseRows.map((r) => (
                            <li key={r.label} className="flex items-baseline justify-between">
                                <span className="text-stone-500">{r.label}</span>
                                <span className="text-stone-800 font-bold tabular-nums">
                                    {formatMan(r.value)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-3">
                <div
                    className={`px-4 py-3 border ${
                        year.netCashflow >= 0
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                            : 'bg-red-50 border-red-100 text-red-800'
                    }`}
                >
                    <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                        ネット収支
                    </p>
                    <p className="font-bold text-sm tabular-nums">
                        {formatSignedMan(year.netCashflow)}
                    </p>
                </div>
                <div
                    className={`px-4 py-3 border ${
                        year.assets >= 0
                            ? 'bg-blue-50 border-blue-100 text-blue-800'
                            : 'bg-red-50 border-red-100 text-red-800'
                    }`}
                >
                    <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                        年末資産
                    </p>
                    <p className="font-bold text-sm tabular-nums">{formatMan(year.assets)}</p>
                </div>
            </div>
        </div>
    );
};

/* ===================== 教育費目安カード ===================== */

const EducationReferenceCard = () => {
    const rows = [
        {
            label: '幼稚園 (3〜5歳)',
            cells: [
                { label: '公立', value: EDUCATION_COSTS.kindergarten.public },
                { label: '私立', value: EDUCATION_COSTS.kindergarten.private },
            ],
        },
        {
            label: '小学校 (6〜11歳)',
            cells: [
                { label: '公立', value: EDUCATION_COSTS.elementary.public },
                { label: '私立', value: EDUCATION_COSTS.elementary.private },
            ],
        },
        {
            label: '中学校 (12〜14歳)',
            cells: [
                { label: '公立', value: EDUCATION_COSTS.juniorHigh.public },
                { label: '私立', value: EDUCATION_COSTS.juniorHigh.private },
            ],
        },
        {
            label: '高校 (15〜17歳)',
            cells: [
                { label: '公立', value: EDUCATION_COSTS.highSchool.public },
                { label: '私立', value: EDUCATION_COSTS.highSchool.private },
            ],
        },
        {
            label: '大学 (18〜21歳)',
            cells: [
                { label: '国公立', value: EDUCATION_COSTS.university.national },
                { label: '私立文系', value: EDUCATION_COSTS.university.privateHumanities },
                { label: '私立理系', value: EDUCATION_COSTS.university.privateScience },
            ],
        },
    ];

    const otherRefs = [
        { label: '結婚（自己負担）', value: '約 200〜400万円' },
        { label: '出産（自己負担）', value: '約 0〜20万円（出産育児一時金 50万円差引）' },
        { label: '車購入', value: '新車 約 200〜400万円' },
        { label: '住宅購入 諸費用', value: '物件価格の 5〜10%' },
        { label: '介護費（在宅）', value: '月 約 5〜10万円' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
            <h3 className="text-navy-900 font-bold text-sm flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-blue-700" />
                教育費・大型支出の目安
            </h3>
            <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-stone-500 text-[10px] font-bold uppercase tracking-wider">
                            <th className="text-left pb-2 pr-4">学校段階</th>
                            <th colSpan={3} className="text-left pb-2">
                                年額（万円・1人あたり）
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {rows.map((r) => (
                            <tr key={r.label}>
                                <td className="py-2 pr-4 text-stone-700">{r.label}</td>
                                {r.cells.map((c) => (
                                    <td key={c.label} className="py-2 pr-4">
                                        <span className="text-stone-400 mr-1.5">{c.label}</span>
                                        <span className="text-navy-900 font-bold tabular-nums">
                                            {c.value}
                                        </span>
                                    </td>
                                ))}
                                {Array.from({ length: 3 - r.cells.length }, (_, i) => (
                                    <td key={`pad-${i}`} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-stone-400 text-[10px] mt-3 leading-relaxed">
                出典: 文部科学省「子供の学習費調査（R3年度）」を参考に丸め値。塾・習い事・留学・大学院・一人暮らし生活費は含みません。
            </p>

            <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                    その他の目安
                </p>
                <ul className="space-y-1 text-xs">
                    {otherRefs.map((r) => (
                        <li key={r.label} className="flex items-baseline justify-between gap-3">
                            <span className="text-stone-500">{r.label}</span>
                            <span className="text-stone-800 font-bold text-right">{r.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

/* ===================== 共通 ===================== */

const Section = ({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) => (
    <div className="bg-[var(--paper)] border border-[var(--line-soft)] p-5">
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
        <div className={`border ${t.border} ${t.bg} p-4`}>
            <div className="flex items-center gap-1.5 mb-2">
                {icon}
                <p className="text-stone-500 text-[10px] font-semibold leading-tight">{label}</p>
            </div>
            <p className={`${t.text} font-bold text-base sm:text-lg tabular-nums`}>{value}</p>
        </div>
    );
};
