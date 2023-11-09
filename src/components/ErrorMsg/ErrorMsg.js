import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrAction } from "../globalAction/globalAction";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
  dispatch(resetErrAction());
};

export default ErrorMsg;
