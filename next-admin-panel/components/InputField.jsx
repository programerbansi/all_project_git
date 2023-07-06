import { Box, Input } from "@chakra-ui/react"

export const InputNameComp = ({handleBlur,handleChange,value,placeholder,name,type}) => {
  return  type == 'file' ? <Input placeholder={placeholder} type={type} size='md' name={name} onChange={handleChange} value={value} onBlur={handleBlur} /> :
  <Input placeholder={placeholder} size='md' name={name} onChange={handleChange} value={value} onBlur={handleBlur} />
}

export const ErrorComp = ({error,touch}) => {
  return  error && touch ? <Box display="inline" style={{ color: 'red' }}>{error}</Box> : null
}