'use server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function sendEmail(formData: FormData) {
    const from = formData.get('from')
    const subject = formData.get('subject')
    const text = formData.get('text')
    console.log(from, subject, text)
    const { data, error } = await resend.emails.send({
        from: 'mehmetyigityalim@gmail.com',
        to: 'mehmetyalm@icloud.com',
        subject: subject as string,
        text: text as string,
    })
    if (error) {
        console.log(error)
        return false
    }
    console.log(data)
}
