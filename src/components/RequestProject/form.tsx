import React from 'react'

export default function ResendForm() {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        fetch('/api/send', {
            method: 'POST',
            body: JSON.stringify({
                name: 'test',
                email: 'test@gmail.com',
                message: 'message',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(console.log)
            .catch(console.error)
    }

    return (
        <form onSubmit={onSubmit}>
            <input name='name' placeholder='Name' />
            <input name='email' placeholder='Email' />
            <input name='message' placeholder='Message' />
            <button type='submit'>Submit</button>
        </form>
    )
}
