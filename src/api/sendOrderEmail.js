import emailjs from '@emailjs/browser';

export function sendTestEmail(formData, templateType) {
	emailjs.send('service_7axn58a', templateType, formData, 'iFrlXXd6_PKEy64Yz').then(
		(result) => {
			console.log(result);
			console.log(result.text);
		},
		(error) => {
			console.log(error);
			console.log(error.text);
		}
	);
}
