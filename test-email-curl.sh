#!/bin/bash

# Test the email API endpoint with curl

API_URL="http://localhost:3002/api/send-email"

echo "======================================"
echo "Email API cURL Test Script"
echo "======================================"
echo ""

echo "Test 1: Valid Complete Request"
echo "--------------------------------------"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "service": "Performance Marketing",
    "message": "This is a test message from curl"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.'

echo ""
echo "Test 2: Valid Request Without Phone"
echo "--------------------------------------"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "service": "Web Development",
    "message": "Testing without phone"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.'

echo ""
echo "Test 3: Invalid Email (Should Fail)"
echo "--------------------------------------"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bad Email User",
    "email": "not-an-email",
    "service": "SEO",
    "message": "This should fail validation"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.'

echo ""
echo "Test 4: Missing Required Field (Should Fail)"
echo "--------------------------------------"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Missing Email",
    "service": "Consulting",
    "message": "No email provided"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.'

echo ""
echo "Test 5: XSS Attempt"
echo "--------------------------------------"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<script>alert(\"XSS\")</script>Hacker",
    "email": "hacker@example.com",
    "service": "Security Test",
    "message": "Testing <b>HTML</b> sanitization"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.'

echo ""
echo "======================================"
echo "Tests Complete"
echo "======================================"
