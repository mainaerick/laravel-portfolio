<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Mail\NewContactMessageMail;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;

class ContactFormController extends Controller
{
    public function store(StoreContactRequest $request)
    {
        $contact = Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
            'ip' => $request->ip(),
        ]);

        // Send admin notification email
        Mail::to(config('mail.admin_address', 'admin@example.com'))
            ->send(new NewContactMessageMail($contact));

        return back()->with('success', 'Your message has been sent successfully!');
    }
}
