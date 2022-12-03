// ** Reducers Imports
import navbar from "./navbar";
import lend from "./lend";
import borrow from "./borrow";
import error from "./error";
import success from "./success";
import profile from "./profile";
import ens from "./ens";

const rootReducer = {
  navbar,
  lend,
  borrow,
  error,
  success,
  profile,
  ens,
};

export default rootReducer;
