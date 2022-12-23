import emailjs from '@emailjs/browser';

export async function sendTestEmail(formData, templateType) {
	console.log(formData);
	console.log(templateType);
	console.log(process.env.REACT_APP_EMAILJS_SERVICE_ID)
	console.log(process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
	return emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, templateType, formData, process.env.REACT_APP_EMAILJS_PUBLIC_KEY).then(
		(result) => {
			console.log(result);
			console.log(result.text);
			return result;
		},
		(error) => {
			console.error(error);
			console.error(error.text);
			return error;
		}
	);
}

// export async function addToNewsleter(email, name) {
// 	//TODO: continue figuring this out. probably do hidden form tbh.
// 	let email = email.trim(); // convert @ to escaped text?
// 	let name = name.trim(); //
// 	let reqUrl = `https://picachosupply.us21.list-manage.com/subscribe/post-json?u=${process.env.REACT_APP_MC_U}&id=${process.env.REACT_APP_MC_ID}&MERGE0=coreynolan24%40gmail.com&MERGE1=new+person&c=__jp0`
// 	// Request URL: https://picachosupply.us21.list-manage.com/subscribe/post-json?u=e5ab44b3beb0231254dec84df&id=1e889bd498&MERGE0=coreynolan24%40gmail.com&MERGE1=new+person&c=__jp0

// }
