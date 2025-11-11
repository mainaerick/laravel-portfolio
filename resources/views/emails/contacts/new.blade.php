@component('mail::message')
    # New Contact Message

    You have received a new message from your website contact form.

    **Name:** {{ $contact->name ?? 'N/A' }}
    **Email:** {{ $contact->email ?? 'N/A' }}
    **Subject:** {{ $contact->subject ?? 'N/A' }}
    **Message:**
    {{ $contact->message }}

    ---

    @component('mail::button', ['url' => url('/admin/contacts')])
        View in Dashboard
    @endcomponent

    Thanks,
    {{ config('app.name') }}
@endcomponent
