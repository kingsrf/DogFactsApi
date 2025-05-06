GET /facts

Fetch one or more dog facts.

Query Parameters:

number (optional): a positive integer specifying how many facts to return.

If omitted, all stored facts are returned.

If number exceeds the total facts, returns the full list.

Success Response (200 OK):

{
  "facts": [
    "Dogs have three eyelids.",
    "A dog's nose print is unique, much like a human fingerprint."
  ],
  "success": true
}

Error Responses:

400 Bad Request: Invalid number parameter (non-integer or < 1)

{
  "success": false,
  "error": "Invalid \"number\" parameter. Must be a positive integer."
}

404 Not Found: Endpoint does not exist

{
  "success": false,
  "error": "Endpoint not found"
}