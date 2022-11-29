import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	order: [],
	contactEmail: null,
	contactNumber: null,
	contactName: null
};

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
		removeItem: (state, { payload }) => {
			// Payload is ID
			const index = state.order.find((item) => item.id === payload);
			if (index !== -1) {
				state.order.splice(index, 1);
			} else console.error('didnt remove all hoodies');
		},
		updateHoodie: (state, { payload }) => {
			// Payload is whole object
			var index = state.order.findIndex((item) => item.id === payload.id);
			if (index !== -1) {
				state.order[index] = payload;
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
		}
	}
});

export const { addHoodie, emptyCart, removeItem, updateHoodie, incrementQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
