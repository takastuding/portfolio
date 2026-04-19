// Supabase Edge Function: booking-notify
// Triggered by a Database Webhook on INSERT into public.bookings
// Sends two emails via Resend:
//   1) Owner notification to sharoushi24.info@gmail.com
//   2) Confirmation reply to the applicant
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = "sharoushi24.info@gmail.com";
// 独自ドメイン（sharoushi-t.com）を Resend で検証後、下記を差し替えてください
const FROM_ADDRESS = "橋本貴嗣社会保険労務士事務所 <onboarding@resend.dev>";

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
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #292524;">
  <h2 style="color: #78350f; border-bottom: 2px solid #fbbf24; padding-bottom: 8px;">新規ネット相談予約</h2>
  <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="background: #fef3c7; font-weight: bold; width: 30%;">日時</td><td style="background: #fffbeb;">${escapeHtml(formatDate(r.date))} ${escapeHtml(r.time_start)}〜</td></tr>
    <tr><td style="background: #fef3c7; font-weight: bold;">お名前</td><td style="background: #fffbeb;">${escapeHtml(r.name)} 様</td></tr>
    <tr><td style="background: #fef3c7; font-weight: bold;">メール</td><td style="background: #fffbeb;"><a href="mailto:${escapeHtml(r.email)}" style="color: #b45309;">${escapeHtml(r.email)}</a></td></tr>
    <tr><td style="background: #fef3c7; font-weight: bold;">相談内容</td><td style="background: #fffbeb;">${escapeHtml(r.consultation_type)}</td></tr>
    <tr><td style="background: #fef3c7; font-weight: bold; vertical-align: top;">概要</td><td style="background: #fffbeb; white-space: pre-wrap;">${escapeHtml(r.message || "（入力なし）")}</td></tr>
    <tr><td style="background: #fef3c7; font-weight: bold;">受信日時</td><td style="background: #fffbeb;">${escapeHtml(new Date(r.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }))}</td></tr>
  </table>
  <p style="color: #78716c; font-size: 12px; margin-top: 16px;">Supabase予約ID: ${escapeHtml(r.id)}</p>
</div>`;
}

function userHtml(r: BookingRecord): string {
    return `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #292524; line-height: 1.8;">
  <h2 style="color: #78350f; border-bottom: 2px solid #fbbf24; padding-bottom: 8px;">ご予約を承りました</h2>
  <p>${escapeHtml(r.name)} 様</p>
  <p>このたびはネット相談のご予約をいただきありがとうございます。<br>以下の内容で承りましたのでご確認ください。</p>
  <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
    <tr><td style="background: #fef3c7; font-weight: bold; width: 30%;">日時</td><td style="background: #fffbeb;">${escapeHtml(formatDate(r.date))} ${escapeHtml(r.time_start)}〜（60分）</td></tr>
    <tr><td style="background: #fef3c7; font-weight: bold;">相談内容</td><td style="background: #fffbeb;">${escapeHtml(r.consultation_type)}</td></tr>
    <tr><td style="background: #fef3c7; font-weight: bold; vertical-align: top;">概要</td><td style="background: #fffbeb; white-space: pre-wrap;">${escapeHtml(r.message || "（入力なし）")}</td></tr>
  </table>
  <p>
    個別のご返信およびZoom/Google MeetのURLは、<strong>平日は本業に従事しているため土日中にまとめてお送り</strong>しています。
    少しお待ちいただきますが、何卒よろしくお願いいたします。
  </p>
  <p>ご不明点があれば、このメールへのご返信でお気軽にお問い合わせください。</p>
  <div style="border-top: 1px solid #e7e5e4; margin-top: 24px; padding-top: 16px; color: #78716c; font-size: 12px;">
    <strong>橋本貴嗣社会保険労務士事務所</strong><br>
    社会保険労務士 / FP技能士1級<br>
    <a href="mailto:sharoushi24.info@gmail.com" style="color: #b45309;">sharoushi24.info@gmail.com</a>
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
        const [ownerRes, userRes] = await Promise.all([
            sendMail(OWNER_EMAIL, `【新規予約】${formatDate(r.date)} ${r.time_start}〜 ${r.name}様`, ownerHtml(r)),
            sendMail(r.email, `【予約受付】${formatDate(r.date)} ${r.time_start}〜 橋本貴嗣社会保険労務士事務所`, userHtml(r)),
        ]);

        if (!ownerRes.ok || !userRes.ok) {
            const ownerBody = await ownerRes.text();
            const userBody = await userRes.text();
            console.error("Resend failed", { ownerStatus: ownerRes.status, userStatus: userRes.status, ownerBody, userBody });
            return new Response(JSON.stringify({ error: "email_send_failed" }), { status: 502 });
        }

        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (err) {
        console.error("Unexpected error", err);
        return new Response(JSON.stringify({ error: "internal_error" }), { status: 500 });
    }
});
