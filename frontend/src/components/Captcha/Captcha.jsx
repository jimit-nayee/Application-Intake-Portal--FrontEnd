import React from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha';

const Captcha = () => {
    const handleCaptchaVerification = (response) => {
        // Handle CAPTCHA verification
        console.log("CAPTCHA response:", response);
    };

    return (
        <div>
            {/* Render the CAPTCHA widget */}
            <ReCAPTCHA
                sitekey="6LcSTi0mAAAAAJ8VTOHxCekTIqC3tHtk098y3OpH"
                onChange={handleCaptchaVerification}
            />
        </div>
    );
}

export default Captcha