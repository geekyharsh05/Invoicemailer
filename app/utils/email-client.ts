import { MailtrapClient } from "mailtrap";

const emailClient = new MailtrapClient({
    token: process.env.MAILTRAP_API_TOKEN!,
});

export default emailClient;