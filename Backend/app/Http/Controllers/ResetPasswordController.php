<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ResetPasswordController extends Controller
{

    public function sendEmail(Request $request){
        if(!$this->verifyEmail($request->email)){
            return $this->failedResponse();
        }
        $this->email($request->email);
        return $this->successResponse();
    }

    protected function verifyEmail($email){
         return !!User::where('email', $email)->first();
    }

    private function email($email){
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    protected function successResponse(){
        return response()->json([
            'data' => 'Reset Email is sent successfully, Please check your inbox.'
        ], Response::HTTP_OK);
    }

    protected function failedResponse(){
        return response()->json([
            'error' => 'Email doesn\'t exist',
        ], Response::HTTP_NOT_FOUND);
    }

    private function createToken($email){
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if($oldToken){
            return $oldToken;
        }
        $token = Str::random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    private function saveToken($token,$email){
        DB::table('password_resets')->insert([
            'email'=> $email,
            'token'=> $token,
            'created_at' => Carbon::now()
        ]);
    }
}
 