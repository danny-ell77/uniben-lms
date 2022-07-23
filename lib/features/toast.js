import { store } from "../../store";
import { notify } from "../alertSlice";

export const toast = (options) => {
  store.dispatch(notify({ display: true, ...options }));
};
