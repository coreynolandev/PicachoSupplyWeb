import jsonp from 'jsonp';

export async function subscribeToMailchimp(params) {
	const postUrl = `https://Picachosupply.us21.list-manage.com/subscribe/post-json?u=${process.env.REACT_APP_MC_U}&id=${process.env.REACT_APP_MC_ID}&${params}`;

	console.log(postUrl);

	const test = await jsonp(
		postUrl,
		{
			param: 'c'
		},
		(err, data) => {
			if (err) {
				console.log(err);
			} else if (data.result !== 'success') {
				console.log(data);
			} else {
				console.log(data);
			}
		}
	);

	console.log(test);
	return test;
}
