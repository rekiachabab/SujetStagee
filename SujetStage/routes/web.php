<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


use Illuminate\Support\Facades\Mail;

Route::get('/test-mail', function () {
    Mail::raw('This is a test email', function ($message) {
        $message->to('test@example.com')
                ->subject('Test Email from Laravel');
    });

    return 'Mail sent!';
});


