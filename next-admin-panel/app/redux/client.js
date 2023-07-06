import axios from "axios";
export const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNjk2MzI4Yzc3NTE0NDU2M2MzZGZiNWFhMmY1ODhmY2FhZGRlNmQyOWI5MDk1YmY2ODgzOWEyNTlhYmJhNjlkZGVkMWZhNDQyZWNiMjMwYWUiLCJpYXQiOjE2NzA2NjMwNjEuODk3OTg2LCJuYmYiOjE2NzA2NjMwNjEuODk3OTg4LCJleHAiOjE3MDIxOTkwNjEuODk1NjgyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.CgOQvwCSTxPOmgUdZweGswasvKmE_nX_AySeoVx4gGg3zA3yXVUVv2W0xZEBKYk_WqRzG-aiELXsHnCt_YVy9IJHWdm4wf4JewIXO4fhmKEvhTMqGLaTmSfbvoU_zY1iw426lQ0G27loN3VdTuUlNQvSNYFkoBQkwBhEny9w6L0N2760cIbApj65Vj4WprnH5l302CeQD2DL2QCoreGIpNEIMZ0f0rS1eyegqTQYLhbQ2Uis9TmVzS1rkaaEA8xjl7KLnmtkKTETKJaWJjCcbPAu11KqWrkequJhOKQMTW4VjXSiNM8gURGWyFFef32EYwhXeZ5MPfwEY3cEf2Kr_gH2wOBlP8Nc56ggi2fLTgGc70xi9l3vHz1ppU_8x7WJ6ATYBAZWScWomnKpN16PhIsyyBHlzawxbgmi1P1TLQskUg7tcKvKtDM28jBGY5dj4bDImCNHidgNBHrIy5zSOLgnoyLhKc-qYFP8aEQ8yEueOS5YfmplY8qknCDA_6nfo_Z6w3ElPoO3lOVFxWXDFWQgQkbJEXhTbyOHgeJtwj9TOQyLSXO6yGA0v4AWowQms9e5H1ZnIuBdztZK8W_PSKzl0kwcHXkrvEMO_dFiE_yMqAeqNGWPbjfeCliCdBydpEZKSh377EhxQNxQ8XcpVgcQl-buGv51cULTk6lUTdM'

export const headers={
    'Content-Type':'application/json',
    'Authorization':
    {
        toString () {
          return `Bearer ${token}`
        }
    }}

 const client=   axios.create({
    // baseURL:'http://192.168.1.2:8000/api/admin/',
    baseURL:'https://api-dentalvig.cuotainfotech.com/api/',
    headers:{
        'Content-Type':'application/json',
        'Authorization':
        {
            toString () {
              return `Bearer ${token}`
            }
        }
}});

export default client