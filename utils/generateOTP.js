exports.generateOTP = () => {
    const str = "abcdefghijklmnopqrstuvwxyz0123456789"
    let otp = ""
    for (let i = 0; i < 5; i++) {
        const x = Math.floor(Math.random() * str.length)
        otp += str[x]
    }
    return otp
}