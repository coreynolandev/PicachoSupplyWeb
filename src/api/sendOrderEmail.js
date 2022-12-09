import emailjs from '@emailjs/browser';

export async function sendTestEmail(formData, templateType) {
	return emailjs.send('service_7axn58a', templateType, formData, 'iFrlXXd6_PKEy64Yz').then(
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
