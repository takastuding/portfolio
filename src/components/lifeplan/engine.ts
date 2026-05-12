/**
 * ライフプランシミュレーター計算エンジン
 *
 * 全ての金額は「万円」単位で扱い、年単位で集計する。
 * 個別の制度（税・社会保険料の精緻な計算）はスコープ外。
 */

/* ----------------------------- 型定義 ----------------------------- */

export type EducationPath =
    | 'all-public'
    | 'public-then-private-univ'
    | 'private-from-hs'
    | 'private-from-jhs'
    | 'all-private';

export const EDUCATION_PATH_OPTIONS: { value: EducationPath; label: string }[] = [
    { value: 'all-public', label: '全て公立（大学＝国公立）' },
    { value: 'public-then-private-univ', label: '高校まで公立・大学のみ私立文系' },
    { value: 'private-from-hs', label: '高校から私立・大学は私立文系' },
    { value: 'private-from-jhs', label: '中学から私立・大学は私立文系' },
    { value: 'all-private', label: '全て私立（大学＝私立文系）' },
];

export type Child = {
    id: string;
    /** 現在の年齢。0以上は誕生済み、負値は将来誕生予定（|age|年後に誕生） */
    currentAge: number;
    educationPath: EducationPath;
};

export type Marriage =
    | { status: 'married'; spouseCurrentAge: number; spouseAnnualIncome: number }
    | { status: 'single-no-plan' }
    | {
          status: 'single-plan-marry';
          ageAtMarriage: number;
          cost: number;
          spouseAgeAtMarriage: number;
          spouseAnnualIncome: number;
      };

export type Housing =
    | { mode: 'rent'; monthlyRent: number }
    | { mode: 'owned-no-loan' }
    | { mode: 'owned-with-loan'; monthlyPayment: number; remainingYears: number }
    | {
          mode: 'plan-purchase';
          ageAtPurchase: number;
          price: number;
          downPayment: number;
          loanYears: number;
          annualRate: number;
      };

export type LifeEvent = {
    id: string;
    age: number;
    label: string;
    amount: number;
};

export type Inputs = {
    // 基本
    currentAge: number;
    retirementAge: number;
    endAge: number;
    // 収入
    annualIncome: number; // 手取り 万円/年
    // 家族
    marriage: Marriage;
    children: Child[];
    // 支出
    baseAnnualExpense: number; // 万円/年（食費・通信・娯楽など）
    inflationRate: number; // %
    // 住宅
    housing: Housing;
    // 老後
    pensionStartAge: number;
    monthlyPensionHousehold: number; // 世帯合計 万円/月
    retirementBonus: number; // 万円
    // 資産・運用
    currentAssets: number; // 万円
    returnRate: number; // %
    // 大型イベント
    events: LifeEvent[];
};

/* -------------------- 教育費目安（文科省 子供の学習費調査 R3年度等を参考） -------------------- */

export const EDUCATION_COSTS = {
    kindergarten: { public: 17, private: 31 },
    elementary: { public: 35, private: 167 },
    juniorHigh: { public: 54, private: 144 },
    highSchool: { public: 51, private: 105 },
    university: { national: 100, privateHumanities: 150, privateScience: 180 },
} as const;

/** 子供の年齢と進学コースから、その年の教育費（万円）を返す。 */
export function educationCostForAge(childAge: number, path: EducationPath): number {
    if (childAge < 3 || childAge > 21) return 0;
    if (childAge <= 5) {
        // 幼稚園
        const isPublic = path === 'all-public' || path === 'public-then-private-univ';
        return isPublic ? EDUCATION_COSTS.kindergarten.public : EDUCATION_COSTS.kindergarten.private;
    }
    if (childAge <= 11) {
        // 小学校
        const isPublic =
            path === 'all-public' ||
            path === 'public-then-private-univ' ||
            path === 'private-from-hs' ||
            path === 'private-from-jhs';
        return isPublic ? EDUCATION_COSTS.elementary.public : EDUCATION_COSTS.elementary.private;
    }
    if (childAge <= 14) {
        // 中学校
        const isPublic =
            path === 'all-public' ||
            path === 'public-then-private-univ' ||
            path === 'private-from-hs';
        return isPublic ? EDUCATION_COSTS.juniorHigh.public : EDUCATION_COSTS.juniorHigh.private;
    }
    if (childAge <= 17) {
        // 高校
        const isPublic = path === 'all-public' || path === 'public-then-private-univ';
        return isPublic ? EDUCATION_COSTS.highSchool.public : EDUCATION_COSTS.highSchool.private;
    }
    // 大学 18-21
    return path === 'all-public'
        ? EDUCATION_COSTS.university.national
        : EDUCATION_COSTS.university.privateHumanities;
}

/* -------------------- 住宅ローン（元利均等返済） -------------------- */

/** 万円単位の元金、年利%、年数から、月々返済額（万円）を返す */
export function monthlyMortgageMan(principalMan: number, annualRatePct: number, years: number): number {
    if (years <= 0) return 0;
    const r = annualRatePct / 100 / 12;
    const n = years * 12;
    if (r === 0) return principalMan / n;
    return (principalMan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/* -------------------- シミュレーション -------------------- */

export type YearData = {
    age: number;
    // 収入内訳（万円）
    ownIncome: number;
    spouseIncome: number;
    pension: number;
    retirementBonus: number;
    totalIncome: number;
    // 支出内訳（万円）
    baseExpense: number;
    educationExpense: number;
    housingExpense: number;
    eventExpense: number;
    marriageCost: number;
    downPayment: number;
    totalExpense: number;
    // 収支・資産
    netCashflow: number;
    assets: number;
};

export function simulate(inputs: Inputs): YearData[] {
    const rows: YearData[] = [];
    let assets = inputs.currentAssets;
    const r = inputs.returnRate / 100;
    const inflation = inputs.inflationRate / 100;

    for (let age = inputs.currentAge; age <= inputs.endAge; age++) {
        const t = age - inputs.currentAge;

        /* --- 収入 --- */
        const ownIncome = age < inputs.retirementAge ? inputs.annualIncome : 0;

        let spouseIncome = 0;
        if (inputs.marriage.status === 'married') {
            if (age < inputs.retirementAge) spouseIncome = inputs.marriage.spouseAnnualIncome;
        } else if (inputs.marriage.status === 'single-plan-marry') {
            if (age >= inputs.marriage.ageAtMarriage && age < inputs.retirementAge) {
                spouseIncome = inputs.marriage.spouseAnnualIncome;
            }
        }

        const pension = age >= inputs.pensionStartAge ? inputs.monthlyPensionHousehold * 12 : 0;
        const retBonus = age === inputs.retirementAge ? inputs.retirementBonus : 0;
        const totalIncome = ownIncome + spouseIncome + pension + retBonus;

        /* --- 支出 --- */
        const baseExpense = inputs.baseAnnualExpense * Math.pow(1 + inflation, t);

        const educationExpense = inputs.children.reduce((sum, c) => {
            const childAge = c.currentAge + t;
            return sum + educationCostForAge(childAge, c.educationPath);
        }, 0);

        let housingExpense = 0;
        if (inputs.housing.mode === 'rent') {
            housingExpense = inputs.housing.monthlyRent * 12;
        } else if (inputs.housing.mode === 'owned-with-loan') {
            if (t < inputs.housing.remainingYears) {
                housingExpense = inputs.housing.monthlyPayment * 12;
            }
        } else if (inputs.housing.mode === 'plan-purchase') {
            if (
                age >= inputs.housing.ageAtPurchase &&
                age < inputs.housing.ageAtPurchase + inputs.housing.loanYears
            ) {
                const principal = inputs.housing.price - inputs.housing.downPayment;
                housingExpense = monthlyMortgageMan(principal, inputs.housing.annualRate, inputs.housing.loanYears) * 12;
            }
        }

        const eventExpense = inputs.events
            .filter((e) => e.age === age)
            .reduce((sum, e) => sum + e.amount, 0);

        const marriageCost =
            inputs.marriage.status === 'single-plan-marry' && age === inputs.marriage.ageAtMarriage
                ? inputs.marriage.cost
                : 0;

        const downPayment =
            inputs.housing.mode === 'plan-purchase' && age === inputs.housing.ageAtPurchase
                ? inputs.housing.downPayment
                : 0;

        const totalExpense = baseExpense + educationExpense + housingExpense + eventExpense + marriageCost + downPayment;

        const netCashflow = totalIncome - totalExpense;

        assets = assets * (1 + r) + netCashflow;

        rows.push({
            age,
            ownIncome: Math.round(ownIncome),
            spouseIncome: Math.round(spouseIncome),
            pension: Math.round(pension),
            retirementBonus: Math.round(retBonus),
            totalIncome: Math.round(totalIncome),
            baseExpense: Math.round(baseExpense),
            educationExpense: Math.round(educationExpense),
            housingExpense: Math.round(housingExpense),
            eventExpense: Math.round(eventExpense),
            marriageCost: Math.round(marriageCost),
            downPayment: Math.round(downPayment),
            totalExpense: Math.round(totalExpense),
            netCashflow: Math.round(netCashflow),
            assets: Math.round(assets),
        });
    }
    return rows;
}

/* -------------------- フォーマッタ -------------------- */

export function formatMan(man: number): string {
    if (Math.abs(man) >= 10000) {
        return `${(man / 10000).toFixed(2)}億円`;
    }
    return `${Math.round(man).toLocaleString()}万円`;
}

export function formatSignedMan(man: number): string {
    const sign = man >= 0 ? '+' : '-';
    return `${sign}${formatMan(Math.abs(man))}`;
}

/* -------------------- デフォルト値 -------------------- */

export const DEFAULTS: Inputs = {
    currentAge: 30,
    retirementAge: 65,
    endAge: 95,
    annualIncome: 450,
    marriage: { status: 'married', spouseCurrentAge: 30, spouseAnnualIncome: 300 },
    children: [{ id: 'c1', currentAge: 3, educationPath: 'public-then-private-univ' }],
    baseAnnualExpense: 280,
    inflationRate: 1.5,
    housing: { mode: 'rent', monthlyRent: 10 },
    pensionStartAge: 65,
    monthlyPensionHousehold: 22,
    retirementBonus: 1000,
    currentAssets: 300,
    returnRate: 3,
    events: [],
};

/** 軽量 ID 生成（ライフイベント・子供エントリの key 用） */
export function newId(): string {
    return Math.random().toString(36).slice(2, 10);
}
