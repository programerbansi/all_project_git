import React from 'react'
import { Data } from './model'

interface Props {
    data: Data[],
    handleDelete:(item:Data)=>void
}
const ViewData = ({ data , handleDelete }: Props) => {
    return (
        <>
            <div className="container mt-3 pt-3">
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((item, index) => <tr key={index}>
                                        <th>{item?.id}</th>
                                        <td>{item?.name}</td>
                                        <td>
                                            <span style={{color:'#dc3545',backgroundColor:"#dee2e6",cursor:'pointer'}} className='p-1 rounded' onClick={()=>handleDelete(item)}>delete</span>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewData