export const validateRequired = (value, minLength = 1) => {
    if (!value || value.trim().length < minLength) {
      return false
    }
    return true
  }
  
  export const validateMobile = (value) => {
    const mobilePattern = /^09[0-9]{9}$/
    return value && mobilePattern.test(value)
  }
  
  export const convertPersianToEnglish = (text) => {
    if (!text) return text
    
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return text.replace(/[۰-۹]/g, function(d) {
      return persianDigits.indexOf(d)
    })
  }