"use client";
import React, { useState } from "react";
import "./style.scss";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });

function CF7Contact(props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: "onChange" });
  const [message, setMessage] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Form activation // thanks
  const [isActive, setActive] = useState(false);
  const [isSent, setSent] = useState(false);

  const whatvalues = [
    {
      value: "General Inquiry",
      label: "General Inquiry",
    },
    {
      value: "Press Inquiry",
      label: "Press Inquiry",
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

  const onClickFillThisForm = (e) => {
    setActive((status) => !status);
  };

  const onSubmit = (form, e) => {
    e.preventDefault();

    setLoading(true);

    // Left is CF7 input name, right is ours
    let data = new FormData();
    data.append("your-name", form.name);
    data.append("your-email", form.email);
    data.append("your-phone", form.phone);
    data.append("your-what", form.what?.value);
    data.append("your-message", form.message);
    // SPAM protection?
    data.append("_wpcf7_unit_tag", "unit-tag-random-string");

    const url =
      "https://cms.sanguich.com/wp-json/contact-form-7/v1/contact-forms/817/feedback";
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
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <>
      <div className="form-cut-off">
        <form
          name="contact"
          method="post"
          action="/thanks/"
          onSubmit={handleSubmit(onSubmit)}
          className={`grid-12 uppercase catering border-type-4 active`}
        >
          <div className="decor-wrap">
            <div className="bg c5 animated"></div>
            <div
              className={`arrow-up animated delay-1000 active`}
              onClick={(e) => onClickFillThisForm(e)}
            ></div>
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

          <div
            className="span-12 text-center fill-this-form animated delay-500"
            onClick={(e) => onClickFillThisForm(e)}
          >
            <h1 className="h3">Contact Us</h1>
            <p>
              You can also reach us by phone at{" "}
              <a className="link-number" href="tel:3055390969">305-539-0969</a>. Looking forward to
              hearing from you.
            </p>
          </div>

          <div className={`span-12 grid-12 form-fields-wrap active`}>
            <label className="span-12 animated delay-500">
              <input
                type="text"
                placeholder="Enter full name"
                name="name"
                {...register("name", { required: false })}
              />
              {errors.name && (
                <p className="small margin-off">your name is required.</p>
              )}
            </label>
            <label className="span-12 animated delay-500">
              <input
                type="text"
                placeholder="Enter phone"
                name="phone"
                {...register("phone", { required: false })}
              />
              {errors.phone && (
                <p className="small margin-off">your phone is required.</p>
              )}
            </label>
            <label className="span-12 animated delay-500">
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
                <p className="small margin-off">a correct email is required.</p>
              )}
            </label>
            <label className="elevate-z span-12 animated delay-500">
              <Controller
                name="what"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    instanceId={"contact-form"}
                    options={whatvalues.map((val) => ({
                      value: val.value,
                      label: val.label,
                    }))}
                    // defaultValue={props.languageDefaultValueToSelect}
                    // isMulti
                    placeholder="What are you getting in touch about?"
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

                        neutral0: "#2A4B2E",
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
            </label>
            <label className="span-12 animated delay-500">
              <textarea
                placeholder="message"
                name="message"
                {...register("message", {
                  required: false,
                  message: "error message",
                })}
              />
            </label>

            <div className="btn-wrap span-12 text-center font1 animated delay-500">
              <button type="submit" className="regular">
                SUBMIT{" "}
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CF7Contact;
