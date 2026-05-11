// Supabase Edge Function: booking-manage
// HTTP API for fetching / rescheduling / cancelling a booking via manage_token.
// Frontend posts JSON: { action: 'fetch'|'reschedule'|'cancel', token, ... }
// Uses Service Role Key to bypass RLS, so the token is the only credential.

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL") ?? "hashimoto@sharoushi-t.com";
const FROM_ADDRESS = Deno.env.get("FROM_ADDRESS") ?? "橋本社会保険労務士事務所 <onboarding@resend.dev>";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://sharoushi-t.com";

const RESCHEDULE_LIMIT = 2;
const CUTOFF_MS = 24 * 60 * 60 * 1000;

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

type Booking = {
    id: string;
    date: string;
    time_start: string;
    name: string;
    email: string;
    consultation_type: string;
    message: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    reschedule_count: number;
    cancelled_at: string | null;
    manage_token: string;
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

function isPastCutoff(date: string, time_start: string): boolean {
    const target = new Date(`${date}T${time_start}:00+09:00`).getTime();
    return target - Date.now() < CUTOFF_MS;
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

function rescheduleUserHtml(prev: Booking, next: Booking): string {
    const manageUrl = `${SITE_URL}/#/booking/manage?token=${encodeURIComponent(next.manage_token)}`;
    return `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #1c1917; line-height: 1.8;">
  <h2 style="color: #1e3a8a; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">予約変更を承りました</h2>
  <p>${escapeHtml(next.name)} 様</p>
  <p>下記のとおり予約日時を変更しました。お時間にお間違いがないかご確認ください。</p>
  <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
    <tr><td style="background: #f1f5f9; font-weight: bold; width: 30%;">変更前</td><td style="background: #f8fafc; text-decoration: line-through; color: #94a3b8;">${escapeHtml(formatDate(prev.date))} ${escapeHtml(prev.time_start)}〜</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">変更後</td><td style="background: #eff6ff; font-weight: bold;">${escapeHtml(formatDate(next.date))} ${escapeHtml(next.time_start)}〜（60分）</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">相談内容</td><td style="background: #eff6ff;">${escapeHtml(next.consultation_type)}</td></tr>
  </table>
  <div style="margin: 20px 0; padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px;">
    <p style="margin: 0 0 8px; font-weight: bold; color: #1e3a8a;">予約管理ページ</p>
    <a href="${manageUrl}" style="display: inline-block; padding: 10px 18px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px;">予約管理ページへ</a>
  </div>
  <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; color: #64748b; font-size: 12px;">
    <strong>橋本社会保険労務士事務所</strong>
  </div>
</div>`;
}

function rescheduleOwnerHtml(prev: Booking, next: Booking): string {
    return `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #1c1917;">
  <h2 style="color: #1e3a8a; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">予約変更：${escapeHtml(next.name)} 様</h2>
  <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="background: #f1f5f9; font-weight: bold; width: 30%;">変更前</td><td style="background: #f8fafc; text-decoration: line-through; color: #94a3b8;">${escapeHtml(formatDate(prev.date))} ${escapeHtml(prev.time_start)}〜</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">変更後</td><td style="background: #eff6ff; font-weight: bold;">${escapeHtml(formatDate(next.date))} ${escapeHtml(next.time_start)}〜</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">メール</td><td style="background: #eff6ff;"><a href="mailto:${escapeHtml(next.email)}" style="color: #1d4ed8;">${escapeHtml(next.email)}</a></td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">相談内容</td><td style="background: #eff6ff;">${escapeHtml(next.consultation_type)}</td></tr>
    <tr><td style="background: #dbeafe; font-weight: bold;">変更回数</td><td style="background: #eff6ff;">${next.reschedule_count}回目</td></tr>
  </table>
  <p style="color: #64748b; font-size: 12px; margin-top: 16px;">Supabase予約ID: ${escapeHtml(next.id)}</p>
</div>`;
}

function cancelUserHtml(b: Booking): string {
    return `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #1c1917; line-height: 1.8;">
  <h2 style="color: #1e3a8a; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">予約キャンセルを承りました</h2>
  <p>${escapeHtml(b.name)} 様</p>
  <p>下記の予約をキャンセルいたしました。またのご利用を心よりお待ちしております。</p>
  <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
    <tr><td style="background: #f1f5f9; font-weight: bold; width: 30%;">日時</td><td style="background: #f8fafc; text-decoration: line-through; color: #94a3b8;">${escapeHtml(formatDate(b.date))} ${escapeHtml(b.time_start)}〜</td></tr>
    <tr><td style="background: #f1f5f9; font-weight: bold;">相談内容</td><td style="background: #f8fafc;">${escapeHtml(b.consultation_type)}</td></tr>
  </table>
  <p>新たにご予約をご希望の際は、<a href="${SITE_URL}/#booking" style="color: #1d4ed8;">予約フォーム</a> よりお申し込みください。</p>
  <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; color: #64748b; font-size: 12px;">
    <strong>橋本社会保険労務士事務所</strong>
  </div>
</div>`;
}

function cancelOwnerHtml(b: Booking): string {
    return `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #1c1917;">
  <h2 style="color: #b91c1c; border-bottom: 2px solid #ef4444; padding-bottom: 8px;">予約キャンセル：${escapeHtml(b.name)} 様</h2>
  <table cellpadding="8" style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="background: #f1f5f9; font-weight: bold; width: 30%;">日時</td><td style="background: #f8fafc;">${escapeHtml(formatDate(b.date))} ${escapeHtml(b.time_start)}〜</td></tr>
    <tr><td style="background: #f1f5f9; font-weight: bold;">メール</td><td style="background: #f8fafc;"><a href="mailto:${escapeHtml(b.email)}" style="color: #1d4ed8;">${escapeHtml(b.email)}</a></td></tr>
    <tr><td style="background: #f1f5f9; font-weight: bold;">相談内容</td><td style="background: #f8fafc;">${escapeHtml(b.consultation_type)}</td></tr>
  </table>
  <p style="color: #64748b; font-size: 12px; margin-top: 16px;">Supabase予約ID: ${escapeHtml(b.id)}</p>
</div>`;
}

function publicBooking(b: Booking) {
    return {
        id: b.id,
        date: b.date,
        time_start: b.time_start,
        name: b.name,
        email: b.email,
        consultation_type: b.consultation_type,
        message: b.message,
        status: b.status,
        reschedule_count: b.reschedule_count,
        cancelled_at: b.cancelled_at,
    };
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: CORS_HEADERS });
    }
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405, headers: CORS_HEADERS });
    }
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
        console.error("[booking-manage] missing supabase env");
        return new Response(JSON.stringify({ ok: false, error: "server_not_configured" }), {
            status: 500,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    }

    let body: { action?: string; token?: string; new_date?: string; new_time?: string };
    try {
        body = await req.json();
    } catch {
        return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    }

    const { action, token } = body;
    if (!action || !token || typeof token !== "string" || !/^[A-Za-z0-9]+$/.test(token)) {
        return new Response(JSON.stringify({ ok: false, error: "bad_request" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    const fetchByToken = async () => {
        const { data, error } = await supabase
            .from("bookings")
            .select("*")
            .eq("manage_token", token)
            .maybeSingle();
        if (error) throw error;
        return data as Booking | null;
    };

    try {
        if (action === "fetch") {
            const booking = await fetchByToken();
            if (!booking) {
                return new Response(JSON.stringify({ ok: false, error: "not_found" }), {
                    status: 404,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }
            return new Response(JSON.stringify({ ok: true, booking: publicBooking(booking) }), {
                status: 200,
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }

        if (action === "reschedule") {
            const { new_date, new_time } = body;
            if (!new_date || !new_time || !/^\d{4}-\d{2}-\d{2}$/.test(new_date) || !/^\d{2}:\d{2}$/.test(new_time)) {
                return new Response(JSON.stringify({ ok: false, error: "bad_request" }), {
                    status: 400,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }

            const booking = await fetchByToken();
            if (!booking) {
                return new Response(JSON.stringify({ ok: false, error: "not_found" }), {
                    status: 404,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }
            if (booking.status === "cancelled") {
                return new Response(JSON.stringify({ ok: false, error: "already_cancelled" }), {
                    status: 409,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }
            if (isPastCutoff(booking.date, booking.time_start)) {
                return new Response(JSON.stringify({ ok: false, error: "past_cutoff" }), {
                    status: 409,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }
            if (booking.reschedule_count >= RESCHEDULE_LIMIT) {
                return new Response(JSON.stringify({ ok: false, error: "limit_exceeded" }), {
                    status: 409,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }

            const { data: updated, error: updErr } = await supabase
                .from("bookings")
                .update({
                    date: new_date,
                    time_start: new_time,
                    reschedule_count: booking.reschedule_count + 1,
                })
                .eq("id", booking.id)
                .select()
                .single();

            if (updErr) {
                if ((updErr as { code?: string }).code === "23505") {
                    return new Response(JSON.stringify({ ok: false, error: "slot_taken" }), {
                        status: 409,
                        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                    });
                }
                throw updErr;
            }

            const next = updated as Booking;

            // メール通知（失敗してもAPIとしては成功で返す。ログは残す）
            const mailResults = await Promise.allSettled([
                sendMail(OWNER_EMAIL, `【予約変更】${formatDate(next.date)} ${next.time_start}〜 ${next.name}様`, rescheduleOwnerHtml(booking, next)),
                sendMail(next.email, `【予約変更を承りました】${formatDate(next.date)} ${next.time_start}〜`, rescheduleUserHtml(booking, next)),
            ]);
            console.log("[booking-manage] reschedule mail:", JSON.stringify(mailResults.map(r => r.status)));

            return new Response(JSON.stringify({ ok: true, booking: publicBooking(next) }), {
                status: 200,
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }

        if (action === "cancel") {
            const booking = await fetchByToken();
            if (!booking) {
                return new Response(JSON.stringify({ ok: false, error: "not_found" }), {
                    status: 404,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }
            if (booking.status === "cancelled") {
                return new Response(JSON.stringify({ ok: true, booking: publicBooking(booking) }), {
                    status: 200,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }
            if (isPastCutoff(booking.date, booking.time_start)) {
                return new Response(JSON.stringify({ ok: false, error: "past_cutoff" }), {
                    status: 409,
                    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
            }

            const { data: updated, error: updErr } = await supabase
                .from("bookings")
                .update({
                    status: "cancelled",
                    cancelled_at: new Date().toISOString(),
                })
                .eq("id", booking.id)
                .select()
                .single();

            if (updErr) throw updErr;
            const next = updated as Booking;

            const mailResults = await Promise.allSettled([
                sendMail(OWNER_EMAIL, `【予約キャンセル】${formatDate(next.date)} ${next.time_start}〜 ${next.name}様`, cancelOwnerHtml(next)),
                sendMail(next.email, `【予約キャンセルを承りました】${formatDate(next.date)} ${next.time_start}〜`, cancelUserHtml(next)),
            ]);
            console.log("[booking-manage] cancel mail:", JSON.stringify(mailResults.map(r => r.status)));

            return new Response(JSON.stringify({ ok: true, booking: publicBooking(next) }), {
                status: 200,
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ ok: false, error: "unknown_action" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("[booking-manage] internal error", err);
        return new Response(JSON.stringify({ ok: false, error: "internal_error" }), {
            status: 500,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    }
});
