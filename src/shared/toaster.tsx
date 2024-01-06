import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Toaster = (prop:any) => {
    toast.success(prop.prop, {
        position: toast.POSITION.TOP_CENTER
    });
    return (
        <div>
            <ToastContainer />
        </div>
    )
}

export default Toaster