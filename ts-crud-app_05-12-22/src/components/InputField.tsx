import React from 'react'

interface Props{
    name:string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e:React.FormEvent) => void
}
// const InputField = ({name,setName}:Props) => {
const InputField:React.FC<Props> = ({name,setName,handleAdd}) => {

    return (
        <div className='container mt-3 pt-3'>
            <form className='w-100' onSubmit={handleAdd}>
                <div className="row">
                    <div className="col-8">
                        <input type="text" className='form-control' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="col-1">
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
} 

export default InputField