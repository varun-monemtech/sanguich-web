import React, { useState } from 'react'
import './style.scss'

import { useForm } from 'react-hook-form'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby } from '@fortawesome/free-solid-svg-icons'

function CF7Newsletter(props) {
	
	const { register, handleSubmit, formState: { errors }, reset } = useForm({reValidateMode: 'onChange'})
	const [message, setMessage] = useState(false)
	const [isLoading, setLoading] = useState(false)

	const onSubmit = (form, e) => {
		e.preventDefault()

		setLoading(true)

		// Left is CF7 input name, right is ours
		let data = new FormData()
		data.append('your-email', form.email)
		
		const url = 'https://cms.sanguich.com/wp-json/contact-form-7/v1/contact-forms/239/feedback'
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
			id="newsletter-form"
			name="contact"
			method="post"
			action="/thanks/"
			onSubmit={handleSubmit(onSubmit)}
		>

			<p>Add some flavor to your inbox. Join our list for the latest.</p>

			<div className="grid-12">
				<label className="span-9">
					<input type="text" placeholder="Enter your email here" name="email" {...register("email",{required: true, minLength: 6, pattern: /^\S+@\S+$/i})} />
					{errors.email && <p className="small margin-off">a correct email is required.</p>}
				</label>
				<button className="span-3 regular" type="submit">Submit {isLoading ? <div className="loader-spinner"><FontAwesomeIcon icon={faBaby} /></div> : null}</button>
			</div>

			<p className="message small">{message}</p>

		</form>
	)
}

export default CF7Newsletter