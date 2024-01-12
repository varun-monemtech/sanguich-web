'use client'
import React, { useState } from 'react'
import './style.scss'

import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useInView } from 'react-intersection-observer'


import Select from 'react-select'

function CF7Careers() {

  const [io, ioInView] = useInView({ triggerOnce: true })
  const { register, handleSubmit, control, formState: { errors }, reset, setError } = useForm({ reValidateMode: 'onChange' })
  const [message, setMessage] = useState(false)
  const [validationMessage, setValidationMessage] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [uploadLabel, setUploadLabel] = useState('Upload Resume... (Optional)')

  // Form activation // thanks
  const [isActive, setActive] = useState(false)
  const [isSent, setSent] = useState(false)

  const whatvalues = [
    {
      value: 'LA COCINA - LITTLE HAITÍ',
      label: 'LA COCINA - LITTLE HAITÍ',
    },
    {
      value: 'LA VENTANITA - LITTLE HAITÍ',
      label: 'LA VENTANITA - LITTLE HAITÍ',
    },
    {
      value: 'CALLE OCHO',
      label: 'CALLE OCHO',
    },
    {
      value: 'BAYSIDE MARKET PLACE',
      label: 'BAYSIDE MARKET PLACE',
    },
    {
      value: 'CORAL GABLES',
      label: 'CORAL GABLES',
    },
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

  const onUploadChange = (e) => {
    setUploadLabel('Upload: ' + e.currentTarget.files[0].name)
  }

  const onSubmit = (form, e) => {
    e.preventDefault()

    setLoading(true)

    // Left is CF7 input name, right is ours
    let data = new FormData()
    data.append('your-fname', form.fname)
    data.append('your-lname', form.lname)
    data.append('your-email', form.email)
    data.append('your-phone', form.phone)
    data.append('your-what', form.what?.value)
    data.append('your-resume', form.resume[0])
    data.append('your-comment', form.comment)

    const url = 'https://cms.sanguich.com/wp-json/contact-form-7/v1/contact-forms/1004/feedback'
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    axios.post(url, data, config)
      .then(response => {
        console.log('status', response.data.status)
        console.log('response', response.data)
        if (response.data.message) {
          setMessage(response.data.message)
        }
        setLoading(false)
        if (response.data.status === 'mail_sent') {
          setSent(true)
          setActive(false)
          reset()
        }
        else if (response.data.status === 'validation_failed') {
          setValidationMessage(response?.data?.invalid_fields?.[0]?.message)
        }
      }
      )
      .catch(errors => {
        console.log(errors)
      }
      )
  }

  return (
    <section ref={io} id={`section-careers`} className={`content c5 grid-12 is-inview ${ioInView ? 'inview' : ''}`}>

      <div className="catering span-12 border-type-3 fs-85">

        <div className="decor-wrap">
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
            className={`grid-12 careers uppercase catering border-type-4 active`}
          >

            <div className="decor-wrap">
              <div className="bg c5 animated"></div>
              <a href='#careers-form' className={`arrow-up animated delay-1000 active`}></a>
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

            <div className="span-12 text-center fill-this-form animated delay-500"><h3>Careers</h3>
            {/* <p>Short and sweet copywrite goes here</p> */}
            </div>

            <div className={`span-12 grid-12 form-fields-wrap active`}>

              <label className="span-12 animated delay-500">
                <input type="text" placeholder="First name" name="fname" {...register("fname", { required: true })} />
                {errors.fname && <p className="small margin-off">your first name is required.</p>}
              </label>

              <label className="span-12 animated delay-500">
                <input type="text" placeholder="Last name" name="lname" {...register("lname", { required: true })} />
                {errors.lname && <p className="small margin-off">your last name is required.</p>}
              </label>
              <label className="span-12 animated delay-500">
                <input type="text" placeholder="e-mail" name="email" {...register("email", { required: true, minLength: 6, pattern: /^\S+@\S+$/i })} />
                {errors.email && <p className="small margin-off">a correct email is required.</p>}
              </label>
              <label className="span-12 animated delay-500">
                <input type="text" placeholder="Phone" name="phone" {...register("phone", { required: true })} />
                {errors.phone && <p className="small margin-off">your phone is required.</p>}
              </label>

              <label className="elevate-z span-12 animated delay-500">
                <div className="inputselect">
                  <Controller
                    name="what"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        instanceId={'sup-dawg'}
                        options={whatvalues.map(val => (
                          { value: val.value, label: val.label }
                        ))}
                        // defaultValue={props.languageDefaultValueToSelect}
                        // isMulti
                        placeholder="Which location are you applying to?:"
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
                </div>
                {errors.what && <p className="small margin-off">This field is required</p>}
                
              </label>
              <label className="span-12 animated delay-500 inputfile">
                <a className="inputfilelabel btn"><span><FontAwesomeIcon icon={faUpload} /> {uploadLabel}</span></a>
                <input type="file" placeholder="Resume" name="resume" {...register("resume", { required: false })} onChange={(e) => onUploadChange(e)} />
                {errors.resume && <p className="small margin-off">Your resume is required, or the filetype not allowed. Try PDF, DOC, DOCX, under 25Mb</p>}
              </label>
              <label className="span-12 animated delay-500">
                <textarea placeholder="Tell us More" name="comment" {...register("comment", { required: false, message: "error message" })} />
              </label>

              <div className="btn-wrap span-12 text-center font1 animated delay-500">
                <button type="submit" className="regular">SUBMIT {isLoading ? <div className="loader-spinner"><FontAwesomeIcon icon={faBaby} /></div> : null}</button>
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
  )
}

export default CF7Careers