package com.JobPortalBackend.HireMeBackend.utility;

import com.JobPortalBackend.HireMeBackend.entity.OTP;

public class Data {
    public static String getMessageBody(String otp) {

        return "<html>"
                + "<body style='font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;'>"

                + "<div style='background:white; padding:20px; border-radius:8px; text-align:center;'>"

                + "<h2>HireMe Job Portal</h2>"
                + "<p>Password Reset Request</p>"

                + "<p>Your OTP is:</p>"

                + "<h1 style='color:green;'>" + otp + "</h1>"

                + "<p>This OTP is valid for 5 minutes.</p>"

                + "<p>If you did not request this, ignore this email.</p>"

                + "<br>"
                + "<p>Regards,<br>HireMe Team</p>"

                + "</div>"

                + "</body>"
                + "</html>";
    }
}
