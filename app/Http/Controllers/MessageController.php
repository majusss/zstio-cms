<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function show(\Illuminate\Support\Facades\Request $request, \App\Models\Message $notification): \Illuminate\Http\JsonResponse
    {
        return response()->json(['messages'=>$notification->all()]);
    }

}
