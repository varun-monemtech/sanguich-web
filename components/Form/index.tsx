'use client'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import './style.scss'
import ArtemisFormContact from './Contact'
// import ArtemisFormNewsletter from './newsletter'


function ArtemisForm(props: any) {
	const theFormRef = useRef<HTMLFormElement>(null!)
	const { register, handleSubmit, formState: { errors }, reset } = useForm({reValidateMode: 'onChange'})
	const [apiResponsePush, setApiResponsePush] = useState<any>()
	const [isLoadingPush, setLoadingPush] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	const { formType } = props

	// Contact the API route
	const pushForm = async (data: any) => {

		// Artemis API Handler (middleman)
		const url = `./api/forms/`
		const config = {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			timeout: 10000
		}

		try {
			const response = await fetch(url, config)
			const responseData = await response.json()
			// If Fail
			if(!response.ok) {
				throw new Error('HTTP Error! status: ' + response.status)
				// setErrorMessage('You must wait to post again.')
			}
			// Else Print message
			if(responseData) {
				setApiResponsePush(responseData)
			}
			// Turn off loading indicator
			setLoadingPush(false)
			// Clean up error messages
			setErrorMessage('')
			// Reset form
			reset
		} catch {

		}

	}

	// Fire on form submit
	const onSubmit = (form: any, e: any, loading: boolean) => {
		// Stop default reload
		e.preventDefault()

		if (!loading) {
			// Initiate loading icon
			setLoadingPush(true)

			// Add information about form type so that API Route knows what it's dealing with
			const formData = {...form, formType: formType}

			// Contact API Route
			pushForm(formData)
		}
	}



	
  return (
		<div className='forms c5 padd-half'>

			<div className={`form-form-wrap`}>

					<div className={``}>
						<form
							name="forms"
							method="post"
							action="/thanks/"
							onSubmit={handleSubmit((data,e) => onSubmit(data,e,isLoadingPush))}
							ref={theFormRef}
						>
							
							{/* {formType === 'Newsletter' ?
								<ArtemisFormNewsletter register={register} isLoadingPush={isLoadingPush} errors={errors}></ArtemisFormNewsletter>
							: null} */}
								
							{formType === 'Contact' ?
								<ArtemisFormContact register={register} isLoadingPush={isLoadingPush} errors={errors}></ArtemisFormContact>
							: null}

							<p className="message small">{errorMessage || apiResponsePush?.message}</p>

						</form>
					</div>

			</div>
			
		</div>
  )
}

export default ArtemisForm