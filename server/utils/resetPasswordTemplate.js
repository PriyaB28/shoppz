 const forgetPasswordOtp = (url) => {
    return (
        `  <div style="margin: 24px auto ;">
            <table cellpadding="0" cellspacing="0" style="font-family: DM Sans, sans-serif; font-size: 16px; font-weight: 400; width: 600px; border: none; margin: 0 auto; border-radius: 6px; overflow: hidden; background-color: #fff; box-shadow: 0 0 3px rgba(60, 72, 88, 0.15);">
                <thead style="padding: 16px; display: block;">
                    <tr style="display: block; border: none; text-align: center; font-size: 24px; letter-spacing: 1px;">
                        <th scope="col" style="margin: auto; display: block;"><a href="index.html"><img src="assets/images/logo-icon-64.png" alt=""></a></th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr>
                        <td style="background-color: #161c2d; padding: 16px; display: block; text-align: center;">
                            <h2 style="font-weight: 600;">Reset Password</h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 16px 16px 0; color: #161c2d;">
                            <p style="margin: 0; font-size: 18px; font-weight: 500;">Hello, Harry!</p>
                            <p style="margin-bottom: 0; color: #94a3b8;">To reset your password, please click the button below :</p>
                        </td>
                    </tr>
    
                    <tr>
                        <td style="padding: 16px 16px 0;">
                            <a href=${url} style="padding: 8px 20px; outline: none; text-decoration: none; font-size: 15px; display: inline-block; letter-spacing: 0.5px; transition: all 0.3s; font-weight: 500; border-radius: 6px; background-color: #f97316; border: 1px solid #f97316; color: #ffffff;">Reset Password</a>
                        </td>
                    </tr>
    
                    <tr>
                        <td style="padding: 16px 16px 0; color: #94a3b8;">
                            This link will be active for 45 second from the time this email was sent. If you did not request to reset your password, please ignore this email and your account will not be affected.
                        </td>
                    </tr>
    
                    <tr>
                        <td style="padding: 16px;">
                            <p style="margin: 0; font-size: 18px; font-weight: 500;">Cartzio <br> Support Team</p>
                        </td>
                    </tr>
    
                    <tr>
                        <td style="padding: 16px 8px; color: #fff; background-color: #161c2d; text-align: center;">
                            <table style="width: 100%;">
                                <tbody>
                                    <tr>
                                        <td style="display: inline-flex; align-items: center; margin: 0 10px 10px;">
                                            <span style="font-size: 14px;">Free delivery</span>
                                        </td>
                    
                                        <td style="display: inline-flex; align-items: center; margin: 0 10px 10px;">
                                            <span style="font-size: 14px;">Money-back quarantee</span>
                                        </td>
                    
                                        <td style="display: inline-flex; align-items: center; margin: 0 10px 10px;">
                                            <span style="font-size: 14px;">Secure payments</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="text-align: center;">
                                            <p style="margin: 4px 0 10px;">© <script>document.write(new Date().getFullYear())</script> Cartzio. Designed by <a href="https://shreethemes.in/" target="_blank" style="text-decoration: none; color: #fff;">Shreethemes</a>.</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="text-align: center;">
                                            <a href="#" target="_blank" style="color: #ea580c;">Unsubscribe</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`
    )
}

export default forgetPasswordOtp