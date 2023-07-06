import React, { memo } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const InputButton = ({ className, type, name, icon, databsdismiss, databstoggle, databstarget, event, tooltipName }) => {
    return (
        <>
            {tooltipName ? <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={
                    <Tooltip id={`tooltip-${name}`}>
                        {tooltipName}
                    </Tooltip>
                }
            >
                {
                    !icon ? <button className={className} type={type} data-bs-dismiss={databsdismiss} data-bs-toggle={databstoggle} data-bs-target={databstarget} onClick={event}>{name}</button> : <button className={className} type={type} data-bs-dismiss={databsdismiss} data-bs-toggle={databstoggle} data-bs-target={databstarget} onClick={event}>{icon} {name}</button>
                }
            </OverlayTrigger>
                :
                !icon ? <button className={className} type={type} data-bs-dismiss={databsdismiss} data-bs-toggle={databstoggle} data-bs-target={databstarget} onClick={event}>{name}</button> : <button className={className} type={type} data-bs-dismiss={databsdismiss} data-bs-toggle={databstoggle} data-bs-target={databstarget} onClick={event}>{icon} {name}</button>
            }


        </>
    )
}

export default memo(InputButton)