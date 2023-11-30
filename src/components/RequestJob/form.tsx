import React from 'react'
import sendEmail from './sendEmail'

export default function ResendForm() {
    return (
        <form action={sendEmail}>
            <input name='from' placeholder='Email' />
            <input name='subject' placeholder='Subject' />
            <textarea name='text' placeholder='Message' />
            <button type='submit'>Submit</button>
        </form>
    )
}
