// app/api/sell-enquiry/route.ts
// Sends form data to Sales@buysupply.me via Resend
// Install: npm install resend
// Set env var: RESEND_API_KEY=re_xxxxxxxxxxxx

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, description } = body;

    // Basic validation
    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    // Send email notification to BuySupply team
    await resend.emails.send({
      from: "BuySupply Enquiries <noreply@buysupply.me>", // must be a verified domain in Resend
      to: "sales@buysupply.me",
      replyTo: email,
      subject: `New Sell Enquiry from ${name}${company ? ` — ${company}` : ""}`,
      html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #fff; border-radius: 8px;">
                    <h2 style="color: #fff; margin-bottom: 24px;">New Sell Enquiry</h2>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Name</td>
                            <td style="padding: 10px 0; color: #fff; font-size: 15px;">${name}</td>
                        </tr>
                        ${
                          company
                            ? `
                        <tr>
                            <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
                            <td style="padding: 10px 0; color: #fff; font-size: 15px;">${company}</td>
                        </tr>`
                            : ""
                        }
                        <tr>
                            <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                            <td style="padding: 10px 0; color: #fff; font-size: 15px;"><a href="mailto:${email}" style="color: #aaa;">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
                            <td style="padding: 10px 0; color: #fff; font-size: 15px;"><a href="tel:${phone}" style="color: #aaa;">${phone}</a></td>
                        </tr>
                    </table>

                    <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #222;">
                        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Products for Sale</p>
                        <p style="color: #fff; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${description}</p>
                    </div>

                    <p style="color: #555; font-size: 12px; margin-top: 32px;">
                        Submitted via buysupply.me — reply directly to this email to respond to the enquiry.
                    </p>
                </div>
            `,
    });

    // ─── OPTIONAL: Save to Supabase ───────────────────────────────────────
    // If you want a database of all enquiries, uncomment below.
    // Install: npm install @supabase/supabase-js
    // Set env vars: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
    //
    // import { createClient } from "@supabase/supabase-js"
    // const supabase = createClient(
    //     process.env.SUPABASE_URL!,
    //     process.env.SUPABASE_SERVICE_ROLE_KEY!
    // )
    // await supabase.from("sell_enquiries").insert([{
    //     name, company, email, phone, description,
    //     created_at: new Date().toISOString(),
    // }])
    // ─────────────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Sell enquiry error:", err);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again." },
      { status: 500 },
    );
  }
}
