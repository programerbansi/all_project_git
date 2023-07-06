import { ReactChild, useContext, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles';
import Button from '../InputFunction/Button';
import { UserValAuthContext } from '../Context/UserValContext';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSendMobileNo } from '../../../redux/actions/UserEcommerceAction';
import MobileOtp from '../Action/MobileOtp';


const VerifyNumber = ({ open, setOpen }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const val = useContext(UserValAuthContext);
    const loggedInUser = getLoggedInUser();

    const [flag, setFlag] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let verifyButtonId = document.getElementById("verify");

    const handleOtp = () => {
        setOpen(false);
        setFlag(true)
        const formdata = new FormData();
        formdata.append('phone', `${loggedInUser.phone}`);
    }

    useEffect(() => {
        if (val.flagOtp) { verifyButtonId?.click(); }
    }, [val.flagOtp])

    return (
        <>
            {flag && <MobileOtp />}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Verification"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        OTP has been sent to your mobile number , please verify .
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type="button" userEvent='button' id={'verify'} className="btn-sm btn-success px-3 py-2" name="verify" dataToggle="modal" dataTarget="#staticBackdrop" event={handleOtp} />
                </DialogActions>
            </Dialog>
        </>
    )
}

export default VerifyNumber
