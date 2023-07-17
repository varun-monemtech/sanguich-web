import React, { useState } from 'react'
import './style.scss'

import { useForm } from 'react-hook-form'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby } from '@fortawesome/free-solid-svg-icons'

function CF7Basic(props) {
	
	const { register, handleSubmit, errors, reset } = useForm()
	const [message, setMessage] = useState(false)
	const [isLoading, setLoading] = useState(false)

	const onSubmit = (form, e) => {
		e.preventDefault()

		setLoading(true)

		// Left is CF7 input name, right is ours
		let data = new FormData()
		data.append('your-name', form.name)
		data.append('your-email', form.email)
		data.append('your-message', form.message)
		
		const url = 'https://design-sentry.com/wp-json/contact-form-7/v1/contact-forms/239/feedback'
		const config = { headers: { 'Content-Type': 'multipart/form-data' } }

		axios.post(url, data, config)
			.then(response => {
					console.log('status', response.data.status)
					console.log('response', response.data)
					if(response.data.message) {
					 setMessage(response.data.message)
					}
					setLoading(false)
					if(response.data.status === 'mail_sent') {
						reset()
					}
				}
			)
			.catch(errors => {
					console.log(errors)
				}
			)
	}

	return (
		<form
			name="contact"
			method="post"
			action="/thanks/"
			onSubmit={handleSubmit(onSubmit)}
		>

			<h4>tell me you love me:</h4>
			<p style={{marginTop: '-1rem'}}>but please, be gentle</p>

			<label>
				<input type="text" placeholder="name" name="name" ref={register({required: true, maxLength: 80, message: "error message"})} />
				{errors.name && <p className="small margin-off">your name is required.</p>}
			</label>
			<label>
				<input type="text" placeholder="e-mail" name="email" ref={register({required: true, minLength: 6, pattern: /^\S+@\S+$/i})} />
				{errors.email && <p className="small margin-off">a correct email is required.</p>}
			</label>
			<label>
				<textarea placeholder="message" name="message" ref={register} />
			</label>

			<button type="submit">send away! {isLoading ? <div className="loader-spinner"><FontAwesomeIcon icon={faBaby} /></div> : null}</button>
			
			<p className="message small">{message}</p>

		</form>
	)
}

export default CF7Basic