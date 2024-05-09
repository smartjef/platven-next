export default {
  MESSAGE: {
    REQUEST_PROPERTY_CLIENT: `
Dear {{client_name}},

Thank you for your interest in {{property_title}} on Platven. We have received your request and one of our agents will reach out to you shortly with further details or to schedule a viewing.
        
If you have any immediate questions, feel free to reply to this email or call our support line at +254720009306.
        
Best regards,  
The Platven Team
        `,
    REQUEST_PROPERTY_ADMIN: `
Hello {{staff_name}},

A new property request has been submitted by {{client_name}} for {{property_title}}. Please review the client's inquiry and follow up promptly to assist them with their request.

    Client Contact: {{client_phone}}, {{client_email}}
    Requested Property: {{property_link}}

Thank you for your prompt attention to this request.

Best regards,  
Platven Support Team
        `,
    RESET_PASSWORD: `
Hi {{name}},

We received a request to reset your password for your Platven account.

If you requested this reset, please click the link below to choose a new password:

Reset password Link: {{reset_password_link}}

This link will expire in 2 hours.

If you didn't request a password reset, you can safely ignore this email. However, we recommend that you keep your password strong and unique to protect your account.
        `,
  },
};
