import React, { useState } from 'react'
import Attechment from '../Svg/Attechment';
import '../Styles/MessageForm.css';
import Emoji from '../Svg/Emoji';
import Picker from 'emoji-picker-react';

function MessageForm({handleSubmit,text,setText,setImg}) {
    const [openEmojiBox,setEmojiBox] = useState(false);
    return (
        <div className='justify-content-center'>
            <form onSubmit={handleSubmit}>
                {openEmojiBox && <Picker className='emoji_picker' onEmojiClick={(event,eventObject)=>setText(text+eventObject.emoji)}/>}
                <div className="row m-0 align-items-center justify-content-lg-start">
                    <div className="col-1">
                        <div className="m-3">
                            <label htmlFor="img" className="form-label">
                                <Attechment />
                            </label>
                            <input type="file" className="form-control d-none" id="img" accept='image/*' onChange={(e) => setImg(e.target.files[0])}/>
                        </div>
                    </div>
                    <div className="col-1">
                        <Emoji setEmojiBox={setEmojiBox} openEmojiBox={openEmojiBox}/>
                    </div>
                    <div className="col-8">
                        <input type="text" className="form-control" placeholder='Enter Message..' value={text} onChange={(e)=>setText(e.target.value)}/>
                    </div>
                    <div className="col-2">
                        <button className='btn btn-outline-primary' type='submit'>Send</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MessageForm