import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField, Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { adminLogin } from '../../redux/actions/EcommerceAction';
import { ALL_CATEGORIES, LOGIN } from '../../services/AdminRoutePath';
import { getAdminToken } from '../../services/LocalStorage';
import SnackBar from '../Actions/SnackBar';
import '../css/Login-Admin.css';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
    height: '100%',
    position: 'relative',
}));

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1976d2',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be 6 character length')
        .required('Password is required!'),
    email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const LoginAdmin = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let adminToken = getAdminToken();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);
    const [error, setError] = useState('');

    const handleFormSubmit = async (values) => {
        setLoading(true);
        dispatch(adminLogin({ email: values.email, password: values.password }, navigate, setLoading, setMessage, setError, setStatus))
    };

    useEffect(() => {
        adminToken ? navigate(ALL_CATEGORIES) : navigate(LOGIN);
    }, [])
    return (
        <>
            <SnackBar status={status} message={message} error={error} setStatus={setStatus} />
            <JWTRoot>
                <Card className="card">
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <JustifyBox p={4} height="100%" >
                                <img src={require('../Assets/bg-login2.jpeg')} width="100%" alt="" />
                            </JustifyBox>
                        </Grid>

                        <Grid item sm={6} xs={12} style={{ display: 'block', marginTop: 'auto', marginBottom: 'auto', paddingRight: '25px', paddingLeft: '25px' }}>
                            <ContentBox>
                                <Grid item sm={12} style={{ display: 'block', marginBottom: '24px', paddingRight: '25px'}}>
                                    <h4 className='login-heading'>Login</h4>
                                </Grid>
                                <Formik
                                    onSubmit={handleFormSubmit}
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                >
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>
                                            {/* <Typography style={{color:'red',marginBottom:'20px',textAlign:'center'}}>{error && message}</Typography> */}
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="email"
                                                name="email"
                                                label="Email"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.email}
                                                onChange={handleChange}
                                                helperText={touched.email && errors.email}
                                                error={Boolean(errors.email && touched.email)}
                                                sx={{ mb: 3 }}
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="password"
                                                type="password"
                                                label="Password"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.password}
                                                onChange={handleChange}
                                                helperText={touched.password && errors.password}
                                                error={Boolean(errors.password && touched.password)}
                                                sx={{ mb: 1.5 }}
                                            />

                                            <LoadingButton
                                                type="submit"
                                                color="primary"
                                                loading={loading}
                                                variant="contained"
                                                sx={{ my: 2 }}
                                            >
                                                Login
                                            </LoadingButton>
                                        </form>
                                    )}
                                </Formik>
                            </ContentBox>
                        </Grid>
                    </Grid>
                </Card>
            </JWTRoot>
        </>
    )
}

export default LoginAdmin
