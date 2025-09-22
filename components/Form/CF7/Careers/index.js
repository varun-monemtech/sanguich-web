"use client";
import React, { useState } from "react";
import "./style.scss";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";

import dynamic from "next/dynamic";
const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });


function CF7Careers() {
	const [io, ioInView] = useInView({ triggerOnce: true });
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setError,
	} = useForm({ reValidateMode: "onChange" });
	const [message, setMessage] = useState(false);
	const [validationMessage, setValidationMessage] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [uploadLabel, setUploadLabel] = useState("Upload Resume (Optional)");

	// Form activation // thanks
	const [isActive, setActive] = useState(false);
	const [isSent, setSent] = useState(false);

	const whatvalues = [
		{
			value: "LA COCINA - LITTLE HAITÍ",
			label: "LA COCINA - LITTLE HAITÍ",
		},
		{
			value: "LA VENTANITA - LITTLE HAITÍ",
			label: "LA VENTANITA - LITTLE HAITÍ",
		},
		{
			value: "CALLE OCHO",
			label: "CALLE OCHO",
		},
		{
			value: "BAYSIDE MARKET PLACE",
			label: "BAYSIDE MARKET PLACE",
		},
		{
			value: "CORAL GABLES",
			label: "CORAL GABLES",
		},
	];

	const customStyles = {
		control: (base, state) => ({
			...base,
			boxShadow: "none",
		}),
		option: (base, state) => ({
			...base,
			color: state.isSelected ? "#000" : state.isFocused ? "#000" : "#DCBA7B",
		}),
		valueContainer: (base) => ({
			...base,
			minHeight: 30,
		}),
	};

	const onUploadChange = (e) => {
		setUploadLabel("Upload: " + e.currentTarget.files[0].name);
	};

	const onSubmit = (form, e) => {
		e.preventDefault();

		setLoading(true);

		// Left is CF7 input name, right is ours
		let data = new FormData();
		data.append("your-fname", form.fname);
		data.append("your-lname", form.lname);
		data.append("your-email", form.email);
		data.append("your-phone", form.phone);
		data.append("your-what", form.what?.value);
		data.append("your-resume", form.resume[0]);
		data.append("your-comment", form.comment);
		// SPAM protection?
		data.append("_wpcf7_unit_tag", "unit-tag-random-string");

		const url =
			"https://wordpress-797258-5874632.cloudwaysapps.com/wp-json/contact-form-7/v1/contact-forms/1004/feedback";
		const config = { headers: { "Content-Type": "multipart/form-data" } };

		axios
			.post(url, data, config)
			.then((response) => {
				console.log("status", response.data.status);
				console.log("response", response.data);
				if (response.data.message) {
					setMessage(response.data.message);
				}
				setLoading(false);
				if (response.data.status === "mail_sent") {
					setSent(true);
					setActive(false);
					reset();
				} else if (response.data.status === "validation_failed") {
					setValidationMessage(response?.data?.invalid_fields?.[0]?.message);
				}
			})
			.catch((errors) => {
				console.log(errors);
			});
	};

	return (
		<section
			ref={io}
			id={`section-careers`}
			className={`content x1 grid-12 is-inview ${ioInView ? "inview" : ""}`}
		>
			<div className="careers-form span-12 border-type-9 fs-85">
				<div className="decor-wrap" style={{
					padding: '1.75em !important'
				}}>
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
				<div className="form-cut-off">
					<form
						name="careers"
						id="careers-form"
						method="post"
						action="/thanks/"
						onSubmit={handleSubmit(onSubmit)}
						className={`grid-12 careers  careers-form border-type-4 active`}
					>
						<div className="span-12 text-center fill-this-form animated delay-500">
							<h1 className="text-8xl !text-[#DCBA7B] font2 capitalize pb-6"
							>Careers
							</h1>
						</div>

						<div className={`span-12 grid-12 gap-y-2 gap-x-3 form-fields-wrap active text-[1.15rem]/[1]`}>
							<label className="col-start-2 col-span-10 animated delay-500">
								<input
									type="text"
									placeholder="First name"
									name="fname"
									{...register("fname", { required: true })}
								/>
								{errors.fname && (
									<p className="small margin-off pt-1">
										Your first name is required.
									</p>
								)}
							</label>

							<label className="col-start-2 col-span-10 animated delay-500">
								<input
									type="text"
									placeholder="Last name"
									name="lname"
									{...register("lname", { required: true })}
								/>
								{errors.lname && (
									<p className="small margin-off pt-1">
										Your last name is required.
									</p>
								)}
							</label>
							<label className="col-start-2 col-span-10 animated delay-500">
								<input
									type="text"
									placeholder="e-mail"
									name="email"
									{...register("email", {
										required: true,
										minLength: 6,
										pattern: /^\S+@\S+$/i,
									})}
								/>
								{errors.email && (
									<p className="small margin-off pt-1">
										A correct email is required.
									</p>
								)}
							</label>
							<label className="col-start-2 col-span-10 animated delay-500">
								<input
									type="text"
									placeholder="Phone"
									name="phone"
									{...register("phone", { required: true })}
								/>
								{errors.phone && (
									<p className="small margin-off pt-1">Your phone is required.</p>
								)}
							</label>

							<label className="elevate-z col-start-2 col-span-10 animated delay-500">
								<div className="inputselect font1 [&>div>div]:py-2 [&>div>div]:px-3 uppercase">
									<Controller
										name="what"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<CreatableSelect
												{...field}
												instanceId={"careers-form"}
												options={whatvalues.map((val) => ({
													value: val.value,
													label: val.label,
												}))}
												// defaultValue={props.languageDefaultValueToSelect}
												// isMulti
												placeholder="Location applying to"
												isClearable
												styles={customStyles}
												theme={(theme) => ({
													...theme,
													borderRadius: 0,
													colors: {
														...theme.colors,
														text: "#ffffff",
														primary: "#EAC582",
														primary75: "#EAC582",
														primary50: "#EAC582",
														primary25: "#EAC582",

														danger: "#DE350B",
														dangerLight: "#FFBDAD",

														neutral0: "#212121",
														neutral5: "#EAC582",
														neutral10: "hsl(0, 0%, 90%)",
														neutral20: "#EAC582",
														neutral30: "#ffffff",
														neutral40: "#668B6B",
														neutral50: "#D0C8B9",
														neutral60: "#668B6B",
														neutral70: "hsl(0, 0%, 30%)",
														neutral80: "#D0C8B9",
														neutral90: "hsl(0, 0%, 100%)",
													},
												})}
											/>
										)}
									/>
								</div>
								{errors.what && (
									<p className="small margin-off pt-1">This field is required</p>
								)}
							</label>
							<label className="col-start-2 col-span-10 animated delay-500 inputfile group">
								<span className="uppercase 0 font1 px-3 py-3 border !border-[#DDBA7B] group-hover:!border-white cursor-pointer">
									<p className="!text-[#D0C8B9] leading-[1]">
										{/* @ts-ignore */}
										{/* <FontAwesomeIcon icon={faUpload} />  */}
										{uploadLabel}
									</p>
								</span>
								<input
									type="file"
									placeholder="Resume"
									name="resume"
									className="regular"
									{...register("resume", { required: false })}
									onChange={(e) => onUploadChange(e)}
								/>
								{errors.resume && (
									<p className="small margin-off pt-1">
										Your resume is required, or the filetype not allowed. Try
										PDF, DOC, DOCX, under 25Mb
									</p>
								)}
							</label>
							{/* <label className="span-12 animated delay-500">
								<textarea
									placeholder="Tell us More"
									name="comment"
									{...register("comment", {
										required: false,
										message: "error message",
									})}
								/>
							</label> */}

							<div className="btn-wrap span-12 text-center font1 animated delay-500">
								<button type="submit" className="regular btn-image-light ">
									<span className="px-4">SUBMIT</span>
									{isLoading ? (
										<div className="loader-spinner">
											{/* @ts-ignore */}
											<FontAwesomeIcon icon={faBaby} />
										</div>
									) : null}
								</button>
							</div>

							<div className="response-wrap text-center span-12 animated delay-500">
								<p className="message small">{message}</p>
								<p className="message small">{validationMessage}</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default CF7Careers;
