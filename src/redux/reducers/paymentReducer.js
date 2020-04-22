import {
  PAYMENT_PENDING,
  PAYMENT_SUCCESS,
  SET_WALLET_AMOUNT
} from "../actions/actionTypes";

const initialState = {
  walletAmount: 0,
  isPaymentPending: false,
  isPaymentSuccessful: false,
  paymentErrorMessage: null
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_PENDING:
      return {
        ...state,
        isPaymentPending: action.isPaymentPending,
        isPaymentSuccessful: false,
        paymentErrorMessage: null
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        isPaymentSuccessful: action.isPaymentSuccessful
      };
    case SET_WALLET_AMOUNT:
      return {
        ...state,
        walletAmount: action.walletAmount
      };
    default:
      return state;
  }
};

export default paymentReducer;
