'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby } from '@fortawesome/free-solid-svg-icons'

function ArtemisFormContact({register,isLoadingPush,errors}: {register: any,isLoadingPush: boolean,errors: any}) {

	return (
		<div className="form-wrap flex-12">
			{/* <div className="span-12">
				<h6>Get in touch</h6>
			</div> */}
			<label className="span-6 padd-right">
				<input type="text" placeholder="Name" name="name" {...register("name",{required: true})} />
				{errors.name && <p className="small margin-off">a name is required.</p>}
			</label>
			<label className="span-6 padd-left">
				<input type="text" placeholder="e-mail" name="email" {...register("email",{required: true, minLength: 6, pattern: /^\S+@\S+$/i})} />
				{errors.email && <p className="small margin-off">a correct email is required.</p>}
			</label>
			<label className="span-12">
				<textarea placeholder="Message" name="message" {...register("message",{required: true})} />
				{errors.message && <p className="small margin-off">a message is required.</p>}
			</label>
			<button className="span regular text-center w-100" type="submit">Send{isLoadingPush ? <div className="loader-spinner"><FontAwesomeIcon icon={faBaby} /></div> : null}</button>
		</div>
	)
}

export default ArtemisFormContact