'use client'
import React, { useState } from 'react'
import './style.scss'

import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import dynamic from "next/dynamic";
const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });

function CF7Catering(props) {

	const defaultValues = {
		DatePicker: new Date(),
		reValidateMode: 'onChange'
	}

	const { register, handleSubmit, control, formState: { errors }, reset } = useForm(defaultValues)
	const [message, setMessage] = useState(false)
	const [isLoading, setLoading] = useState(false)

	// Form activation // thanks
	const [isActive, setActive] = useState(false)
	const [isSent, setSent] = useState(false)

	const typeofeventvalues = [
		{
			value: 'Party',
			label: 'Party',
		},
		{
			value: 'Charity',
			label: 'Charity',
		},
		{
			value: 'Concert',
			label: 'Concert',
		},
		{
			value: 'Wedding',
			label: 'Wedding',
		}
	]
	const numberofpeoplevalues = [
		{
			value: '1-4',
			label: '1 to 4 people',
		},
		{
			value: '5-10',
			label: '5 to 10 people',
		},
		{
			value: '11-20',
			label: '11 to 20 people',
		},
		{
			value: 'over 20',
			label: 'over 20 people',
		}
	]

	const customStyles = {
		control: (base, state) => ({
			...base,
			boxShadow: "none",
		}),
		option: (base, state) => ({
			...base,
			color: state.isSelected ? '#000' : state.isFocused ? '#000' : '#DCBA7B',
		}),
		valueContainer: (base) => ({
			...base,
			minHeight: 30,
		})
	}

	const onClickFillThisForm = (e) => {
		setActive(status => !status)
	}

	const onSubmit = (form, e) => {
		e.preventDefault()

		setLoading(true)

		// Left is CF7 input name, right is ours
		let data = new FormData()
		data.append('your-name', form.name)
    data.append('your-phone', form.phone)
		data.append('your-email', form.email)
		data.append('your-company', form.company)
		data.append('your-address', form.address)
		data.append('your-city', form.city)
		data.append('your-zip', form.zip)
		data.append('your-eventdate', form.eventdate?.toLocaleString("en-US", {
				day: "numeric",
				month: "short",
				year: "numeric",
			})
		)
		data.append('your-starttime', form.starttime?.toLocaleString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true
			})
		)
		data.append('your-endtime', form.endtime?.toLocaleString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true
			})
		)
		data.append('your-typeofevent', form.typeofevent?.value)
		data.append('your-numberofpeople', form.numberofpeople?.value)
		data.append('your-message', form.message)
    // SPAM protection? 
    data.append('_wpcf7_unit_tag', 'unit-tag-random-string')
		
		const url = 'https://cms.sanguich.com/wp-json/contact-form-7/v1/contact-forms/488/feedback'
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
						setSent(true)
						setActive(false)
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
		<>
			<div className="badge">
				<div className={`hi ${!isActive && !isSent ? 'active' : ''}`}></div>
				<div className={`thanks ${isSent && !isActive ? 'active' : ''}`}></div>
			</div>

			<div className="form-cut-off">
				<form
					name="contact"
					method="post"
					action="/thanks/"
					onSubmit={handleSubmit(onSubmit)}
					className={`grid-12 uppercase catering border-type-4 ${isActive ? 'active' : ''}`}
				>

					<div className="decor-wrap">
						<div className="bg c5 animated"></div>
						<div className={`arrow-up animated delay-1000 ${isActive ? 'active' : ''}`} onClick={(e) => onClickFillThisForm(e)}></div>
						<div className="decor-top">
							<div className="decor-top-left"></div>
							<div className="decor-top-center"></div>
							<div className="decor-top-right"></div>
						</div>
						<div className="decor-center">
							<div className="decor-center-left"></div>
							<div className="decor-center-right"></div>
						</div>
						<div className="decor-bottom">
							<div className="decor-bottom-left"></div>
							<div className="decor-bottom-center"></div>
							<div className="decor-bottom-right"></div>
						</div>
					</div>

					<div className="span-12 text-center fill-this-form animated delay-500" onClick={(e) => onClickFillThisForm(e)}><h3>Fill this form</h3></div>

					<div className={`span-12 grid-12 form-fields-wrap ${isActive ? 'active' : ''}`}>

						<label className="span-12 animated delay-500">
						<input type="text" placeholder="Enter full name" name="name" {...register("name",{required: false})} />
							{errors.name && <p className="small margin-off">your name is required.</p>}
						</label>
            <label className="span-12 animated delay-500">
						<input type="text" placeholder="Phone" name="phone" {...register("phone",{required: true})} />
							{errors.phone && <p className="small margin-off">your phone number is required.</p>}
						</label>
						<label className="span-12 animated delay-500">
							<input type="text" placeholder="e-mail" name="email" {...register("email",{required: true, minLength: 6, pattern: /^\S+@\S+$/i})} />
							{errors.email && <p className="small margin-off">a correct email is required.</p>}
						</label>
						<label className="span-6 span-12-mobile animated delay-500">
							<input type="text" placeholder="company" name="company" {...register("company",{required: false})} />
						</label>
						<label className="span-6 span-12-mobile animated delay-500">
							<input type="text" placeholder="address" name="address" {...register("address",{required: false})} />
						</label>
						<label className="span-6 span-12-mobile animated delay-500">
							<input type="text" placeholder="city" name="city" {...register("city",{required: false})} />
						</label>
						<label className="span-6 span-12-mobile animated delay-500">
							<input type="text" placeholder="zip" name="zip" {...register("zip",{required: false})} />
						</label>
						<label className="span-12 animated delay-500 has-datepicker">
							<Controller
								name="eventdate"
								control={control}
								render={({ field }) => (
									<DatePicker
										{...field}
										selected={field.value}
										// onSelect={handleDateSelect} //when day is clicked
										onChange={(date) => field.onChange(date)}
										valueName="selected"
										showTimeSelect={false}
										dateFormat="MMM d yyyy"
										className="input"
										placeholderText="Event date"
										isClearable
										shouldCloseOnSelect
									/>
								)}
							/>
						</label>
						<label className="span-6 span-12-laptop animated delay-500 has-datepicker">
							<Controller
								name="starttime"
								control={control}
								render={({ field }) => (
									<DatePicker
										{...field}
										selected={field.value}
										// onSelect={handleDateSelect} //when day is clicked
										onChange={(date) => field.onChange(date)}
										valueName="selected"
										showTimeSelect={true}
										showTimeSelectOnly
										dateFormat="h:mm aa"
										className="input"
										placeholderText="Event Start Time"
										isClearable
										shouldCloseOnSelect
									/>
								)}
							/>
						</label>
						<label className="span-6 span-12-laptop animated delay-500 has-datepicker">
							<Controller
								name="endtime"
								control={control}
								render={({ field }) => (
									<DatePicker
										{...field}
										selected={field.value}
										// onSelect={handleDateSelect} //when day is clicked
										onChange={(date) => field.onChange(date)}
										valueName="selected"
										showTimeSelect={true}
										showTimeSelectOnly
										dateFormat="h:mm aa"
										className="input"
										placeholderText="Event End Time"
										isClearable
										shouldCloseOnSelect
									/>
								)}
							/>
						</label>
						<label className="elevate-z span-6 span-12-laptop span-12-mobile animated delay-500 has-dropdown">
							<Controller
								name="typeofevent"
								control={control}
								// rules={{ required: true }}
								render={({ field }) => (
									<CreatableSelect
										{...field}
										instanceId={'catering-form-event-type'}
										options={typeofeventvalues.map(val => (
											{ value: val.value, label: val.label }
										))}
										// defaultValue={props.languageDefaultValueToSelect}
										// isMulti
										placeholder="Type of Event..."
										isClearable
										styles={customStyles}
										theme={theme => ({
											...theme,
											borderRadius: 0,
											colors: {
												...theme.colors,
												text: '#ffffff',
												primary: '#EAC582',
												primary75: '#EAC582',
												primary50: '#EAC582',
												primary25: '#EAC582',
											
												danger: '#DE350B',
												dangerLight: '#FFBDAD',
											
												neutral0: '#2A4B2E',
												neutral5: '#EAC582',
												neutral10: 'hsl(0, 0%, 90%)',
												neutral20: '#EAC582',
												neutral30: '#ffffff',
												neutral40: '#668B6B',
												neutral50: '#D0C8B9',
												neutral60: '#668B6B',
												neutral70: 'hsl(0, 0%, 30%)',
												neutral80: '#D0C8B9',
												neutral90: 'hsl(0, 0%, 100%)',
											},
										})}
									/>
								)}
							/>
						</label>
						<label className="elevate-z span-6 span-12-laptop span-12-mobile animated delay-500 has-dropdown">
							<Controller
								name="numberofpeople"
								control={control}
								// rules={{ required: true }}
								render={({ field }) => (
									<CreatableSelect
										{...field}
										instanceId={'catering-form-number-of-people'}
										options={numberofpeoplevalues.map(val => (
											{ value: val.value, label: val.label }
										))}
										// defaultValue={props.languageDefaultValueToSelect}
										// isMulti
										placeholder="Participants..."
										isClearable
										styles={customStyles}
										theme={theme => ({
											...theme,
											borderRadius: 0,
											colors: {
												...theme.colors,
												text: '#ffffff',
												primary: '#EAC582',
												primary75: '#EAC582',
												primary50: '#EAC582',
												primary25: '#EAC582',
											
												danger: '#DE350B',
												dangerLight: '#FFBDAD',
											
												neutral0: '#2A4B2E',
												neutral5: '#EAC582',
												neutral10: 'hsl(0, 0%, 90%)',
												neutral20: '#EAC582',
												neutral30: '#ffffff',
												neutral40: '#668B6B',
												neutral50: '#D0C8B9',
												neutral60: '#668B6B',
												neutral70: 'hsl(0, 0%, 30%)',
												neutral80: '#D0C8B9',
												neutral90: 'hsl(0, 0%, 100%)',
											},
										})}
									/>
								)}
							/>
						</label>
						<label className="span-12 animated delay-500">
							<textarea placeholder="message" name="message" {...register("message",{required: false})} />
						</label>

						<div className="btn-wrap span-12 text-center font1 animated delay-500">
							<button type="submit" className="regular">SUBMIT {isLoading ? <div className="loader-spinner"><FontAwesomeIcon icon={faBaby} /></div> : null}</button>
						</div>

						<div className="response-wrap text-center span-12 animated delay-500">
							<p className="message small">{message}</p>
						</div>
					</div>

				</form>
			</div>
		</>
	)
}

export default CF7Catering