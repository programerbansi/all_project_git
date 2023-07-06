import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../admin/layout';
function addproject() {
    const router = useRouter();

    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xxl-12">
                                <div className="card">
                                    <div className="card-header align-items-center d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">Add Project</h4>
                                        {/* <div className="flex-shrink-0">
                                            <div className="form-check form-switch form-switch-right form-switch-md">
                                                <label htmlFor="vertical-form-showcode" className="form-label text-muted">Show Code</label>
                                                <input className="form-check-input code-switcher" type="checkbox" id="vertical-form-showcode" />
                                            </div>
                                        </div> */}
                                    </div>{/* end card header */}
                                    <div className="card-body">
                                        {/* <p className="text-muted">Example of vertical form using <code>form-control</code> class. No need to specify row and col class to create vertical form.</p> */}
                                        <div className="live-preview">
                                            <form action="javascript:void(0);">
                                                <div className="mb-3">
                                                    <label htmlFor="employeeName" className="form-label">Project Name</label>
                                                    <input type="text" className="form-control" id="employeeName" placeholder="Enter Project name" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="VertimeassageInput" className="form-label">Project Description</label>
                                                    <textarea className="form-control" id="VertimeassageInput" rows={3} placeholder="Enter your Project Description" defaultValue={""} />
                                                </div>
                                                    <div class="mb-3">
                                                        <label for="ForminputState" class="form-label">Assign user</label>
                                                        <select id="ForminputState" class="form-select" data-choices data-choices-sorting="true">
                                                            <option selected>Choose...</option>
                                                            <option>jhoni</option>
                                                            <option>diyna</option>
                                                            <option>mansi</option>
                                                            <option>bansi</option>


                                                        </select>
                                                    </div>
                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-primary">Add Project</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="d-none code-view">
                                            <pre className="language-markup" style={{ height: 375 }}>{"\n"}{"                                    "}</pre></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default addproject