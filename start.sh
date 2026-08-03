#!/bin/bash

cleanup() {
    echo ""
    echo "Stopping services..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit
}

trap cleanup SIGINT

echo "Starting Spring Boot..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!

echo "Starting React..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "Application started."
echo "Press Ctrl+C to stop both."

wait
