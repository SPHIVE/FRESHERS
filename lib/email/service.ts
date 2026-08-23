import nodemailer from "nodemailer";

export interface NewRegistrationNotificationPayload {
  studentName: string;
  rollNumber: string;
  batchLabel: string;
  registeredAt: string;
  email: string;
  phone: string;
}

/**
 * Clean Email Service Abstraction
 * Modular design allows swapping SMTP with Resend, SendGrid, Postmark, etc.
 */
export async function sendAdminNewRegistrationNotification(
  payload: NewRegistrationNotificationPayload
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@iict.ac.in";
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const emailFrom = process.env.EMAIL_FROM || `"IICT Portal" <notifications@iict.ac.in>`;

  const subject = `[IICT Portal] New Student Registration: ${payload.studentName} (${payload.rollNumber})`;
  const textContent = `
NEW STUDENT REGISTRATION NOTICE

A new student has registered on the IICT Fresher Party & Student Help Hub portal and is awaiting approval.

Student Details:
----------------------------------------
Full Name:         ${payload.studentName}
Roll Number:       ${payload.rollNumber}
Batch:             ${payload.batchLabel}
Registration Time: ${payload.registeredAt}
----------------------------------------

Please review and approve/reject this registration in the Admin Dashboard:
https://iict-fresher-party.vercel.app/admin/students

Note: Confidential passwords and security keys are never included in automated notifications.
`;

  const htmlContent = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #232e4a;">
    <div style="border-bottom: 2px solid #d4af37; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="color: #f5d77f; margin: 0; font-size: 22px;">IICT Fresher Party & Student Help Hub</h2>
      <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">New Registration Notification</p>
    </div>
    
    <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">A new student has completed registration and is currently <strong>Pending Approval</strong>.</p>
    
    <div style="background-color: #111726; border-left: 4px solid #d4af37; padding: 16px 20px; border-radius: 6px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #e2e8f0;">
        <tr>
          <td style="padding: 6px 0; color: #94a3b8; width: 140px;">Full Name:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #f5d77f;">${payload.studentName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #94a3b8;">Roll Number:</td>
          <td style="padding: 6px 0; font-weight: 500;">${payload.rollNumber}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #94a3b8;">Batch:</td>
          <td style="padding: 6px 0; font-weight: 500;">${payload.batchLabel}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #94a3b8;">Registration Date:</td>
          <td style="padding: 6px 0;">${payload.registeredAt}</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 14px; color: #94a3b8; margin-top: 24px;">Log into the Admin Panel to review student details and take approval actions.</p>
  </div>
  `;

  // Fallback to console logging if SMTP transport is not configured
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("=================================================");
    console.log("📧 ADMIN EMAIL NOTIFICATION (DEV/CONSOLE FALLBACK)");
    console.log(`To: ${adminEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(textContent);
    console.log("=================================================");
    return { success: true, messageId: "dev-console-mock-id" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: emailFrom,
      to: adminEmail,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Failed to send registration notification email:", error);
    return { success: false, error: error.message || "Email dispatch failed" };
  }
}
