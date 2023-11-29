import React from 'react'
import sendEmail from 'components/RequestProject/sendEmail'

export default function ResendForm() {
    return (
        <form action={async (formData) => await sendEmail(formData)}>
            <input name='from' placeholder='Email' />
            <input name='subject' placeholder='Subject' />
            <textarea name='text' placeholder='Message' />
            <button type='submit'>Submit</button>
        </form>
    )
}
