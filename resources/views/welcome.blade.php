<!DOCTYPE html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Laravel</title>

        <!-- Fonts -->
        <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
            rel="stylesheet"
        />

        <link rel="stylesheet" href="/css/app.css" />
    </head>
    <body class="antialiased">
        <div
            class="items-top relative flex min-h-screen justify-center bg-gray-100 py-4 sm:items-center sm:pt-0 dark:bg-gray-900"
        >
            @if (Route::has("login"))
                <div class="fixed right-0 top-0 hidden px-6 py-4 sm:block">
                    @auth
                        <a
                            href="{{ url("/home") }}"
                            class="text-sm text-gray-700 underline dark:text-gray-500"
                        >
                            Home
                        </a>
                    @else
                        <a
                            href="{{ route("login") }}"
                            class="text-sm text-gray-700 underline dark:text-gray-500"
                        >
                            Log in
                        </a>

                        @if (Route::has("register"))
                            <a
                                href="{{ route("register") }}"
                                class="ml-4 text-sm text-gray-700 underline dark:text-gray-500"
                            >
                                Register
                            </a>
                        @endif
                    @endauth
                </div>
            @endif
        </div>
    </body>
    <div id="example"></div>
    <div id="ExampleClass"></div>
    {{-- <div id="example2"></div> --}}

    <script src="/js/app.js"></script>
</html>
