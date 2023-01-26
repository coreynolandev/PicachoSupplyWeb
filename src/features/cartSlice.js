import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendTestEmail } from '../api/sendOrderEmail';
import uuid from 'react-uuid';
import { subscribeToMailchimp } from '../api/addToNewsletter';

export const initialState = {
	order: [],
	shippingAndHandlingCost: 12.0,
	promoCode: [{ code: 'LIFESTYLE', valueChanged: 'S+H', newValue: 0 }],
	contactEmail: null,
	contactNumber: null,
	contactName: null,
	numberOfResets: 0,
	orderId: uuid(),
	previousOrderId: null,
	justUpdated: false,
	processOrder: { processing: false, error: false, success: false }
};

export const processOrderAsync = createAsyncThunk('cart/processOrderAsync', async (order, thunkAPI) => {
	console.log(order);
	const templateType = order.templateType;

	const response = await sendTestEmail(order, templateType);
	console.log(response);
	if (response.status !== 200) {
		console.log(response.error);
		return thunkAPI.rejectWithValue(response.error);
	} else {
		return response;
	}
});

export const addToSubscription = createAsyncThunk('cart/addToSubscription', async (order, thunkAPI) => {
	if (order.wantsToSubscribe) {
		const params = new URLSearchParams({
			MERGE0: order.email,
			MERGE1: order.name
		});
		console.log(params.toString());

		return subscribeToMailchimp(params.toString());
	}

	return "didn't want added";
});

export const sendCustomerOrderReceipt = createAsyncThunk('cart/sendCustomerOrderReceipt', async (order, thunkAPI) => {
	const templateType = order.templateTypeCustomer;

	const response = await sendTestEmail(order, templateType);
	console.log(response);
	if (response.status !== 200) {
		console.log(response.error);
		return thunkAPI.rejectWithValue(response.error);
	} else {
		return response;
	}
});

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addHoodie: (state, { payload }) => {
			// Payload is whole object
			state.order.push(payload);
		},
		emptyCart: (state) => {
			state.order = [];
		},
		removeJustUpdated: (state) => {
			state.justUpdated = false;
		},
		removeItem: (state, { payload }) => {
			// Payload is ID
			const index = state.order.find((item) => item.id === payload);
			if (index !== -1) {
				state.order.splice(index, 1);
			} else console.error('didnt remove all hoodies');
		},
		updateHoodie: (state, { payload }) => {
			// Payload is whole object
			console.log(payload);
			var index = state.order.findIndex((item) => item.id === payload.id);
			if (index !== -1) {
				console.log(state.order[index]);
				state.order[index] = payload;
				state.justUpdated = true;
			} else console.error('didnt update hoodie');
		},
		incrementQuantity: (state, { payload }) => {
			// Payload is ID
			var index = state.order.find((item) => item.id === payload);
			if (index && index.quantity < 5) {
				index.quantity += 1;
			} else console.log('didnt increase amount');
		},
		decreaseQuantity: (state, { payload }) => {
			// Payload is ID
			var index = state.order.find((item) => item.id === payload);
			if (index && index.quantity > 1) {
				index.quantity -= 1;
			} else console.log('didnt decrease amount');
		},
		resetSubmitOrder: (state, { payload }) => {
			state.processOrder = { processing: false, error: false, success: false };
			state.numberOfResets += 1;
		},
		switchViewDetails: (state, { payload }) => {
			console.log('hellp');
			var index = state.order.find((item) => item.id === payload);
			index.viewDetails = !index.viewDetails;
		},
		changeShippingAndHandlingCost: (state, { payload }) => {
			console.log(payload)
			state.shippingAndHandlingCost = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(processOrderAsync.pending, (state, action) => {
				// console.log('pending');
				// console.log(action);
				state.processOrder = { processing: true, error: false, success: false };
			})
			.addCase(processOrderAsync.fulfilled, (state, { payload }) => {
				console.log('fulfilled');
				console.log(payload);
				// state = { ...initialState, processOrder: { processing: false, error: false, success: true } };

				state.previousOrderId = state.orderId;
				state.orderId = uuid();

				state.order = [];
				state.contactEmail = null;
				state.contactNumber = null;
				state.contactName = null;
				state.numberOfResets = 0;
				state.processOrder = { processing: false, error: false, success: true };
			})
			.addCase(processOrderAsync.rejected, (state, action) => {
				console.log('rejected');
				console.log(action);
				state.processOrder = { processing: false, error: true, success: false };
			});
	}
});

export const {
	addHoodie,
	emptyCart,
	removeItem,
	updateHoodie,
	resetSubmitOrder,
	incrementQuantity,
	decreaseQuantity,
	switchViewDetails,
	removeJustUpdated,
	changeShippingAndHandlingCost
} = cartSlice.actions;
export default cartSlice.reducer;
