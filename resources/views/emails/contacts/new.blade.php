<x-mail::message>
    # New Contact Message

    You’ve received a new contact message from your website.

    ---

    **Name:** {{ $contact->name ?? 'N/A' }}
    **Email:** {{ $contact->email ?? 'N/A' }}
    **Subject:** {{ $contact->subject ?? 'N/A' }}

    ---

    **Message:**
    > {{ $contact->message ?? 'N/A' }}

    <x-mail::button :url="$url">
        View Message
    </x-mail::button>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
