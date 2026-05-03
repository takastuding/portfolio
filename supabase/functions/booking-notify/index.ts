// Supabase Edge Function: booking-notify
// Triggered by a Database Webhook on INSERT into public.bookings
// Sends two emails via Resend:
//   1) Owner notification to sharoushi24.info@gmail.com
//   2) Confirmation reply to the applicant
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL") ?? "hashimoto@sharoushi-t.com";
const FROM_ADDRESS = Deno.env.get("FROM_ADDRESS") ?? "橋本貴嗣社会保険労務士事務所 <onboarding@resend.dev>";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://sharoushi-t.com";

type BookingRecord = {
    id: string;
    date: string;
    time_start: string;
    name: string;
    email: string;
    consultation_type: string;
    message: string;
    status: string;
    created_at: string;
    manage_token?: string;
};

type WebhookPayload = {
    type: "INSERT" | "UPDATE" | "DELETE";
    table: string;
    schema: string;
    record: BookingRecord;
    old_record?: BookingRecord | null;
};

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatDate(iso: string): string {
    const [y, m, d] = iso.split("-");
    const dow = ["日", "月", "火", "水", "木", "金", "土"][new Date(iso).getDay()];
    return `${y}年${Number(m)}月${Number(d)}日（${dow}）`;
}

function ownerHtml(r: BookingRecord): string {
    return `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #1c1917;">
  <h2 style="color: #1e3a8a; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">新規ネット相談予約</h2>
  <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="background: #dbeafe; font-weight: bold; width: 30%;">日時</td><td style="background: #eff6ff;">${escapeHtml(formatDate(r.date))} ${escapeHtml(r.time_start)}〜</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">お名前</td><td style="background: #eff6ff;">${escapeHtml(r.name)} 様</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">メール</td><td style="background: #eff6ff;"><a href="mailto:${escapeHtml(r.email)}" style="color: #1d4ed8;">${escapeHtml(r.email)}</a></td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">相談内容</td><td style="background: #eff6ff;">${escapeHtml(r.consultation_type)}</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold; vertical-align: top;">概要</td><td style="background: #eff6ff; white-space: pre-wrap;">${escapeHtml(r.message || "（入力なし）")}</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">受信日時</td><td style="background: #eff6ff;">${escapeHtml(new Date(r.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }))}</td></tr>
  </table>
  <p style="color: #64748b; font-size: 12px; margin-top: 16px;">Supabase予約ID: ${escapeHtml(r.id)}</p>
</div>`;
}

function userHtml(r: BookingRecord): string {
    // パス形式（フラグメント `#` を含めない）でメール内 URL を生成。
    // クリックトラッキング系のリダイレクトでフラグメントが落ちる事故を回避するため。
    const manageUrl = r.manage_token
        ? `${SITE_URL}/booking/manage?token=${encodeURIComponent(r.manage_token)}`
        : null;
    const manageBlock = manageUrl ? `
  <div style="margin: 20px 0; padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px;">
    <p style="margin: 0 0 8px; font-weight: bold; color: #1e3a8a;">予約の変更・キャンセル</p>
    <p style="margin: 0 0 12px; font-size: 13px; color: #475569;">日時の変更・キャンセルは下記URLから24時間前まで承ります。</p>
    <a href="${manageUrl}" style="display: inline-block; padding: 10px 18px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px;">予約管理ページへ</a>
    <p style="margin: 12px 0 0; font-size: 11px; color: #94a3b8; word-break: break-all;">${escapeHtml(manageUrl)}</p>
  </div>` : '';
    return `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #1c1917; line-height: 1.8;">
  <h2 style="color: #1e3a8a; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">ご予約を承りました</h2>
  <p>${escapeHtml(r.name)} 様</p>
  <p>このたびはネット相談のご予約をいただきありがとうございます。<br>以下の内容で承りましたのでご確認ください。</p>
  <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
    <tr><td style="background: #dbeafe; font-weight: bold; width: 30%;">日時</td><td style="background: #eff6ff;">${escapeHtml(formatDate(r.date))} ${escapeHtml(r.time_start)}〜（60分）</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">相談内容</td><td style="background: #eff6ff;">${escapeHtml(r.consultation_type)}</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold; vertical-align: top;">概要</td><td style="background: #eff6ff; white-space: pre-wrap;">${escapeHtml(r.message || "（入力なし）")}</td></tr>
  </table>
  <p>
    個別のご返信およびZoom/Google MeetのURLは、<strong>平日は本業に従事しているため土日中にまとめてお送り</strong>しています。
    少しお待ちいただきますが、何卒よろしくお願いいたします。
  </p>${manageBlock}
  <p>ご不明点があれば、このメールへのご返信でお気軽にお問い合わせください。</p>
  <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; color: #64748b; font-size: 12px;">
    <strong>橋本貴嗣社会保険労務士事務所</strong><br>
    社会保険労務士 / FP技能士1級<br>
    <a href="mailto:sharoushi24.info@gmail.com" style="color: #1d4ed8;">sharoushi24.info@gmail.com</a>
  </div>
</div>`;
}

async function sendMail(to: string, subject: string, html: string): Promise<Response> {
    return await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: FROM_ADDRESS,
            to: [to],
            reply_to: OWNER_EMAIL,
            subject,
            html,
        }),
    });
}

serve(async (req) => {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }
    if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not set");
        return new Response(JSON.stringify({ error: "server_not_configured" }), { status: 500 });
    }

    let payload: WebhookPayload;
    try {
        payload = await req.json();
    } catch {
        return new Response(JSON.stringify({ error: "invalid_json" }), { status: 400 });
    }

    if (payload.type !== "INSERT" || !payload.record) {
        return new Response(JSON.stringify({ skipped: true }), { status: 200 });
    }

    const r = payload.record;

    try {
        const results = await Promise.allSettled([
            sendMail(
                OWNER_EMAIL,
                `【新規予約】${formatDate(r.date)} ${r.time_start}〜 ${r.name}様`,
                ownerHtml(r),
            ),
            sendMail(
                r.email,
                `【予約受付】${formatDate(r.date)} ${r.time_start}〜のご予約を承りました`,
                userHtml(r),
            ),
        ]);

        const [ownerResult, userResult] = results;

        const ownerOk = ownerResult.status === "fulfilled" && ownerResult.value.ok;
        const userOk = userResult.status === "fulfilled" && userResult.value.ok;

        const ownerDetail = ownerResult.status === "fulfilled"
            ? { status: ownerResult.value.status, body: ownerOk ? null : await ownerResult.value.text() }
            : { status: 0, body: String(ownerResult.reason) };
        const userDetail = userResult.status === "fulfilled"
            ? { status: userResult.value.status, body: userOk ? null : await userResult.value.text() }
            : { status: 0, body: String(userResult.reason) };

        console.log("[booking-notify] owner:", JSON.stringify(ownerDetail));
        console.log("[booking-notify] user :", JSON.stringify(userDetail));

        // 運営者宛失敗 → 502（Webhook 自動再試行に任せる）
        if (!ownerOk) {
            return new Response(JSON.stringify({
                error: "owner_email_failed",
                owner: ownerDetail,
                user: userDetail,
            }), { status: 502, headers: { "Content-Type": "application/json" } });
        }

        // 申込者宛は失敗しても DB INSERT は成立しているため 200 で返却（記録のみ）
        return new Response(JSON.stringify({
            ok: true,
            user_email_sent: userOk,
            ...(userOk ? {} : { user_email_warning: userDetail }),
        }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (err) {
        console.error("[booking-notify] unexpected error", err);
        return new Response(JSON.stringify({ error: "internal_error", detail: String(err) }), { status: 500 });
    }
});
