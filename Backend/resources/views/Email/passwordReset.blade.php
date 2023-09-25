@component('mail::message')
# Change Password Request

Click on the button to reset your password.

@component('mail::button', [
    'url' => "http://localhost:4200/reset-response?token=".$token->token
    ])
Reset Password
@endcomponent

Thanks,<br>
The E-Commerce Store
@endcomponent
